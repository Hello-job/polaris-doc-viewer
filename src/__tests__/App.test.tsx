import { act, fireEvent, render, wait } from '@testing-library/react';
import React from 'react';
import DocViewer, { DocRenderer, PDFRenderer, PNGRenderer } from '..';
import { FileLoaderComplete } from '../utils/fileLoaders';

// These engines need a real browser or ship only ESM. Their rendering is outside
// the image, file selection and loading regressions exercised here.
jest.mock('polaris-offices-viewer', () => () => null);
jest.mock('polaris-docx-preview', () => ({ renderAsync: jest.fn() }), { virtual: true });
jest.mock('polaris-xmind-viewer', () => ({ XMindEmbedViewer: jest.fn() }));
jest.mock('pdfjs-dist/build/pdf.worker.entry', () => ({}));

const originalFetch = window.fetch;

beforeEach(() => {
  window.fetch = jest.fn();
  HTMLElement.prototype.scrollIntoView = jest.fn();
});

afterEach(() => {
  window.fetch = originalFetch;
});

test('renders an empty document list', () => {
  const { getByTestId, container } = render(<DocViewer documents={[]} />);
  expect(getByTestId('react-doc-viewer')).toBeTruthy();
  expect(container.querySelector('#no-documents')).not.toBeNull();
  expect(window.fetch).not.toHaveBeenCalled();
});

test('can hide the file name', () => {
  const { queryByTestId } = render(
    <DocViewer
      documents={[{ uri: 'https://files.example.com/image.png' }]}
      config={{ header: { disableFileName: true } }}
    />
  );
  expect(queryByTestId('file-name')).toBeNull();
});

test('can hide the header', () => {
  const { queryByTestId } = render(
    <DocViewer
      documents={[{ uri: 'https://files.example.com/image.png' }]}
      config={{ header: { disableHeader: true } }}
    />
  );
  expect(queryByTestId('header-bar')).toBeNull();
});

test.each(['svg', 'SVG?download=1#preview', 'webp', 'jpeg', 'gif', 'bmp'])(
  'previews a remote %s image without suffix or fetch requests (#3, #4)',
  async (extension) => {
    const uri = `https://files.example.com/image.${extension}`;
    const { container, queryByTestId } = render(<DocViewer documents={[{ uri }]} />);
    await wait(() => expect(container.querySelector('#image-img')).not.toBeNull());
    expect(container.querySelector('#image-img')?.getAttribute('src')).toBe(uri);
    expect(queryByTestId('loading-renderer')).toBeNull();
    expect(window.fetch).not.toHaveBeenCalled();
  }
);

test('respects an explicit file type for an extensionless URL', async () => {
  const { container } = render(
    <DocViewer
      documents={[{ uri: 'https://files.example.com/download/123', fileType: 'image/png' }]}
    />
  );
  await wait(() => expect(container.querySelector('#image-img')).not.toBeNull());
  expect(window.fetch).not.toHaveBeenCalled();
});

test('uses a provided suffix when the download URL has no extension', async () => {
  const { container } = render(
    <DocViewer documents={[{ uri: 'https://files.example.com/download/123', suffix: 'svg' }]} />
  );
  await wait(() => expect(container.querySelector('#image-img')).not.toBeNull());
  expect(window.fetch).not.toHaveBeenCalled();
});

test('recognizes image/svg+xml from HEAD when no extension is available', async () => {
  (window.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    headers: { get: () => 'image/svg+xml; charset=utf-8' },
  });
  const { container } = render(
    <DocViewer documents={[{ uri: 'https://files.example.com/download/123' }]} />
  );
  await wait(() => expect(container.querySelector('#image-img')).not.toBeNull());
  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect((window.fetch as jest.Mock).mock.calls[0][1].method).toBe('HEAD');
});

