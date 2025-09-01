
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { getAllNavItems } from './NavigationItems';

interface MobileNavContentProps {
  user: any;
  isAdmin: boolean;
  onSignOut: () => void;
  onClose: () => void;
}

const MobileNavContent: React.FC<MobileNavContentProps> = ({ 
  user, 
  isAdmin, 
  onSignOut, 
  onClose 
}) => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await onSignOut();
    onClose();
  };

  return (
    <div className="px-6 py-8">
      <div className="flex flex-col space-y-4">
        {getAllNavItems(user).map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-lg font-medium transition-all duration-300 py-3 px-4 rounded-xl group ${
              isActivePath(item.path)
                ? 'text-white bg-gradient-to-r from-krishna-blue to-krishna-maroon shadow-lg'
                : 'text-krishna-blue hover:text-white hover:bg-gradient-to-r hover:from-krishna-gold hover:to-krishna-saffron hover:shadow-lg'
            }`}
            onClick={onClose}
          >
            <div className="flex items-center">
              {item.name}
              <div className={`ml-auto w-2 h-2 rounded-full transition-all duration-300 ${
                isActivePath(item.path)
                  ? 'bg-white'
                  : 'bg-transparent group-hover:bg-white'
              }`} />
            </div>
          </Link>
        ))}
        
        {user && (
          <div className="border-t border-krishna-gold/30 pt-6 mt-6 space-y-3">
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={onClose}
                className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl text-krishna-blue hover:text-white hover:bg-gradient-to-r hover:from-krishna-blue hover:to-krishna-maroon transition-all duration-300 hover:shadow-lg group"
              >
                <Shield className="h-5 w-5" />
                Admin Dashboard
                <div className="ml-auto w-2 h-2 rounded-full bg-transparent group-hover:bg-white transition-all duration-300" />
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl text-krishna-maroon hover:text-white hover:bg-gradient-to-r hover:from-krishna-maroon hover:to-red-600 transition-all duration-300 w-full text-left hover:shadow-lg group"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
              <div className="ml-auto w-2 h-2 rounded-full bg-transparent group-hover:bg-white transition-all duration-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavContent;
