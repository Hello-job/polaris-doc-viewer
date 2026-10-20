import React from 'react';
import { render } from '@testing-library/react';
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import Artplayer from 'artplayer/dist/artplayer.legacy.js';
import VideoRenderer from '../plugins/video';
import { initialState } from '../state/reducer';

jest.mock('artplayer/dist/artplayer.legacy.js', () => jest.fn());

test('the shipped legacy player parses with the Webpack 4 parser (#1)', () => {
  const fromScripts = createRequire(require.resolve('react-scripts/package.json'));
  const fromWebpack = createRequire(fromScripts.resolve('webpack/package.json'));
  const acorn = fromWebpack('acorn');
  const source = readFileSync(require.resolve('artplayer/dist/artplayer.legacy.js'), 'utf8');
  expect(() => acorn.parse(source, { ecmaVersion: 2019 })).not.toThrow();
});

test('uses its own container and destroys players on file changes and unmount', () => {
  const instances: { destroy: jest.Mock }[] = [];
  (Artplayer as unknown as jest.Mock).mockImplementation(() => {
    const instance = { destroy: jest.fn() };
    instances.push(instance);
    return instance;
  });

  const state = { ...initialState, currentDocument: { uri: '/first.mp4' } };
  const { container, rerender, unmount } = render(<VideoRenderer mainState={state} />);
  expect(Artplayer).toHaveBeenLastCalledWith(
    expect.objectContaining({
      container: container.querySelector('#video-renderer'),
      url: '/first.mp4',
    })
  );

  rerender(<VideoRenderer mainState={{ ...state, currentDocument: { uri: '/second.mp4' } }} />);
  expect(instances[0].destroy).toHaveBeenCalledWith(false);
  expect(Artplayer).toHaveBeenLastCalledWith(expect.objectContaining({ url: '/second.mp4' }));
  unmount();
  expect(instances[1].destroy).toHaveBeenCalledWith(false);
});
