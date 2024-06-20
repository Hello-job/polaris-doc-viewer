import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DocRenderer } from '../../types';
import { renderAsync } from 'polaris-docx-preview';

const MSDocRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  useEffect(() => {
    const element = document.getElementById('doc-renderer');
    if(element && currentDocument?.uri) {
      fetch(currentDocument.uri).then((response) => {
        let docData = response.blob();
        renderAsync(docData, element)
      })
    }
  }, [])
  if (!currentDocument) return null;

  return (
    <Container id="doc-renderer">
    </Container>
  );
};

export default MSDocRenderer;

const MSDocFTMaps = {
  doc: ['doc', 'application/msword'],
  docx: ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

MSDocRenderer.fileTypes = [
  ...MSDocFTMaps.doc,
  ...MSDocFTMaps.docx,
];
MSDocRenderer.weight = 0;
MSDocRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .x-spreadsheet{
    width: 100%;
    .x-spreadsheet-toolbar{
    box-sizing: border-box;
    }

  }
  .docx-wrapper{
    background-color: transparent;
  }
  .docx-wrapper>section.docx{
    box-shadow: none;
  }

`;
const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
  max-width: 940px;
  border: 0;
  position: relative;
`;

const Mark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
