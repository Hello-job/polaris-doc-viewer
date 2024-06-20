import React, { CSSProperties, FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { HeaderBar } from './components/HeaderBar';
import { ProxyRenderer } from './components/ProxyRenderer';
import BMPRenderer from './plugins/bmp';
import HTMLRenderer from './plugins/html';
import ImageProxyRenderer from './plugins/image';
import JPGRenderer from './plugins/jpg';
import MSDocRenderer from './plugins/ppt';
import MSGRenderer from './plugins/msg';
import PDFRenderer from './plugins/pdf';
import PNGRenderer from './plugins/png';
import TIFFRenderer from './plugins/tiff';
import TXTRenderer from './plugins/txt';
import CloudDocRenderer from './plugins/cloud-doc';
import { AppProvider } from './state';
import { defaultTheme } from './theme';
import { DocViewerProps } from './types';
import { IStyledProps } from './types';
import { i18n, I18nextProvider } from './i18n';

const DocViewer: FC<DocViewerProps> = (props) => {
  const { documents, theme } = props;

  if (!documents || documents === undefined) {
    throw new Error(
      "Please provide an array of documents to DocViewer.\ne.g. <DocViewer documents={[ { uri: 'https://mypdf.pdf' } ]} />"
    );
  }
  return (
    <AppProvider {...props}>
      <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={defaultTheme}>
        <Container id="react-doc-viewer" data-testid="react-doc-viewer" {...props}>
          <HeaderBar />
          <ProxyRenderer />
        </Container>
      </ThemeProvider>
      </I18nextProvider>
      
    </AppProvider>
  );
};

export default DocViewer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: ${(props: IStyledProps) => props.theme.bg_100};
  height: 100%;
`;

export { DocViewerRenderers } from './plugins';
export * from './types';
export * from './utils/fileLoaders';
export {
  BMPRenderer,
  HTMLRenderer,
  ImageProxyRenderer,
  JPGRenderer,
  MSDocRenderer,
  MSGRenderer,
  PDFRenderer,
  PNGRenderer,
  TIFFRenderer,
  TXTRenderer,
  CloudDocRenderer,
};
