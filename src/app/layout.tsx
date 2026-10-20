import type { Metadata } from "next";
import { Inter, Outfit, Sacramento } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import { site } from "@/data/site";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sacramento = Sacramento({ variable: "--font-sacramento", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://darshikaraj.com"),
  title: { default: site.title, template: `%s - darshikaraj.com` },
  description: site.description,
  icons: { icon: site.favicon },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        {/* Marks JS as available so animated titles can stay hidden until GSAP reveals them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${outfit.variable} ${inter.variable} ${sacramento.variable} antialiased`}>
        <Header />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>{children}</main>
            <Footer />
          </div>
        </div>
        <Cursor />
        <Motion />
      </body>
    </html>
  );
}
