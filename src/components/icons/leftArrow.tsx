import React from 'react';
import { Arrow } from './arrow';
export interface IIconProps {
  color?: string;
  size?: string | number | (string & {}) | undefined;
  reverse?: boolean;
}

const LeftArrow = (props: IIconProps) => {
  return <Arrow {...props} />;
};

export { LeftArrow };
