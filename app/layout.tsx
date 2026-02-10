import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "NDDC Connect Hub - Official Digital Gateway",
  description:
    "The official portal for all proposals, reports, requests and feedback to the Niger Delta Development Commission.",
  keywords: [
    "NDDC",
    "Niger Delta",
    "Development Commission",
    "Government Portal",
    "Submissions",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 font-sans antialiased">
        <Providers>
          <ToastContainer />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
