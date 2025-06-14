
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
      <div className="flex flex-col space-y-6">
        {getAllNavItems(user).map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-lg font-medium transition-colors ${
              isActivePath(item.path)
                ? 'text-krishna-gold'
                : 'text-gray-900 hover:text-krishna-gold'
            }`}
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        
        {user && (
          <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={onClose}
                className="flex items-center gap-3 text-lg font-medium text-gray-900 hover:text-krishna-gold transition-colors"
              >
                <Shield className="h-5 w-5" />
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 text-lg font-medium text-gray-900 hover:text-krishna-gold transition-colors w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavContent;
