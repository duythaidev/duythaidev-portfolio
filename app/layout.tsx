import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import meta from "@/lib/meta";
import { jsonLd } from "@/lib/json-ld";

export const metadata: Metadata = meta({
  title: "duythaidev - Portfolio",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="neon"
          themes={["neon", "amber"]}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
