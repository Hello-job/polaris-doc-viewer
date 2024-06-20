import React from 'react';

export interface IIconProps {
  color?: string;
  size?: string | number | (string & {}) | undefined;
  reverse?: boolean;
}

export const ExitIcon = (props: IIconProps) => {
  const { color, size, reverse } = props;

  return (
    <svg
      width={size || 16}
      height={size || 16}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="30543">
      <path
        fill={color}
        d="M512 620.53408869l253.35667422 253.35667421a76.71951613 76.71951613 0 1 0 108.53408868-108.53408868L620.53408869 512l253.27382376-253.35667422a76.71951613 76.71951613 0 1 0-108.53408868-108.53408868L512 403.46591131 258.64332578 150.1092371a76.71951613 76.71951613 0 0 0-108.53408868 108.53408868L403.46591131 512l-253.27382376 253.35667422a76.71951613 76.71951613 0 1 0 108.53408868 108.53408868L512 620.53408869z"
        p-id="30544"></path>
    </svg>
  );
};
