import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const aileron = localFont({
  src: [
    { path: "./fonts/aileron-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/aileron-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/aileron-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/aileron-700.woff2", weight: "700", style: "normal" },
    // Aileron's heaviest cut; also serves the site's 900-weight usages.
    { path: "./fonts/aileron-800.woff2", weight: "800 900", style: "normal" },
  ],
  display: "swap",
});

const SITE_TITLE =
  "Udaya Kumar Sivagurunathan | Lead UX Designer | Author | Gen AI Architect";
const SITE_DESCRIPTION =
  "Website of Udaya Kumar Sivagurunathan | Lead UX Designer | Author | Gen AI Architect.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.udayakumar.in"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.udayakumar.in",
    siteName: "Udaya Kumar Sivagurunathan",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#0d0d0d" }}>
      <body className={aileron.className}>{children}</body>
    </html>
  );
}
