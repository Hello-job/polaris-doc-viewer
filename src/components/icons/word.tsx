import React from 'react';
import { IIconProps } from './types';

const WordIcon = (props: IIconProps) => {
  const { size } = props;
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="91318"
      width={size || 16}
      height={size || 16}>
      <path
        d="M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z"
        fill="#6CCBFF"
        p-id="91319"></path>
      <path
        d="M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z"
        fill="#C4EAFF"
        p-id="91320"></path>
      <path
        d="M280 385.6h64.8l64.8 244h0.8l71.2-244H544l72 244 65.6-244H744L648 700h-64.8L512 458.4h-0.8l-72 240.8h-64.8L280 385.6z"
        fill="#FFFFFF"
        p-id="91321"></path>
    </svg>
  );
};

export { WordIcon };
