
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg 
      width={size} 
      height={size * 1.6} 
      viewBox="0 0 250 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red vertical shape on the left */}
      <path 
        d="M110 32C50.3532 32 2 80.3532 2 140C2 199.647 50.3532 248 110 248V32Z" 
        fill="#EF4444" 
      />
      {/* Orange horizontal semi-circle on top right */}
      <path 
        d="M125 32H240C240 63.7584 214.242 89.5168 182.5 89.5168C150.758 89.5168 125 63.7584 125 32Z" 
        fill="#D97706" 
      />
      {/* Navy vertical semi-circle on the right */}
      <path 
        d="M135 110V360C190.228 360 235 315.228 235 260C235 204.772 190.228 160 135 160V110Z" 
        fill="#1E3A8A" 
      />
      {/* Cyan horizontal semi-circle on bottom left */}
      <path 
        d="M2 360H110C110 329.624 85.3757 305 55 305C24.6243 305 0 329.624 0 360H2Z" 
        fill="#06B6D4" 
      />
    </svg>
  );
};

export default Logo;
