import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

interface IconProps {
    [key: string]: any 
}


const Telegram = forwardRef(({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: any ) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 32 32"
      {...rest}
    >
    <title>telegram</title>
<path  d="M16 0c-8.838 0-16 7.162-16 16s7.162 16 16 16 16-7.163 16-16-7.163-16-16-16zM23.863 10.969l-2.625 12.369c-0.181 0.881-0.712 1.087-1.45 0.681l-4-2.956-1.919 1.869c-0.225 0.219-0.4 0.4-0.8 0.4-0.519 0-0.431-0.194-0.606-0.688l-1.363-4.475-3.956-1.231c-0.856-0.262-0.862-0.85 0.194-1.269l15.412-5.95c0.7-0.319 1.381 0.169 1.113 1.25z"/>
    </svg>
    
  );
});

Telegram.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Telegram.displayName = 'Telegram';

export default Telegram;