test('a failed HEAD request ends loading and offers a download', async () => {
  (window.fetch as jest.Mock).mockRejectedValue(new TypeError('Failed to fetch'));
  const { container, queryByTestId } = render(
    <DocViewer documents={[{ uri: 'https://files.example.com/file.unknown' }]} />
  );
  await wait(() => expect(container.querySelector('#no-renderer-download')).not.toBeNull());
  expect(queryByTestId('loading-renderer')).toBeNull();
  expect(window.fetch).toHaveBeenCalledTimes(1);
});

test('does not treat an arbitrary binary response as an XMind file', async () => {
  (window.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    headers: { get: () => 'application/octet-stream' },
  });
  const { container } = render(
    <DocViewer documents={[{ uri: 'https://files.example.com/download/123' }]} />
  );
  await wait(() => expect(container.querySelector('#no-renderer-download')).not.toBeNull());
  expect(window.fetch).toHaveBeenCalledTimes(1);
});

test('opens cloud documents without fetching their HTML', async () => {
  const { container } = render(
    <DocViewer documents={[{ uri: 'https://docs.example.com/doc/123', resourceType: 5 }]} />
  );
  await wait(() => expect(container.querySelector('#msdoc-iframe')).not.toBeNull());
  expect(window.fetch).not.toHaveBeenCalled();
});

test.each(['resolve', 'reject'])(
  'ignores a cancelled HEAD request that later %ss after switching documents',
  async (settlement) => {
    let resolveHead: (value: any) => void = () => {};
    let rejectHead: (reason: Error) => void = () => {};
    (window.fetch as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          resolveHead = resolve;
          rejectHead = reject;
        })
    );
    const { container, queryByTestId } = render(
      <DocViewer documents={[{ uri: '/download/123' }, { uri: '/second.svg' }]} />
    );
    const signal = (window.fetch as jest.Mock).mock.calls[0][1].signal;
    fireEvent.click(container.querySelector('#document1') as HTMLElement);
    await wait(() => expect(container.querySelector('#image-img')).not.toBeNull());
    expect(signal.aborted).toBe(true);

    await act(async () => {
      if (settlement === 'resolve') {
        resolveHead({ ok: true, headers: { get: () => 'application/pdf' } });
      } else {
        rejectHead(new Error('request aborted'));
      }
    });
    expect(container.querySelector('#image-img')?.getAttribute('src')).toBe('/second.svg');
    expect(queryByTestId('loading-renderer')).toBeNull();
  }
);

test('loads the next file when consecutive documents use the same renderer', async () => {
  const TestRenderer: DocRenderer = ({ mainState: { currentDocument } }) => (
    <div data-testid="loaded-document">{currentDocument?.fileData}</div>
  );
  TestRenderer.fileTypes = ['txt'];
  TestRenderer.weight = 0;
  const completions: FileLoaderComplete[] = [];
  TestRenderer.fileLoader = jest.fn(({ fileLoaderComplete }) =>
    completions.push(fileLoaderComplete)
  );

  const { container, getByTestId } = render(
    <DocViewer
      documents={[{ uri: '/first.txt' }, { uri: '/second.txt' }]}
      pluginRenderers={[TestRenderer]}
    />
  );
  act(() => completions[0]({ result: 'first' } as FileReader));
  expect(getByTestId('loaded-document').textContent).toBe('first');

  fireEvent.click(container.querySelector('#doc-nav-next') as HTMLButtonElement);
  expect(TestRenderer.fileLoader).toHaveBeenCalledTimes(2);
  act(() => completions[1]({ result: 'second' } as FileReader));
  expect(getByTestId('loaded-document').textContent).toBe('second');

  // A callback from the first request must not overwrite the second document.
  act(() => completions[0]({ result: 'stale' } as FileReader));
  expect(getByTestId('loaded-document').textContent).toBe('second');
});

test('exports the actual PDF renderer', () => {
  expect(PDFRenderer).not.toBe(PNGRenderer);
  expect(PDFRenderer.fileTypes).toContain('application/pdf');
});
