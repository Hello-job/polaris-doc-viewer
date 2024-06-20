import React, { useContext } from 'react';
import styled from 'styled-components';
import { DownloadIcon } from './icons/downLoad';
import { IStyledProps } from '../types';
import { DocViewerContext } from '../state';
import { FileSourceType } from 'polaris-react-component';
import { useTranslation } from 'react-i18next';

const DownLoad = () => {
  const { t } = useTranslation();
  const { state } = useContext(DocViewerContext);
  const { currentDocument, theme } = state;

  return (
    <DownButton>
      <Link href={currentDocument?.uri} download={currentDocument?.uri}>
        {FileSourceType.FS === currentDocument?.resourceType ? (
          <>{t('enter')}</>
        ) : (
          <>
            <Transform>
              <DownloadIcon color={theme?.text_primary} />
            </Transform>
            {t('downLoad')}
          </>
        )}
      </Link>
    </DownButton>
  );
};

const DownButton = styled.div`
  padding: 5px 16px;
  border: 1px solid ${(props: IStyledProps) => props.theme.border_primary};
  border-radius: 6px;
  color: ${(props: IStyledProps) => props.theme.text_primary};
  font-size: 14px;
  display: flex;
  cursor: pointer;
`;

const Transform = styled.div`
  transform: rotate(180deg);
  margin-right: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${(props: IStyledProps) => props.theme.text_primary};
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export { DownLoad };
