
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-krishna-blue text-white">
      <div className="divider-pattern w-full"></div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-devotional text-xl mb-4">ISKCON Lucknow</h3>
            <p className="mb-4">
              International Society for Krishna Consciousness
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-krishna-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-krishna-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-krishna-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-devotional text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-krishna-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-krishna-gold transition-colors">About</Link>
              </li>
              <li>
                <Link to="/darshan" className="hover:text-krishna-gold transition-colors">Darshan Timings</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-krishna-gold transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-krishna-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-devotional text-xl mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>ISKCON Temple, Amar Shaheed Path, Golf City, Sector-F, Ansal, Lucknow, Uttar Pradesh 226030 India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={20} />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={20} />
                <span>info@iskconlucknow.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-krishna-blue text-white/80 py-4 text-center text-sm">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} ISKCON Lucknow. All rights reserved. 
          <p className="mt-1">Hare Krishna Hare Krishna, Krishna Krishna Hare Hare, Hare Rama Hare Rama, Rama Rama Hare Hare</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
