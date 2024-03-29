// ArrowDownIcon.tsx
import React from 'react';

const ArrowDownIcon: React.FC = () => {
  const theme = localStorage.getItem('theme') !== 'light';
  const fillColor = theme ? '#fff' : '#000';
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-10 transition-width duration-300 animate-pulse hover:w-11">
      <g>
        <path fill={fillColor} d="M 25.47 25.73 L 43.52 7.68 Q 44.68 6.53 46.10 7.34 Q 46.27 7.43 46.38 7.57 Q 47.71 9.12 46.27 10.55 L 25.28 31.53 A 0.39 0.38 44.5 0 1 24.73 31.53 L 3.37 10.16 A 1.55 1.54 -59.4 0 1 2.99 8.65 Q 3.28 7.67 3.99 7.30 Q 5.39 6.57 6.50 7.68 L 24.55 25.73 Q 25.01 26.19 25.47 25.73 Z" />
        <path fill={fillColor} d="M 25.48 38.73 L 43.43 20.77 Q 44.33 19.87 45.58 20.14 Q 46.10 20.25 46.41 20.61 Q 47.71 22.11 46.31 23.51 L 25.29 44.53 Q 25.01 44.81 24.74 44.53 L 3.74 23.53 Q 2.39 22.18 3.55 20.65 Q 3.70 20.45 3.92 20.33 Q 5.33 19.52 6.48 20.67 L 24.56 38.73 Q 25.02 39.19 25.48 38.73 Z" />
      </g>
    </svg>
  );
};

export default ArrowDownIcon;
