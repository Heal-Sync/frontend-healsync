import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/Store/Providers";
import dynamic from "next/dynamic";
const inter = Inter({ subsets: ["latin"] });

const ClientOnly = dynamic(() => import('@/components/Wrappers/ClientSideOnly'), { ssr: false });


export const metadata: Metadata = {
  title: "HealSync",
  description: "A Doctor Consultancy Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <ClientOnly>
            {children}
          </ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
