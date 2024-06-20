import React from 'react';

export interface IIconProps {
  color?: string;
  size?: string | number | (string & {}) | undefined;
  reverse?: boolean;
}

const DownloadIcon = (props: IIconProps) => {
  const { size, color = '#1f2329' } = props;
  return (
    <svg
      width={size || 16}
      height={size || 16}
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="90682">
      <path
        fill={color}
        d="M539.52 317.76l154.24 154.24a48 48 0 0 1-67.904 67.84L548.736 462.848v444.224a48 48 0 1 1-96 0V467.904L378.816 541.76a48 48 0 1 1-67.84-67.84l156.16-156.16a51.2 51.2 0 0 1 72.32 0z m302.528-173.76a48 48 0 0 1 6.528 95.552l-6.528 0.448H148.992a48 48 0 0 1-6.464-95.552l6.464-0.448h693.12z"
        p-id="90683"></path>
    </svg>
  );
};

export { DownloadIcon };
