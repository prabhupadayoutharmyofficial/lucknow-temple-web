
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

  return (
    <header className="sticky top-0 z-50 w-full bg-krishna-blue/95 backdrop-blur-sm border-b shadow-lg">
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden md:block">
          {/* Top Row */}
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-6 text-white/90">
              <Link to="/darshan" className="hover:text-krishna-gold transition-colors uppercase tracking-wide">
                DHAM DARSHAN
              </Link>
              <Link to="/gallery" className="hover:text-krishna-gold transition-colors uppercase tracking-wide">
                GALLERY
              </Link>
              <Button className="bg-krishna-saffron hover:bg-krishna-gold text-white px-4 py-1 text-xs uppercase tracking-wide" asChild>
                <Link to="/donate">QUICK DONATE</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-6 text-white/90">
              <span className="hover:text-krishna-gold transition-colors uppercase tracking-wide cursor-pointer">
                LIFETIME MEMBERSHIP
              </span>
              <span className="hover:text-krishna-gold transition-colors uppercase tracking-wide cursor-pointer">
                SITA RASOI
              </span>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">f</span>
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">ig</span>
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">yt</span>
              </div>
            </div>
          </div>

          {/* Main Navigation Row */}
          <div className="flex items-center justify-between py-4">
            <nav className="flex items-center space-x-8 text-white">
              <Link to="/" className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium">
                HOME
              </Link>
              <Link to="/about" className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium">
                ABOUT US
              </Link>
              <span className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium cursor-pointer">
                OUR PROGRAMS
              </span>
              <span className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium cursor-pointer">
                EVENTS
              </span>
              <Link to="/donate" className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium">
                DONATE
              </Link>
            </nav>

            {/* Center Logo */}
            <Link to="/" className="mx-8">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <img 
                  src="/lovable-uploads/73c39504-0d98-4163-80cc-f0c8e0da3d20.png" 
                  alt="ISKCON Logo" 
                  className="h-16 w-16 object-contain"
                />
              </div>
            </Link>

            <nav className="flex items-center space-x-8 text-white">
              <span className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium cursor-pointer">
                OFFER PUJA
              </span>
              <span className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium cursor-pointer">
                TEMPLE ACTIVITIES
              </span>
              <span className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium cursor-pointer">
                ARCHANA
              </span>
              <Link to="/contact" className="hover:text-krishna-gold transition-colors uppercase tracking-wide font-medium">
                LOGIN OR REGISTER
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 py-2">
            <img 
              src="/lovable-uploads/73c39504-0d98-4163-80cc-f0c8e0da3d20.png" 
              alt="ISKCON Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-devotional text-xl font-semibold leading-tight text-white">
              ISKCON LUCKNOW
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
            className="p-2 text-white hover:text-krishna-gold"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed top-0 left-0 right-0 bg-krishna-blue border-b shadow-lg transition-transform duration-200 ease-in-out transform z-40",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex justify-between items-center h-16 px-4 border-b border-white/20">
          <Link to="/" className="flex items-center gap-2" onClick={toggleMenu}>
            <img 
              src="/lovable-uploads/73c39504-0d98-4163-80cc-f0c8e0da3d20.png" 
              alt="ISKCON Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-devotional text-lg font-semibold text-white">
              ISKCON LUCKNOW
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Close Menu"
            className="p-2 text-white hover:text-krishna-gold"
          >
            <X size={24} />
          </Button>
        </div>
        <div className="px-4 py-4 flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="text-base font-medium py-2 transition-colors hover:text-krishna-gold text-white uppercase tracking-wide"
              onClick={toggleMenu}
            >
              {item.title}
            </Link>
          ))}
          <Button className="bg-krishna-saffron hover:bg-krishna-gold text-white w-full mt-2" asChild>
            <Link to="/donate" onClick={toggleMenu}>DONATE</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
