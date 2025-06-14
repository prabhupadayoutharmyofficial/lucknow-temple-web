
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
      className={`relative py-2 px-3 text-sm font-medium transition-all duration-300 group ${
        isActivePath(item.path)
          ? 'text-krishna-gold'
          : 'text-gray-700 hover:text-krishna-gold'
      }`}
    >
      {item.name}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-krishna-gold transition-all duration-300 ${
        isActivePath(item.path) 
          ? 'w-full' 
          : 'w-0 group-hover:w-full'
      }`} />
    </Link>
  );
};

export default NavLink;
