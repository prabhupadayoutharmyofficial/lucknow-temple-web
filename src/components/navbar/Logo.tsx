
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex-shrink-0 group">
      <img 
        src="/iskconlucknowlogo.png"
        alt="ISKCON Lucknow - Sri Sri Radha Krishna Temple"
        className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
        draggable={false}
        style={{
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
        }}
      />
    </Link>
  );
};

export default Logo;
