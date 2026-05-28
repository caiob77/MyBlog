import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlowBackdrop } from "@/components/GlowBackdrop";
import "./globals.css";

const inter = localFont({
  src: "../fontes/Inter/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const fragmentMono = localFont({
  src: "../fontes/Fragment_Mono/Fragment_Mono/FragmentMono-Regular.ttf",
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beniel.dev"),
  title: {
    default: "BENIEL — Desenvolvedor de Software",
    template: "%s · BENIEL",
  },
  description:
    "Blog pessoal de Caio Beniel sobre desenvolvimento de software, arquitetura e tecnologia.",
  icons: {
    icon: [
      { url: "/favicon/favicon-dark-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-dark-128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon/favicon-dark-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/favicon/favicon-dark-180.png", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "BENIEL",
    title: "BENIEL — Desenvolvedor de Software",
    description:
      "Blog pessoal de Caio Beniel sobre desenvolvimento de software, arquitetura e tecnologia.",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${fragmentMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-bg text-text font-body">
        <GlowBackdrop className="-z-10" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
