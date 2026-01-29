'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu } from 'lucide-react';
import NDDCLogo from './NDDCLogo';

interface NavigationProps {
  isLoggedIn?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isLoggedIn = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <NDDCLogo />
          <div>
            <span className="font-display font-semibold text-emerald-900 text-lg">NDDC</span>
            <span className="text-stone-400 text-sm ml-2">Connect Hub</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link 
            href="/" 
            className={`hover:text-emerald-700 transition-colors ${pathname === '/' ? 'text-emerald-700' : ''}`}
          >
            Home
          </Link>
          <Link href="/#process" className="hover:text-emerald-700 transition-colors">
            Process
          </Link>
          <Link href="/#support" className="hover:text-emerald-700 transition-colors">
            Support
          </Link>
          {isLoggedIn ? (
            <Link 
              href="/dashboard"
              className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              My Dashboard
            </Link>
          ) : (
            <Link 
              href="/track"
              className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Track Submission
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-6 py-4 space-y-4">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block w-full text-left py-2 text-stone-700 hover:text-emerald-700"
          >
            Home
          </Link>
          <Link 
            href="/track" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block w-full text-left py-2 text-stone-700 hover:text-emerald-700"
          >
            Track Submission
          </Link>
          {isLoggedIn && (
            <Link 
              href="/dashboard" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block w-full text-left py-2 text-stone-700 hover:text-emerald-700"
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
