import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DocRenderer } from '../../types';
// import ExcelViewer from 'polaris-excel-viewer';

const MSDocRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {

  // 使用polaris-excel-viewer 预览有样式丢失问题
  // useEffect(() => {
  //     new ExcelViewer("#xls-renderer", currentDocument?.uri, {
  //     theme: 'light',
  //     lang: "zh_cn"
  // });
  // }, [])
  if (!currentDocument) return null;

  return (
    <Container id="xls-renderer">
      <iframe width='100%' height='99%' src={`https://view.officeapps.live.com/op/view.aspx?src=${currentDocument?.uri}`} />
    </Container>
  );
};

export default MSDocRenderer;

const MSDocFTMaps = {
  xls: ['xls', 'application/vnd.ms-excel'],
  xlsx: ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};

MSDocRenderer.fileTypes = [
  ...MSDocFTMaps.xls,
  ...MSDocFTMaps.xlsx,
];
MSDocRenderer.weight = 0;
MSDocRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  .x-spreadsheet{
    width: 100%;
    .x-spreadsheet-toolbar{
    box-sizing: border-box;
    }
  }

`;
