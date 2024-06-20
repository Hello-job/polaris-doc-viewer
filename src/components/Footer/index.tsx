import React, { useContext, useMemo, FC, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { setFileNo } from '../../state/actions';
import { DocViewerContext } from '../../state';
import { FileIcon } from 'polaris-react-component'

interface ItemProps {
  active: boolean;
}

interface IContent {
  show: boolean;
}

export const FooterRender: FC<any> = () => {
  const { state, dispatch } = useContext(DocViewerContext);
  const [show, setShow] = useState(false);
  const { config, currentFileNo, documents } = state;
  const handleCurrentDocument = (index: number) => {
    dispatch(setFileNo(index));
  };
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const contentDom = contentRef.current;
    const maxWidth = contentDom?.getBoundingClientRect().width || (window.innerWidth - 60);
    const listWidth = fileList.length * 72;
    setShow(listWidth > maxWidth);
  }, [contentRef]);


  const fileList = useMemo(() => {
    return documents.map((item) => {
      return {
        ...item,
        type: item.resourceType,
      };
    });
  }, [documents]);

  return (
    <Container >
      <Content show={show} ref={contentRef}>
        {fileList.map((doc: any, index) => {
          return (
            <Item
              id={`document${index}`}
              onClick={() => handleCurrentDocument(index)}
              key={index}
              active={currentFileNo === index}>
              {FileIcon && <FileIcon {...doc} />}
            </Item>
          );
        })}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  box-sizing: border-box;
`;

const Content = styled.div<IContent>`
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  justify-content: ${(props: any) => (props.show ? 'flex-start' : 'center')};
`;

const Item = styled.div<ItemProps>`
  width: 46px;
  /* height: 46px; */
  box-sizing: border-box;
  margin-right: 26px;
  padding: 4px;
  border: 2px solid ${(props: any) => (props.active ? '#377aff' : 'transparent')};
  flex-shrink: 0;
  cursor: pointer;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  .wary {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 1px;
    /* background-color: #d0d3d6; */
  }
  img{
    max-height: 46px;
  }
`;
