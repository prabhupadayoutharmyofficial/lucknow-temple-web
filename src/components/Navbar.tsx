
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  // Main nav links including sign in as a regular link
  const getNavItems = () => {
    const baseItems = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Darshan', path: '/darshan' },
      { name: 'Events', path: '/events' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Visit', path: '/visit' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Donate', path: '/donate' },
      { name: 'Contact', path: '/contact' },
    ];

    if (!user) {
      baseItems.push({ name: 'Sign In', path: '/auth' });
    }

    return baseItems;
  };

  const isActivePath = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Centered Crest Logo - Overlaps navbar */}
      <div className="absolute left-1/2 -top-10 transform -translate-x-1/2 z-50 pointer-events-auto">
        <Link to="/" className="block">
          <img 
            src="/public/iskconlucknowlogo.png"
            alt="ISKCON Lucknow Crest"
            className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-xl select-none"
            draggable={false}
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.10))',
            }}
          />
        </Link>
      </div>
      
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-40 border-b border-krishna-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-4 pt-10 md:pt-12 relative">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-3">
              {getNavItems().map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-krishna-gold px-2 py-1 rounded ${
                    isActivePath(item.path)
                      ? 'text-krishna-gold bg-krishna-gold/10 border-b-2 border-krishna-gold'
                      : 'text-gray-700 hover:bg-krishna-gold/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Admin and Sign Out buttons for authenticated users */}
              {user && (
                <>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white ml-3">
                        <Shield className="h-4 w-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white ml-2"
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
                className="text-krishna-blue hover:bg-krishna-blue/10"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden pb-4 border-t border-krishna-gold/20 bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col space-y-2 pt-4">
                {getNavItems().map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-krishna-gold rounded ${
                      isActivePath(item.path)
                        ? 'text-krishna-gold bg-krishna-gold/10'
                        : 'text-gray-700 hover:bg-krishna-gold/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Admin and Sign Out for mobile authenticated users */}
                {user && (
                  <div className="border-t border-krishna-gold/20 pt-4 mt-4">
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mb-2 flex items-center gap-2 border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white"
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
                      className="w-full flex items-center gap-2 border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white"
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
