import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/app/providers/ReduxProviders";
import Providers from "./providers";
import { ToastContainer, toast } from "react-toastify";

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
          <ReduxProvider>
            <ToastContainer />
            <main>{children}</main>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
