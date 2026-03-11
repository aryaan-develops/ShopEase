import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "ShopEase | Premium E-Commerce Platform",
  description: "Buy and sell products with ease on our premium, high-performance marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <footer className="glass" style={{ padding: '4rem 0', marginTop: '8rem', borderTop: '1px solid var(--border)' }}>
            <div className="container" style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
              © 2026 ShopEase. Built for performance and style.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
