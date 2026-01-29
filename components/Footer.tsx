'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import NDDCLogo from './NDDCLogo';

const Footer: React.FC = () => (
  <footer className="bg-emerald-950 text-white py-12">
    <div className="max-w-7xl mx-auto px-6">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 pb-8 border-b border-white/10">
        
        {/* Logo and Description */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <NDDCLogo size="lg" />
          <div className="mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-xl">NDDC</span>
              <span className="text-emerald-400 text-sm">Connect Hub</span>
            </div>
            <p className="text-emerald-300 text-sm mt-1">
              Official digital gateway for submissions
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 text-sm text-emerald-200">
          <Link href="#" className="hover:text-white transition-colors">Submission Guidelines</Link>
          <Link href="#" className="hover:text-white transition-colors">Download Templates</Link>
          <Link href="#" className="hover:text-white transition-colors">FAQs</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact Support</Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 text-sm text-emerald-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Port Harcourt, Rivers State</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+234 (0) 84 230 777</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>connect@nddc.gov.ng</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 text-sm text-emerald-400">
        <p>© {new Date().getFullYear()} Niger Delta Development Commission. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
