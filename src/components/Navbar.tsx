
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  // Split navigation items into left and right groups
  const getLeftNavItems = () => [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Darshan', path: '/darshan' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const getRightNavItems = () => {
    const items = [
      { name: 'Visit', path: '/visit' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Donate', path: '/donate' },
      { name: 'Contact', path: '/contact' },
    ];

    if (!user) {
      items.push({ name: 'Sign In', path: '/auth' });
    }

    return items;
  };

  const isActivePath = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  // For mobile navigation, combine both groups for a single vertical menu
  const getAllNavItems = () => [...getLeftNavItems(), ...getRightNavItems()];

  return (
    <div className="relative">
      {/* Centered Logo - Enhanced overflowing effect */}
      <div className="absolute left-1/2 -top-16 transform -translate-x-1/2 z-50 pointer-events-auto">
        <Link to="/" className="block">
          <img 
            src="/lovable-uploads/f1e30908-8120-41f1-bdef-06d8962203e4.png"
            alt="ISKCON Lucknow"
            className="h-32 w-32 md:h-36 md:w-36 object-contain select-none"
            draggable={false}
            style={{
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25)) drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
            }}
          />
        </Link>
      </div>
      
      <nav className="bg-transparent backdrop-blur-none sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4 pt-16 md:pt-18 relative">
            {/* Left Navigation Group */}
            <div className="hidden lg:flex items-center gap-2 w-1/3 justify-start">
              {getLeftNavItems().map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                    isActivePath(item.path)
                      ? 'text-krishna-gold bg-white/20 backdrop-blur-sm border-b-2 border-krishna-gold shadow-lg'
                      : 'text-white hover:text-krishna-gold hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Empty Center Space for Logo */}
            <div className="w-1/3 flex justify-center">
              {/* Logo is positioned absolutely above */}
            </div>
            
            {/* Right Navigation Group */}
            <div className="hidden lg:flex items-center gap-2 w-1/3 justify-end">
              {getRightNavItems().map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                    isActivePath(item.path)
                      ? 'text-krishna-gold bg-white/20 backdrop-blur-sm border-b-2 border-krishna-gold shadow-lg'
                      : 'text-white hover:text-krishna-gold hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Admin and Sign Out buttons for authenticated users */}
              {user && (
                <>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 border-white/30 text-white hover:bg-white/20 hover:text-krishna-gold ml-3 backdrop-blur-sm">
                        <Shield className="h-4 w-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 border-white/30 text-white hover:bg-white/20 hover:text-krishna-gold ml-2 backdrop-blur-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button (absolute positioned) */}
            <div className="lg:hidden absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:bg-white/20 hover:text-krishna-gold backdrop-blur-sm"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden pb-4 border-t border-white/20 bg-black/30 backdrop-blur-md rounded-b-lg">
              <div className="flex flex-col space-y-2 pt-4">
                {getAllNavItems().map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 text-sm font-medium transition-colors rounded ${
                      isActivePath(item.path)
                        ? 'text-krishna-gold bg-white/20'
                        : 'text-white hover:bg-white/10 hover:text-krishna-gold'
                    }`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Admin and Sign Out for mobile authenticated users */}
                {user && (
                  <div className="border-t border-white/20 pt-4 mt-4">
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mb-2 flex items-center gap-2 border-white/30 text-white hover:bg-white/20 hover:text-krishna-gold"
                        >
                          <Shield className="h-4 w-4" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 border-white/30 text-white hover:bg-white/20 hover:text-krishna-gold"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
