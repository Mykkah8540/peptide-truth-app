import type { Metadata } from "next";
import { listPeptides, listBlends, listTopics } from "@/lib/content";
import NavBar from "@/components/NavBar";
import AppOverlays from "@/components/AppOverlays";
import BackToTop from "@/components/BackToTop";
import SiteFooter from "@/components/SiteFooter";
import { FavoritesProvider } from "@/lib/favoritesContext";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
 title: "Pep-Talk",

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 const peptides = listPeptides();
 const blends = listBlends();
 const topics = listTopics();

 return (
  <html lang="en">
   <body className={`${playfair.variable} antialiased`}>
    <FavoritesProvider>
     <NavBar peptides={peptides} blends={blends} topics={topics} />
     <AppOverlays />
     {children}
     <SiteFooter />
     <BackToTop />
    </FavoritesProvider>
   </body>
  </html>
 );
}
