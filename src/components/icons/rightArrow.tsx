import React from 'react';
import { Arrow } from './arrow';
export interface IIconProps {
  color?: string;
  size?: string | number | (string & {}) | undefined;
  reverse?: boolean;
}

const RightArrow = (props: IIconProps) => {
  return <Arrow {...props} />;
};

export { RightArrow };
