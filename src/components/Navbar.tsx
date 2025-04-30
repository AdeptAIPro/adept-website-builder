
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-2xl">
          Adept<span className="text-primary">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-foreground/70 transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="#solutions" className="text-foreground/70 transition-colors hover:text-foreground">
            Solutions
          </Link>
          <Link to="#features" className="text-foreground/70 transition-colors hover:text-foreground">
            Features
          </Link>
          <Link to="/pricing" className="text-foreground/70 transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link to="#about" className="text-foreground/70 transition-colors hover:text-foreground">
            About
          </Link>
          <Link to="#contact" className="text-foreground/70 transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button
              className="hidden md:flex"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="hidden md:inline-flex"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button
                className="hidden md:flex"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </>
          )}
          <button
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden p-4 border-t text-sm">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#solutions"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              to="#features"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="#about"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="#contact"
              className="text-foreground/70 transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  navigate('/dashboard');
                  setIsMenuOpen(false);
                }}
                className="w-full"
              >
                Dashboard
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
