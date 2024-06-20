import React from 'react';
import styled from 'styled-components';
import { DocRenderer } from '../../types';
import FileViewer from 'polaris-offices-viewer';

const MSDocRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {

  if (!currentDocument) return null;

  return (
    <Container id="msdoc-renderer">
      <FileViewer 
        fileType={currentDocument.suffix}
        filePath={currentDocument?.uri}
        errorComponent={<>errorc错误</>} 
      />
    </Container>
  );
};

export default MSDocRenderer;

const MSDocFTMaps = {
  ppt: ['ppt', 'application/vnd.ms-powerpoint'],
  pptx: ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
};

MSDocRenderer.fileTypes = [
  ...MSDocFTMaps.ppt,
  ...MSDocFTMaps.pptx,
];
MSDocRenderer.weight = 0;
MSDocRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  

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
