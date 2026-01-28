"use client";

import Image from "next/image";

const footerLinks = {
  resources: [
    "Submission Guidelines",
    "Download Templates",
    "Privacy Policy",
    "Terms of Service",
  ],
  support: [
    "Help Center",
    "Contact Us",
    "System Status",
    "Feedback",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0b1c17] text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-white">
              <Image
                src="/FooterLogo.svg"
                alt="NDDC Portal Logo"
                width={24}
                height={24}
              />
              <span className="text-lg font-semibold">NDDC Portal</span>
            </div>
            <p className="text-sm leading-relaxed">
              Official digital gateway for the Niger Delta Development
              Commission. Committed to transparency and regional growth.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold text-green-500">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.resources.map((item) => (
                <li key={item} className="hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold text-green-500">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((item) => (
                <li key={item} className="hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 font-semibold text-green-500">
              Connect
            </h4>
            <p className="text-sm">
              Plot 167, Aba Road, Port Harcourt,
              <br />
              Rivers State, Nigeria.
            </p>

            <div className="mt-4 flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10" />
              <div className="h-10 w-10 rounded-lg bg-white/10" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Copyright */}
        <p className="text-center text-xs text-gray-500">
          © 2024 Niger Delta Development Commission. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
