import React from 'react';
import '../styles/background.css';

const AnimatedBackground = () => {
  return (
    <div className="background-container">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="animated-svg">
        <defs>
          <linearGradient id="strokeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff7e5f" />
            <stop offset="100%" stopColor="#feb47b" />
          </linearGradient>

          <mask id="revealMask">
            <rect className="mask-rect" x="0" y="100" width="100" height="100" fill="white" />
          </mask>
        </defs>

        <path
          d="
            M 50 100 
            C 55 90, 45 80, 50 70 
            C 55 60, 45 50, 50 40 
            C 55 30, 45 20, 50 10 
            C 53 5, 47 0, 50 -10
            C 52 -20, 48 -30, 50 -40
            C 50 -45, 52 -50, 48 -50
            C 44 -50, 46 -45, 50 -40
            Z"
          fill="url(#strokeGradient)"
          mask="url(#revealMask)"
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
