
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">Adept AI</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <a href="#solutions" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="#features" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#about" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <Button variant="default">
              Contact Us
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-background border-b animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#solutions"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary"
              onClick={toggleMenu}
            >
              Solutions
            </a>
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary"
              onClick={toggleMenu}
            >
              About
            </a>
            <div className="px-3 py-2">
              <Button variant="default" className="w-full">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
