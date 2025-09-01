
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  item: { name: string; path: string };
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`relative py-3 px-4 text-sm font-medium transition-all duration-300 group rounded-full ${
        isActivePath(item.path)
          ? 'text-white bg-gradient-to-r from-krishna-blue to-krishna-maroon shadow-md'
          : 'text-krishna-blue hover:text-white hover:bg-gradient-to-r hover:from-krishna-gold hover:to-krishna-saffron hover:shadow-md'
      }`}
    >
      {item.name}
      
      {/* Glow effect on hover */}
      <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
        isActivePath(item.path) 
          ? 'bg-gradient-to-r from-krishna-blue/20 to-krishna-maroon/20 blur-sm' 
          : 'bg-gradient-to-r from-krishna-gold/0 to-krishna-saffron/0 group-hover:from-krishna-gold/20 group-hover:to-krishna-saffron/20 group-hover:blur-sm'
      } -z-10`} />
      
      {/* Bottom indicator line */}
      <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-krishna-gold to-krishna-saffron transition-all duration-300 ${
        isActivePath(item.path) 
          ? 'w-8' 
          : 'w-0 group-hover:w-8'
      }`} />
    </Link>
  );
};

export default NavLink;
