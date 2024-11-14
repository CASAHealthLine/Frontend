import React from 'react';
import { Cross } from 'lucide-react';

export interface LogoProps {
    size?: number;
    stroke?: string;
    fill?: string;
    backgroundColor?: string;
}
  
/**
 * Logo component displays a customizable cross icon with optional size, color, and background.
 *
 * @param {number} size - The size of the logo icon.
 * @param {string} stroke - The stroke color of the icon.
 * @param {string} backgroundColor - The background color of the icon.
 * @param {string} fill - The fill color of the icon.
 */
export const Logo: React.FC<LogoProps> = ({ 
    size = 40,
    stroke = 'white',
    backgroundColor = 'var(--primary-bg-color)',
    fill = 'transparent',
    ...props 
}): JSX.Element => {
    const logoStyle: React.CSSProperties = {
      display: 'inline-block',
      backgroundColor,
      padding: `${size * 0.15}px`,
    };
  
    return (
      <Cross size={size} stroke={stroke} fill={fill} className='rounded-full' style={logoStyle} {...props}/>
    );
};