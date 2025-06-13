
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
    <header className="relative">
      {/* Centered Crest Logo - positioned to overlap the nav bar */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full p-2 shadow-lg border-2 border-krishna-gold">
          <Link to="/" className="block">
            <img 
              src="/lovable-uploads/e85e127b-7c38-411b-b7dc-e88719ef5cb6.png" 
              alt="ISKCON Lucknow Crest" 
              className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-gradient-to-r from-krishna-blue/95 to-krishna-blue shadow-lg sticky top-0 z-40 pt-12 md:pt-14 lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Left side - Temple Name */}
            <div className="hidden lg:flex items-center">
              <div className="text-white">
                <div className="font-devotional text-lg font-semibold">ISKCON Lucknow</div>
                <div className="text-xs text-krishna-gold">Vrindavan Dham</div>
              </div>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-auto">
              <div className="flex items-center space-x-8">
                {navItems.slice(0, 4).map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium transition-all duration-300 hover:text-krishna-gold relative group ${
                      isActivePath(item.path)
                        ? 'text-krishna-gold'
                        : 'text-white'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-krishna-gold transition-all duration-300 group-hover:w-full ${
                      isActivePath(item.path) ? 'w-full' : ''
                    }`}></span>
                  </Link>
                ))}
                
                {/* Spacer for logo */}
                <div className="w-32"></div>
                
                {navItems.slice(4).map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium transition-all duration-300 hover:text-krishna-gold relative group ${
                      isActivePath(item.path)
                        ? 'text-krishna-gold'
                        : 'text-white'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-krishna-gold transition-all duration-300 group-hover:w-full ${
                      isActivePath(item.path) ? 'w-full' : ''
                    }`}></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side - Auth Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white/10 border-krishna-gold text-white hover:bg-krishna-gold hover:text-krishna-blue transition-all duration-300">
                        <Shield className="h-4 w-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut} 
                    className="flex items-center gap-2 bg-white/10 border-white text-white hover:bg-white hover:text-krishna-blue transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/10 border-krishna-gold text-white hover:bg-krishna-gold hover:text-krishna-blue transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:bg-white/10"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden pb-4">
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                {/* Mobile Temple Name */}
                <div className="text-center text-white pb-2">
                  <div className="font-devotional text-lg font-semibold">ISKCON Lucknow</div>
                  <div className="text-xs text-krishna-gold">Vrindavan Dham</div>
                </div>
                
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg mx-2 ${
                      isActivePath(item.path)
                        ? 'text-krishna-gold bg-white/10'
                        : 'text-white hover:text-krishna-gold hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="border-t border-white/20 pt-4 mt-4 px-2 space-y-2">
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full mb-2 flex items-center gap-2 bg-white/10 border-krishna-gold text-white hover:bg-krishna-gold hover:text-krishna-blue">
                            <Shield className="h-4 w-4" />
                            Admin Dashboard
                          </Button>
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleSignOut} 
                        className="w-full flex items-center gap-2 bg-white/10 border-white text-white hover:bg-white hover:text-krishna-blue"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full bg-white/10 border-krishna-gold text-white hover:bg-krishna-gold hover:text-krishna-blue"
                      >
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
    </header>
  );
};

export default Navbar;
