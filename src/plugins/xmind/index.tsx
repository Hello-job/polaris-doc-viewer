import React, { useEffect } from "react";
import styled from "styled-components";
import { DocRenderer } from "../..";
import { XMindEmbedViewer } from 'polaris-xmind-viewer'

const XmindRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  useEffect(() => {
    if(!currentDocument?.uri) return;
    const viewer = new XMindEmbedViewer({
      el: '#video-renderer', // HTMLElement | HTMLIFrameElement | string
      region: 'cn', //optinal, global(default) or cn
      styles: {
        width: '100%',
        height: '100%'
      }
    })
    
    fetch(currentDocument?.uri)
      .then(res => res.arrayBuffer())
      .then(file => viewer.load(file))
  }, [])
  if (!currentDocument) return null;

  return (
    <Container id="video-renderer">
    </Container>
  );
};

export default XmindRenderer;

XmindRenderer.fileTypes = ['xmind', 'application/octet-stream', 'application/vnd.xmind.workbook'];
XmindRenderer.weight = 0;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

