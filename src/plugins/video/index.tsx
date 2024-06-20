import React, { useEffect } from "react";
import styled from "styled-components";
import Artplayer from 'artplayer';
import { DocRenderer } from "../..";

const VideoRenderer: DocRenderer = ({ mainState: { currentDocument, language } }) => {
  useEffect(() => {
    const lang = language === 'zh' ? 'zh-cn' : language
    var art = new Artplayer({
      container: '#video-renderer',
      url: currentDocument?.uri || '',
      theme: '#377aff',
      volume: 0.5,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoSize: true,
      autoMini: true,
      // screenshot: true,
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
      lang
  });
  art.on('click', (event) => {
    console.info('click', event);
});
  art.on('screenshot', (dataUri) => {
    art.screenshot();
  });

  }, [])
  if (!currentDocument) return null;

  return (
    <Container className="video-renderer">
      <div id='video-renderer'>

      </div>
      {/* <Video controls src={currentDocument.uri} /> */}
    </Container>
  );
};

export default VideoRenderer;

const MemdiaMap = {
  video: ['mp4', "video/mp4", 'quicktime', "video/quicktime", 'x-msvideo', "video/x-msvideo", 'webm', "video/webm", 'mpg', 'mpeg', 'avi', 'rm', 'rmvb', 'mov', 'wmv', 'asf', 'dat'],
  audio: ['mp3','audio/mpeg', 'ogg',"audio/ogg", 'wav',  "audio/wav", 'ogg', "audio/ogg", 'oga', "audio/oga", 'aac', 'audio/aac',
  'webm', 'audio/webm',"m4a", 'audio/x-m4a', 'flac', 'wma', 'aiff', 'ape', 'dsd']
}
VideoRenderer.fileTypes = [ 
  ...MemdiaMap.video,
  ...MemdiaMap.audio,
];
VideoRenderer.weight = 0;

const Container = styled.div`
  width: 100%;
  height: 100%;

  #video-renderer{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  border: 0;
`;
