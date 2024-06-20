import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { setRendererRect } from '../state/actions';
import { useDocumentLoader } from '../hooks/useDocumentLoader';
import { useWindowSize } from '../hooks/useWindowSize';
import { DocumentNav } from './DocumentNav';
import NotRender from './NotRender';

export const ProxyRenderer: FC<{}> = () => {
  const { state, dispatch, CurrentRenderer } = useDocumentLoader();
  const { documents, documentLoading } = state;

  const size = useWindowSize();

  const containerRef = useCallback(
    (node) => {
      node && dispatch(setRendererRect(node?.getBoundingClientRect()));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size]
  );
  const Contents = useCallback(() => {
    if (!documents.length) {
      return <div id="no-documents">{/* No Documents */}</div>;
    } else {
      return (
        <>
          <DocumentNav loading={documentLoading}>
            {CurrentRenderer ? <CurrentRenderer mainState={state} /> : <NotRender />}
          </DocumentNav>
        </>
      );
    }
  }, [CurrentRenderer, state]);

  return (
    <Container id="proxy-renderer" ref={containerRef}>
      <Contents />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow-y: hidden;
  height: calc(100% - 68px);
  width: 100%;
`;

