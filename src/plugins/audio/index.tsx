import React from "react";
import styled from "styled-components";
import { DocRenderer } from "../..";

const AudioRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument) return null;

  return (
    <Container id="video-renderer">
      <Audio src={currentDocument.uri} controls  />
    </Container>
  );
};

export default AudioRenderer;

AudioRenderer.fileTypes = ["audio/mp3", "audio/wav", "audio/ogg", "audio/oga", 'audio/aac', 'audio/webm'];
AudioRenderer.weight = 0;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const Audio = styled.audio`
  width: 360px;
  border: 0;
`;
