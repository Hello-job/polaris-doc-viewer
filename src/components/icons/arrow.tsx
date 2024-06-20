import React from 'react';

export interface IIconProps {
  color?: string;
  size?: string | number | (string & {}) | undefined;
  reverse?: boolean;
}

const Arrow = (props: IIconProps) => {
  const { size, color, reverse } = props;
  return (
    <svg
      width={size || 16}
      height={size || 16}
      style={{ transform: `${reverse ? 'rotate(180deg)' : ''}` }}
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="90839">
      <path
        fill={color}
        d="M691.29 161.881a69.915 69.915 0 0 0-99.258 0L294.204 462.04a71.08 71.08 0 0 0 0 99.946l297.828 300.106a69.915 69.915 0 0 0 99.258 0 71.133 71.133 0 0 0 0-99.947L443.197 511.986 691.29 261.987a71.133 71.133 0 0 0 0-100v-0.053z"
        p-id="90840"></path>
    </svg>
  );
};

export { Arrow };
