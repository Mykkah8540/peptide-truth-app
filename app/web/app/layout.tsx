import type { Metadata } from "next";
import { listPeptides, listBlends, listTopics } from "@/lib/content";
import NavBar from "@/components/NavBar";
import AppOverlays from "@/components/AppOverlays";
import "./globals.css";

export const metadata: Metadata = {
 title: "Pep-Talk",

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 const peptides = listPeptides();
 const blends = listBlends();
 const topics = listTopics();

 return (
  <html lang="en">
   <body className="antialiased">
    <NavBar peptides={peptides} blends={blends} topics={topics} />
    <AppOverlays />
    {children}
   </body>
  </html>
 );
}
