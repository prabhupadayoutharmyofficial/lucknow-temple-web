
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex-shrink-0 group">
      <img 
        src="/lovable-uploads/f1e30908-8120-41f1-bdef-06d8962203e4.png"
        alt="ISKCON Lucknow"
        className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
        draggable={false}
        style={{
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
        }}
      />
    </Link>
  );
};

export default Logo;
