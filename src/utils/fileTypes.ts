import { IDocument } from '../types';

// Keep the resource values used by existing integrations.
export enum FileSourceType {
  DB = 1,
  OSS = 2,
  DP = 3,
  JQ = 4,
  FS = 5,
}

export const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];

export const getDocumentExtension = (document: IDocument): string => {
  if (document.suffix) return document.suffix.replace(/^\./, '').toLowerCase();

  const uriName = document.uri.split(/[?#]/)[0].split('/').pop() || '';
  const fileName = uriName.includes('.') ? uriName : document.name || '';
  const dot = fileName.lastIndexOf('.');
  return dot >= 0 ? fileName.slice(dot + 1).toLowerCase() : '';
};
