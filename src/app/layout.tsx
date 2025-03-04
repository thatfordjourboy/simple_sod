import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steam-Off Daycation 2025 | University of Ghana Business School",
  description: "Join the Steam-Off Daycation 2025 event for MSc Business Analytics students at the University of Ghana Business School. Register now!",
  keywords: ["Steam-Off Daycation", "SOD 2025", "Ghana", "House Party", "MSc Business Analytics", "University of Ghana Business School"],
  
  // Open Graph metadata for better social sharing
  openGraph: {
    title: "Steam-Off Daycation 2025 | UGBS",
    description: "Ghana's most exclusive house party for MSc Business Analytics students. Register now!",
    url: "https://steamoff.vercel.app",
    siteName: "Steam-Off Daycation 2025",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Steam-Off Daycation 2025 - Ghana's Premier House Party",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: "Steam-Off Daycation 2025 | UGBS",
    description: "Ghana's most exclusive house party for MSc Business Analytics students. Register now!",
    images: ["/images/og-image.jpg"],
  },
  
  // Viewport metadata
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  
  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
