import React, { useState } from 'react';
import styled from 'styled-components';
import { DocRenderer } from '../../types';
import { Loading } from '../../components/Loading';

const CloudDocRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  const [loading, setLoading] = useState(true);

  if (!currentDocument) return null;

  const iframeLoaded = () => {
    setLoading(false);
  };
  return (
    <Container id="msdoc-renderer">
      <IFrame
        onLoad={iframeLoaded}
        id="msdoc-iframe"
        title="msdoc-iframe"
        src={currentDocument.uri}
      />
      {loading && (
        <Mark>
          <Loading />
        </Mark>
      )}
    </Container>
  );
};

export default CloudDocRenderer;

CloudDocRenderer.fileTypes = ['link'];
CloudDocRenderer.weight = 0;
// CloudDocRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
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
