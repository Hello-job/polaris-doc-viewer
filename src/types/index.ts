import { FC, ReactElement, CSSProperties } from 'react';
import { ThemedStyledProps } from 'styled-components';
import { IMainState } from '../state/reducer';
import { FileLoaderFunction } from '../utils/fileLoaders';

export interface IConfig {
  header?: IHeaderConfig;
}
export interface IHeaderConfig {
  disableHeader?: boolean;
  disableFileName?: boolean;
  retainURLParams?: boolean;
  overrideComponent?: IHeaderOverride;
}

export type IHeaderOverride = (
  state: IMainState,
  previousDocument: () => void,
  nextDocument: () => void
) => ReactElement<any, any> | null;

export interface ITheme {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  text_primary?: string;
  text_secondary?: string;
  text_tertiary?: string;
  text_undertone?: string;
  border_primary?: string;
  bg_100?: string;
  icon_color?: string;
  btn_color?: string;
  disableThemeScrollbar?: boolean;
}

export interface IStyledProps extends ThemedStyledProps<any, any> {
  theme: ITheme;
}

export interface IDocument {
  uri: string;
  fileType?: string;
  fileData?: string | ArrayBuffer;
  suffix: string;
  resourceType?: number;
  type?: number;
  name?: string;
  id?: string | number;
}

export interface DocRendererProps {
  mainState: IMainState;
}
export interface DocRenderer extends FC<DocRendererProps> {
  fileTypes: string[];
  weight: number;
  fileLoader?: FileLoaderFunction | null | undefined;
}

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
  activeDocument?: IDocument;
  language?: string;
  onClose?: () => void;
}
