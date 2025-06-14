
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
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

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Centered Logo - Positioned absolutely to overlap navbar */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
        <Link to="/" className="block">
          <img 
            src="/public/iskconlucknowlogo.png" 
            alt="ISKCON Lucknow Crest" 
            className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-lg"
          />
        </Link>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-40 border-b border-krishna-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4 pt-16 md:pt-16">
            {/* Left Side - Temple Name */}
            <div className="flex items-center space-x-3">
              <div className="text-krishna-blue ml-12 md:ml-16">
                <div className="font-devotional text-lg md:text-xl font-semibold">ISKCON Lucknow</div>
                <div className="text-xs md:text-sm text-muted-foreground">Vrindavan Dham</div>
              </div>
            </div>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden lg:flex items-center space-x-6 mr-12 md:mr-16">
              {navItems.map((item) => (
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
              
              {/* Auth Section */}
              <div className="flex items-center space-x-2 ml-4 border-l border-krishna-gold/20 pl-4">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin">
                        <Button variant="outline" size="sm" className="flex items-center gap-2 border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white">
                          <Shield className="h-4 w-4" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm" onClick={handleSignOut} className="flex items-center gap-2 border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button variant="outline" size="sm" className="border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden mr-12 md:mr-16">
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
                {navItems.map((item) => (
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
                
                {/* Mobile Auth Section */}
                <div className="border-t border-krishna-gold/20 pt-4 mt-4">
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full mb-2 flex items-center gap-2 border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white">
                            <Shield className="h-4 w-4" />
                            Admin Dashboard
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full flex items-center gap-2 border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full border-krishna-blue text-krishna-blue hover:bg-krishna-blue hover:text-white">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
