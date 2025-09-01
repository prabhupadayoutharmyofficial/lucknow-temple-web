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
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo, Title, and Navigation */}
          <div className="flex items-center space-x-6">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <Logo />
              <div className="hidden sm:block">
                <h1 className="text-xl font-devotional font-bold text-krishna-blue">
                  ISKCON Lucknow
                </h1>
              </div>
            </div>

            {/* Navigation Items - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-1">
              {[...getLeftNavItems(), ...getRightNavItems(user)].map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* Right Section: User Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {user && (
              <>
                {hasAdminAccess && (
                  <Link to="/admin">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-700 hover:text-krishna-gold transition-colors"
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
                  className="text-gray-700 hover:text-krishna-gold transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu - Visible only on mobile */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-krishna-gold transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader className="text-left border-b border-gray-200 pb-4">
                  <SheetTitle className="font-devotional text-xl text-krishna-blue">
                    ISKCON Lucknow
                  </SheetTitle>
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
