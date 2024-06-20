import React, { useContext } from 'react';
import { ExitIcon } from './icons/exit';
import styled from 'styled-components';
import { IStyledProps } from '../types';
import { DocViewerContext } from '../state';
import { useTranslation } from 'react-i18next'

const Exit = () => {
  const {
    state: { theme, onClose },
  } = useContext(DocViewerContext);
  const { t } = useTranslation()
  return (
    <ExitButton
      onClick={() => {
        onClose?.();
        // dispatch(init());
      }}>
      <ExitIcon color={theme?.icon_color} />
      <Word>{t('exit')}</Word>
      <Line />
    </ExitButton>
  );
};

const ExitButton = styled.div`
  display: flex;
  align-items: center;
  color: ${(props: IStyledProps) => props.theme.text_primary};
  font-size: 14px;
  cursor: pointer;
`;

const Word = styled.span`
  margin-left: 5px;
`;

const Line = styled.div`
  margin-left: 24px;
  width: 1px;
  height: 24px;
  background-color: ${(props: IStyledProps) => props.theme.text_undertone};
`;

export default Exit;
