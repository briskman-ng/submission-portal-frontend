"use client";

import Image from "next/image";

interface NDDCLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
}

const NDDCLogo: React.FC<NDDCLogoProps> = ({ size = "md" }) => {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 64, height: 64 },
    xl: { width: 128, height: 128 },
  };

  const { width, height } = sizes[size];

  return (
    //  <div className="h-16 flex items-center justify-center border-b border-green-800">
    <Image src="/Logo.svg" alt="Logo" width={width} height={height} priority />
    // </div>
  );
};

export default NDDCLogo;
