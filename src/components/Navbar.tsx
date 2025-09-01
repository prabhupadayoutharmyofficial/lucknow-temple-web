import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle, 
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from './navbar/Logo';
import NavLink from './navbar/NavLink';
import MobileNavContent from './navbar/MobileNavContent';
import { getLeftNavItems, getRightNavItems } from './navbar/NavigationItems';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, hasAdminAccess, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-orange-50/50 to-amber-50/30 backdrop-blur-sm border-b border-krishna-gold/20 shadow-lg">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-krishna-blue via-krishna-gold to-krishna-saffron"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          {/* Left Section: Logo, Title, and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <Logo />
                <div className="absolute -inset-1 bg-gradient-to-r from-krishna-gold/30 to-krishna-saffron/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-devotional font-bold bg-gradient-to-r from-krishna-blue to-krishna-maroon bg-clip-text text-transparent">
                  ISKCON Lucknow
                </h1>
                <p className="text-xs text-krishna-gold font-medium -mt-1">
                  International Society for Krishna Consciousness
                </p>
              </div>
            </div>

            {/* Navigation Items - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2 ml-8">
              {[...getLeftNavItems(), ...getRightNavItems(user)].map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* Right Section: User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {user && (
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-krishna-gold/10 to-krishna-saffron/10 border border-krishna-gold/30">
                {hasAdminAccess && (
                  <Link to="/admin">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-krishna-blue hover:text-white hover:bg-krishna-blue/90 transition-all duration-300 rounded-full px-4"
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
                  className="text-krishna-maroon hover:text-white hover:bg-krishna-maroon/90 transition-all duration-300 rounded-full px-4"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu - Visible only on mobile */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-krishna-blue hover:text-white hover:bg-krishna-blue/90 transition-all duration-300 rounded-full p-3"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50">
                <SheetHeader className="text-left border-b border-krishna-gold/30 pb-4">
                  <SheetTitle className="font-devotional text-2xl bg-gradient-to-r from-krishna-blue to-krishna-maroon bg-clip-text text-transparent">
                    ISKCON Lucknow
                  </SheetTitle>
                  <p className="text-sm text-krishna-gold font-medium">
                    International Society for Krishna Consciousness
                  </p>
                </SheetHeader>
                <MobileNavContent 
                  user={user}
                  isAdmin={hasAdminAccess}
                  onSignOut={signOut}
                  onClose={() => setIsOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
