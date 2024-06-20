// @ts-ignore
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import React, { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import styled from 'styled-components';
import { DocRenderer, IStyledProps } from '../../types';
import PDFPages from './components/pages/PDFPages';
import PDFControls from './components/PDFControls';
import { PDFProvider } from './state';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFRenderer: DocRenderer = ({ mainState }) => {

  return (
    <PDFProvider mainState={mainState}>
      <Container id="pdf-renderer" data-testid="pdf-renderer">
        <PDFControls />
        <PDFPages />
      </Container>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ['pdf', 'application/pdf'];
PDFRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  height: 100%;
  position: relative;

  /* width */
  &::-webkit-scrollbar {
    ${(props: IStyledProps) => {
      return props.theme.disableThemeScrollbar ? '' : 'width: 3px; height: 8px;';
    }};
  }
  /* Track */
  &::-webkit-scrollbar-track {
    /* background: ${(props: IStyledProps) => props.theme.secondary}; */
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${(props: IStyledProps) => props.theme.tertiary};
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props: IStyledProps) => props.theme.primary};
  }
`;
