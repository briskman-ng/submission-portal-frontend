'use client';

import Image from 'next/image';

interface NDDCLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const NDDCLogo: React.FC<NDDCLogoProps> = ({ size = 'md' }) => {
  const sizes = { 
    sm: { width: 32, height: 32 }, 
    md: { width: 40, height: 40 }, 
    lg: { width: 48, height: 48 } 
  };
  
  const { width, height } = sizes[size];

  return (
      //  <div className="h-16 flex items-center justify-center border-b border-green-800">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={40}
          height={40}
          priority
        />
      // </div>
  );
};

export default NDDCLogo;
