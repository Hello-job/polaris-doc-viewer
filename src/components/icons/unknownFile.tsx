import React from 'react';
import type { IIconProps } from './types';

const UnknownIcon = (props: IIconProps) => {
  const { size } = props;
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="122269"
      width={size || 16}
      height={size || 16}>
      <path
        d="M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z"
        fill="#E5E5E5"
        p-id="122270"></path>
      <path
        d="M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z"
        fill="#CCCCCC"
        p-id="122271"></path>
    </svg>
  );
};

export { UnknownIcon };
