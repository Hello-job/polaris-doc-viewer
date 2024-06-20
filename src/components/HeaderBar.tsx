import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { DocViewerContext } from '../state';
import { nextDocument, previousDocument } from '../state/actions';
import { IStyledProps } from '../types';
import { DownLoad } from './DownLoad';
import { FileName } from './FileName';
import Exit from './Exit';

export const HeaderBar: FC<{}> = () => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { config } = state;

  if (config?.header?.disableHeader) return null;

  const override = config?.header?.overrideComponent?.(
    state,
    () => dispatch(previousDocument()),

    () => dispatch(nextDocument())
  );

  if (override) {
    return override;
  } else {
    return (
      <Container id="header-bar" data-testid="header-bar">
        <Exit />

        <FileName />
        <DownLoad />
        {/* <DocumentNav /> */}
      </Container>
    );
  }
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
  padding: 0 10px;
  background-color: ${(props: IStyledProps) => props.theme.primary};
  font-size: 16px;

  min-height: 68px;
  border-bottom: 1px solid ${(props: IStyledProps) => props.theme.border_primary};
  @media (max-width: 768px) {
    min-height: 30px;
    padding: 5px;
    font-size: 10px;
  }
`;
