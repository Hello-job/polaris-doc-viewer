import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Artplayer from 'artplayer/dist/artplayer.legacy.js';
import { DocRenderer } from '../../types';

const VideoRenderer: DocRenderer = ({ mainState: { currentDocument, language } }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const documentURI = currentDocument?.uri;

  useEffect(() => {
    if (!containerRef.current || !documentURI) return;

    const art = new Artplayer({
      container: containerRef.current,
      url: documentURI,
      theme: '#377aff',
      volume: 0.5,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoSize: true,
      autoMini: true,
      setting: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      lang: language === 'zh' ? 'zh-cn' : language,
    });

    return () => art.destroy(false);
  }, [documentURI, language]);

  if (!currentDocument) return null;

  return (
    <Container className="video-renderer">
      <div id="video-renderer" ref={containerRef} />
    </Container>
  );
};

export default VideoRenderer;

const mediaTypes = {
  video: [
    'mp4',
    'video/mp4',
    'quicktime',
    'video/quicktime',
    'x-msvideo',
    'video/x-msvideo',
    'webm',
    'video/webm',
    'mpg',
    'mpeg',
    'avi',
    'rm',
    'rmvb',
    'mov',
    'wmv',
    'asf',
    'dat',
  ],
  audio: [
    'mp3',
    'audio/mpeg',
    'ogg',
    'audio/ogg',
    'wav',
    'audio/wav',
    'oga',
    'audio/oga',
    'aac',
    'audio/aac',
    'audio/webm',
    'm4a',
    'audio/x-m4a',
    'flac',
    'wma',
    'aiff',
    'ape',
    'dsd',
  ],
};

VideoRenderer.fileTypes = [...mediaTypes.video, ...mediaTypes.audio];
VideoRenderer.weight = 0;
VideoRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();

const Container = styled.div`
  width: 100%;
  height: 100%;

  #video-renderer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
