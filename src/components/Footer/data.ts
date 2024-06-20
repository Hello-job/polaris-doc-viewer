import { Component } from 'react';
import { ExcelIcon } from '../icons/excel';
import { ImgIcon } from '../icons/img';
import { PdfIcon } from '../icons/pdf';
import { WordIcon } from '../icons/word';
import { ZipIcon } from '../icons/zip';
import { UnknownIcon } from '../icons/unknownFile';

const iconMap: Record<string, any> = {
  excel: {
    Component: ExcelIcon,
  },
  png: {
    Component: ImgIcon,
  },
  pdf: {
    Component: PdfIcon,
  },
  docx: {
    Component: WordIcon,
  },
  doc: {
    Component: WordIcon,
  },
  zip: {
    Component: ZipIcon,
  },
};

const unknownIcon = UnknownIcon;
export { iconMap, unknownIcon };
