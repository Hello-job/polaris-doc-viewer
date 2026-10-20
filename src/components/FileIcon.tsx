import React from 'react';
import { IDocument } from '../types';
import { getDocumentExtension, imageExtensions } from '../utils/fileTypes';
import { ExcelIcon } from './icons/excel';
import { ImgIcon } from './icons/img';
import { PdfIcon } from './icons/pdf';
import { WordIcon } from './icons/word';
import { ZipIcon } from './icons/zip';
import { UnknownIcon } from './icons/unknownFile';

const fileIcons = {
  pdf: PdfIcon,
  doc: WordIcon,
  docx: WordIcon,
  xls: ExcelIcon,
  xlsx: ExcelIcon,
  zip: ZipIcon,
};

export const FileIcon = (document: IDocument) => {
  const extension = getDocumentExtension(document);
  const Icon = imageExtensions.includes(extension)
    ? ImgIcon
    : fileIcons[extension as keyof typeof fileIcons] || UnknownIcon;

  return <Icon size="1em" />;
};
