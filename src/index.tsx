import React, { FC, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { HeaderBar } from './components/HeaderBar';
import { ProxyRenderer } from './components/ProxyRenderer';

import { AppProvider } from './state';
import { defaultTheme } from './theme';
import { DocViewerProps } from './types';
import { IStyledProps } from './types';
import { DocViewerRenderers as pluginRenderers } from './plugins';
import { i18n, I18nextProvider } from './i18n'
// import { textDocuments } from './constants/index'
// import ReactDOM from 'react-dom';
// import PNG from './_example-files_/png.png';
// import App from './App';

const DocViewer: FC<DocViewerProps> = (props) => {
  const { documents, theme, language } = props;

  if (!documents || documents === undefined) {
    throw new Error(
      "Please provide an array of documents to DocViewer.\ne.g. <DocViewer documents={[ { uri: 'https://mypdf.pdf' } ]} />"
    );
  }

  useEffect(() => {
      i18n.changeLanguage(language ?? 'zh');
  }, [language]);

  return (
    
      <AppProvider pluginRenderers={pluginRenderers} {...props} >
        <ThemeProvider theme={theme ? { ...defaultTheme, ...theme } : defaultTheme}>
        <I18nextProvider i18n={i18n}>
          <Container id="react-doc-viewer" data-testid="react-doc-viewer" {...props}>
            <HeaderBar />
            <ProxyRenderer />
          </Container>
          </I18nextProvider>
        </ThemeProvider>
      </AppProvider>
  );
};
//  "build": "rm -rf build && tsc -p tsconfig-npm.json",



// ReactDOM.render(
//   <App documents={textDocuments} pluginRenderers={pluginRenderers} />,
//   document.getElementById('root')
// );

export default DocViewer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${(props: IStyledProps) => props.theme.bg_100};
  height: 100%;
`;

export { DocViewerRenderers } from './plugins';
export * from './types';
export * from './utils/fileLoaders';
export { default as BMPRenderer } from './plugins/bmp';
export { default as HTMLRenderer } from './plugins/html';
export { default as ImageProxyRenderer } from './plugins/image'
export { default as JPGRenderer } from './plugins/jpg';
export { default as MSDocRenderer } from './plugins/ppt'
export { default as MSGRenderer } from './plugins/msg';
export { default as PDFRenderer } from './plugins/png';
export { default as PNGRenderer } from './plugins/png';
export { default as TIFFRenderer } from './plugins/tiff';
export { default as TXTRenderer } from './plugins/txt';
export { default as CloudDocRenderer } from './plugins/cloud-doc';

