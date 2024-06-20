import React, { createContext, Dispatch, FC, useEffect, useReducer } from 'react';
import { DocViewerProps } from '..';
import { MainStateActions, setAllDocuments, setMainConfig } from './actions';
import { IMainState, initialState, mainStateReducer, MainStateReducer } from './reducer';

const DocViewerContext = createContext<{
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
}>({ state: initialState, dispatch: () => null });

const AppProvider: FC<DocViewerProps> = (props) => {
  const { children, documents, config, pluginRenderers, onClose, activeDocument } = props;

  const getDefaultDocument = () => {
    if (activeDocument) {
      return {
        currentDocument: activeDocument,
        currentFileNo: documents.findIndex((item) => item.id === activeDocument.id),
      };
    }
    return {
      currentDocument: documents && documents.length ? documents[0] : undefined,
    };
  };

  const [state, dispatch] = useReducer<MainStateReducer>(mainStateReducer, {
    ...initialState,
    documents: documents || [],
    config,
    pluginRenderers,
    ...getDefaultDocument(),
    onClose,
  });

  // On inital load, and whenever they change,
  // replace documents with the new props passed in
  useEffect(() => {
    dispatch(setAllDocuments(documents));
    config && dispatch(setMainConfig(config));
  }, [documents]);

  return (
    <DocViewerContext.Provider value={{ state, dispatch }}>{children}</DocViewerContext.Provider>
  );
};

export { DocViewerContext, AppProvider };
