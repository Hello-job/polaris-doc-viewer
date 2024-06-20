import React, { FC, useContext, useRef } from 'react';
import styled from 'styled-components';
import { DocViewerContext } from '../state';
import { nextDocument, previousDocument } from '../state/actions';
import { IStyledProps } from '../types';
import { LeftArrow, RightArrow } from './icons';
import { FooterRender } from './Footer';
import { Loading } from './Loading';

interface IDocumentNav {
  children: React.ReactNode;
  loading?: boolean;
}

export const DocumentNav: FC<IDocumentNav> = ({ children, loading }) => {
  const {
    state: { currentDocument, currentFileNo, documents, theme },
    dispatch,
  } = useContext(DocViewerContext);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  if (documents.length < 1 || !currentDocument) return null;

  let fileName = currentDocument.uri;

  const splitURL = fileName.split('/');
  if (splitURL.length) {
    fileName = splitURL[splitURL.length - 1];
  }

  const handleScrollView = (index: number) => {
    setTimeout(() => {
      const dom = document.getElementById(`document${index}`);
      dom?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 100);
  };



  const handleTouchStart = (e: any) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleSelectedPrevious = () => {
    dispatch(previousDocument());
    handleScrollView(currentFileNo - 1);
  }

  const handleSelectedNext = () => {
    dispatch(nextDocument());
    handleScrollView(currentFileNo + 1);
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleSelectedNext()
    } else if (touchEndX.current - touchStartX.current > 50) {
      handleSelectedPrevious()
    }
  };

  return (
    <Container id="doc-nav"       
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}>
      {loading ? (
        <Loading />
      ) : (
        <ContentBox>
          <Warp>
            <ButtonPrev
              id="doc-nav-prev"
              onClick={() => handleSelectedPrevious()}
              disabled={currentFileNo === 0}>
              <LeftArrow color={theme?.text_primary} size="60%" />
            </ButtonPrev>
          </Warp>

          {children}

          <Warp>
            <ButtonNext
              id="doc-nav-next"
              onClick={() => handleSelectedNext()}
              disabled={currentFileNo >= documents.length - 1}>
              <RightArrow color={theme?.text_primary} reverse size="60%" />
            </ButtonNext>
          </Warp>
        </ContentBox>
      )}
      <FooterRender />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: ${(props: IStyledProps) => props.theme.text_primary};
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const Warp = styled.div`
  width: 136px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonPrev = styled.button`
  width: 54px;
  height: 54px;
  margin: 0 5px 0 10px;
  border-radius: 50%;
  background-color: ${(props: IStyledProps) => props.theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  outline: none;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
const ButtonNext = styled(ButtonPrev)`
  margin: 0 5px;
  background-color: ${(props: IStyledProps) => props.theme.primary};
`;
