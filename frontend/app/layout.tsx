import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cache } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchGlobalSettings, fetchNavigation } from "@/lib/api";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cache global settings fetch to deduplicate between metadata generation and layout rendering
const getCachedGlobalSettings = cache(async () => {
  return await fetchGlobalSettings();
});

export async function generateMetadata(): Promise<Metadata> {
  const globalData = await getCachedGlobalSettings();
  return {
    title: {
      default: globalData?.siteName || "AI GreenTick",
      template: `%s | ${globalData?.siteName || "AI GreenTick"}`,
    },
    description: globalData?.siteDescription || "Empowering users with clean, efficient AI tools and services.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [globalData, headerNavItems, footerNavItems] = await Promise.all([
    getCachedGlobalSettings(),
    fetchNavigation("header"),
    fetchNavigation("footer"),
  ]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Navbar component */}
        <Navbar 
          headerData={globalData?.header || null} 
          siteName={globalData?.siteName || "AI GreenTick"} 
          navItems={headerNavItems}
        />
        
        {/* Main layout contents */}
        <main className="flex-1 flex flex-col pt-16">
          {children}
        </main>

        {/* Footer component */}
        <Footer 
          footerData={globalData?.footer || null} 
          siteName={globalData?.siteName || "AI GreenTick"} 
          siteDescription={globalData?.siteDescription} 
          navItems={footerNavItems}
        />
      </body>
    </html>
  );
}
