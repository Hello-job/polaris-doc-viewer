import { Dispatch, useContext, useEffect } from 'react';
import { DocViewerContext } from '../state';
import { MainStateActions, setDocumentLoading, updateCurrentDocument } from '../state/actions';
import { IMainState } from '../state/reducer';
import { DocRenderer } from '../types';
import { defaultFileLoader, FileLoaderComplete } from '../utils/fileLoaders';
import { FileSourceType, getDocumentExtension } from '../utils/fileTypes';
import { useRendererSelector } from './useRendererSelector';

export const useDocumentLoader = (): {
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  CurrentRenderer: DocRenderer | null | undefined;
} => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { currentFileNo, currentDocument, pluginRenderers } = state;
  const { CurrentRenderer } = useRendererSelector();
  const documentURI = currentDocument?.uri || '';

  useEffect(() => {
    if (!currentDocument || currentDocument.fileType) return;

    const suffix = getDocumentExtension(currentDocument);
    const updateFileType = (fileType: string) => {
      dispatch(updateCurrentDocument({ ...currentDocument, fileType }));
    };

    if (currentDocument.resourceType === FileSourceType.FS) {
      updateFileType('link');
      return;
    }

    // Known extensions can be selected without a cross-origin HEAD request.
    if (suffix && pluginRenderers?.some((renderer) => renderer.fileTypes.includes(suffix))) {
      updateFileType(suffix);
      return;
    }

    const controller = new AbortController();
    fetch(currentDocument.uri, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        if (controller.signal.aborted) return;
        const contentType = response.headers
          .get('content-type')
          ?.split(';')[0]
          .trim()
          .toLowerCase();
        updateFileType(
          response.ok && contentType && contentType !== 'application/octet-stream'
            ? contentType
            : suffix || 'application/octet-stream'
        );
      })
      .catch(() => {
        if (!controller.signal.aborted) updateFileType(suffix || 'application/octet-stream');
      });

    return () => controller.abort();
  }, [currentDocument, dispatch, pluginRenderers]);

  useEffect(() => {
    if (!currentDocument || CurrentRenderer === undefined) return;
    const controller = new AbortController();
    const { signal } = controller;

    const fileLoaderComplete: FileLoaderComplete = (fileReader) => {
      if (signal.aborted) return;

      if (fileReader && fileReader.result !== null) {
        dispatch(updateCurrentDocument({ ...currentDocument, fileData: fileReader.result }));
      }
      dispatch(setDocumentLoading(false));
    };

    if (CurrentRenderer === null) {
      dispatch(setDocumentLoading(false));
    } else if (CurrentRenderer.fileLoader !== undefined) {
      CurrentRenderer.fileLoader?.({ documentURI, signal, fileLoaderComplete });
    } else {
      defaultFileLoader({ documentURI, signal, fileLoaderComplete });
    }

    return () => controller.abort();
    // fileData updates must not start the same file request again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentRenderer, currentFileNo, documentURI, dispatch]);

  return { state, dispatch, CurrentRenderer };
};
