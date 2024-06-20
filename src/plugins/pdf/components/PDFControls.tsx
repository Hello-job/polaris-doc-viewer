import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { Button, LinkButton } from '../../../components/common';
import { IStyledProps } from '../../../types';
import { PDFContext } from '../state';
import { setPDFPaginated, setZoomLevel } from '../state/actions';
import { initialPDFState } from '../state/reducer';
import {
  DownloadPDFIcon,
  ResetZoomPDFIcon,
  TogglePaginationPDFIcon,
  ZoomInPDFIcon,
  ZoomOutPDFIcon,
} from './icons';
import PDFPagination from './PDFPagination';

const PDFControls: FC<{}> = () => {
  const {
    state: { mainState, paginated, zoomLevel, numPages },
    dispatch,
  } = useContext(PDFContext);

  const currentDocument = mainState?.currentDocument || null;
  const theme = mainState?.theme;

  return (
    <Container id="pdf-controls">
      {paginated && numPages > 1 && <PDFPagination />}

      {currentDocument?.fileData && (
        <DownloadButton
          id="pdf-download"
          href={currentDocument?.fileData as string}
          download={currentDocument?.uri}>
          <DownloadPDFIcon color={theme?.icon_color} size="75%" />
        </DownloadButton>
      )}

      <ControlButton id="pdf-zoom-out" onMouseDown={() => dispatch(setZoomLevel(zoomLevel - 0.1))}>
        <ZoomOutPDFIcon color={theme?.icon_color} size="80%" />
      </ControlButton>

      <ControlButton id="pdf-zoom-in" onMouseDown={() => dispatch(setZoomLevel(zoomLevel + 0.1))}>
        <ZoomInPDFIcon color={theme?.icon_color} size="80%" />
      </ControlButton>

      <ControlButton
        id="pdf-zoom-reset"
        onMouseDown={() => dispatch(setZoomLevel(initialPDFState.zoomLevel))}
        disabled={zoomLevel === initialPDFState.zoomLevel}>
        <ResetZoomPDFIcon color={theme?.icon_color} size="70%" />
      </ControlButton>

      {numPages > 1 && (
        <ControlButton
          id="pdf-toggle-pagination"
          onMouseDown={() => dispatch(setPDFPaginated(!paginated))}>
          <TogglePaginationPDFIcon color={theme?.icon_color} size="70%" reverse={paginated} />
        </ControlButton>
      )}
    </Container>
  );
};

export default PDFControls;

const Container = styled.div`
  display: flex;
  /* position: sticky; */
  position: fixed;
  bottom: 100px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  justify-content: flex-end;
  padding: 8px;
  background-color: ${(props: IStyledProps) => props.theme.primary};
  border-radius: 4px;
  border: 1px solid ${(props: IStyledProps) => props.theme.border_primary};
  box-shadow: 0px 6px 24px 0px #1f23291a;

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const ControlButton = styled(Button)`
  width: 30px;
  height: 30px;
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const DownloadButton = styled(LinkButton)`
  width: 30px;
  height: 30px;
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
