
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const isMobile = useIsMobile();

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

  const getAllNavItems = () => [...getLeftNavItems(), ...getRightNavItems()];

  const NavLink = ({ item, onClick }: { item: { name: string; path: string }, onClick?: () => void }) => (
    <Link
      to={item.path}
      onClick={onClick}
      className={`relative py-2 px-1 text-sm font-medium transition-all duration-300 group ${
        isActivePath(item.path)
          ? 'text-krishna-gold'
          : 'text-white hover:text-krishna-gold'
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

  const MobileNavContent = () => (
    <div className="px-6 py-8">
      <div className="flex flex-col space-y-6">
        {getAllNavItems().map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-lg font-medium transition-colors ${
              isActivePath(item.path)
                ? 'text-krishna-gold'
                : 'text-gray-900 hover:text-krishna-gold'
            }`}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        
        {user && (
          <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
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

  return (
    <nav className="relative z-50">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm" />
      
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {getLeftNavItems().map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          {/* Logo - Smaller and more integrated */}
          <Link to="/" className="flex-shrink-0 group">
            <img 
              src="/lovable-uploads/f1e30908-8120-41f1-bdef-06d8962203e4.png"
              alt="ISKCON Lucknow"
              className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
              draggable={false}
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
              }}
            />
          </Link>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {getRightNavItems().map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
            
            {user && (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-white/20">
                {isAdmin && (
                  <Link to="/admin">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:text-krishna-gold hover:bg-white/10 transition-colors"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-white hover:text-krishna-gold hover:bg-white/10 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-krishna-gold hover:bg-white/10 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <DrawerHeader className="text-left border-b border-gray-200">
                  <DrawerTitle className="font-devotional text-xl text-krishna-blue">
                    ISKCON Lucknow
                  </DrawerTitle>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="sm" className="absolute right-4 top-4">
                      <X className="h-5 w-5" />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>
                <MobileNavContent />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
