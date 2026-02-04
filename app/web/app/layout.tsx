import type { Metadata } from "next";
import { listPeptides, listBlends, listTopics } from "@/lib/content";
import NavBar from "@/components/NavBar";
import AppOverlays from "@/components/AppOverlays";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Pep-Talk",
  description: "Educational peptide reference. No protocols, dosing, or instructions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const peptides = listPeptides();
  const blends = listBlends();
  const topics = listTopics();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavBar peptides={peptides} blends={blends} topics={topics} />
        <AppOverlays />
        {children}
      </body>
    </html>
  );
}
