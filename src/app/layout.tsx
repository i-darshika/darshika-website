import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import { site } from "@/data/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

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
      <body
        className={`${outfit.variable} ${inter.variable} ${editorial.variable} antialiased`}
      >
        <Header />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </div>

        <Motion />
      </body>
    </html>
  );
}
