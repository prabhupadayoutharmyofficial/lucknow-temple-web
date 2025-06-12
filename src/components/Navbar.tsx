
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Visit', href: '/visit' },
  { title: 'Darshan', href: '/darshan' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Split nav items for desktop view.
  const leftNavItems = navItems.filter(item =>
    ['Home', 'About', 'Visit', 'Darshan'].includes(item.title)
  );
  const rightNavItems = navItems.filter(item =>
    ['Gallery', 'FAQ', 'Contact'].includes(item.title)
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-16">
          <nav className="flex items-center space-x-6">
            {leftNavItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-krishna-gold px-2 py-1"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/73c39504-0d98-4163-80cc-f0c8e0da3d20.png" 
              alt="ISKCON Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>
          <nav className="flex items-center space-x-6">
            {rightNavItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-krishna-gold px-2 py-1"
              >
                {item.title}
              </Link>
            ))}
            <Button className="ml-2 bg-krishna-gold hover:bg-krishna-saffron text-white px-4 py-2" asChild>
              <Link to="/donate">Donate</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 py-2">
            <img 
              src="/lovable-uploads/73c39504-0d98-4163-80cc-f0c8e0da3d20.png" 
              alt="ISKCON Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-devotional text-xl font-semibold leading-tight">
              ISKCON LUCKNOW
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
            className="p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed top-0 left-0 right-0 bg-white border-b shadow-lg transition-transform duration-200 ease-in-out transform z-40",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex justify-between items-center h-16 px-4 border-b">
          <Link to="/" className="flex items-center gap-2" onClick={toggleMenu}>
            <img 
              src="/lovable-uploads/73c39504-0d98-4163-80cc-f0c8e0da3d20.png" 
              alt="ISKCON Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-devotional text-lg font-semibold">
              ISKCON LUCKNOW
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Close Menu"
            className="p-2"
          >
            <X size={24} />
          </Button>
        </div>
        <div className="px-4 py-4 flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="text-base font-medium py-2 transition-colors hover:text-krishna-gold"
              onClick={toggleMenu}
            >
              {item.title}
            </Link>
          ))}
          <Button className="bg-krishna-gold hover:bg-krishna-saffron text-white w-full mt-2" asChild>
            <Link to="/donate" onClick={toggleMenu}>Donate</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
