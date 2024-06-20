import { Dispatch, useContext, useEffect } from 'react';
import { DocViewerContext } from '../state';
import { MainStateActions, setDocumentLoading, updateCurrentDocument } from '../state/actions';
import { IMainState } from '../state/reducer';
import { DocRenderer } from '../types';
import { defaultFileLoader, FileLoaderComplete } from '../utils/fileLoaders';
import { useRendererSelector } from './useRendererSelector';
import { FileSourceType, imgType } from 'polaris-react-component'

export const useDocumentLoader = (): {
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  CurrentRenderer: DocRenderer | null | undefined;
} => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { currentFileNo, currentDocument } = state;

  const { CurrentRenderer } = useRendererSelector();

  const documentURI = currentDocument?.uri || '';

  const handleUpdateCurrentDocument = (fileType?: string) => {
    if (!currentDocument) return;
    dispatch(
      updateCurrentDocument({
        ...currentDocument,
        fileType: fileType || undefined,
      })
    );
  }

  useEffect(
    () => {
      if (!currentDocument) return;
      if (currentDocument.fileType !== undefined) return;

      const controller = new AbortController();
      const { signal } = controller;
     
      
      if (currentDocument.resourceType === FileSourceType.FS) {
        handleUpdateCurrentDocument('link')
        return;
      }

      if (currentDocument.suffix && imgType.includes(currentDocument.suffix)) {
        handleUpdateCurrentDocument('png')
        return;
      }

      fetch(documentURI, { method: 'HEAD', signal }).then((response) => {
        const contentTypeRaw = response.headers.get('content-type');
        const contentTypes = contentTypeRaw?.split(';') || [];
        let contentType = contentTypes.length ? contentTypes[0] : undefined;
        // 临时方案
        if(contentType === 'application/octet-stream' && currentDocument.suffix === 'sketch') {
          contentType = 'sketch';
        }
        handleUpdateCurrentDocument(contentType)
      }).catch(err => {
        handleUpdateCurrentDocument(currentDocument.suffix)
      })


      return () => {
        controller.abort();
      };
    },
    [currentFileNo, documentURI]
  );

  useEffect(() => {
    if (!currentDocument || CurrentRenderer === undefined) return;
    const controller = new AbortController();
    const { signal } = controller;
    
    const fileLoaderComplete: FileLoaderComplete = (fileReader) => {
      if (!currentDocument || !fileReader) {
        dispatch(setDocumentLoading(false));
        return;
      }

      let updatedDocument = { ...currentDocument };
      if (fileReader.result !== null) {
        updatedDocument.fileData = fileReader.result;
      }

      dispatch(updateCurrentDocument(updatedDocument));
      dispatch(setDocumentLoading(false));
    };
  
    if (CurrentRenderer === null) {
      dispatch(setDocumentLoading(false));
    } else if (CurrentRenderer.fileLoader !== undefined) {
      CurrentRenderer.fileLoader?.({ documentURI, signal, fileLoaderComplete });
    } else {
      defaultFileLoader({ documentURI, signal, fileLoaderComplete });
    }

    return () => {
      controller.abort();
    };
  }, [CurrentRenderer]);

  return { state, dispatch, CurrentRenderer };
};
