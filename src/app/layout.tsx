import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Delight Desk: Resolve 80% Of Customer Service Email Tickets Instantly",
  description:
    "AI-powered customer service automation for e-commerce. Resolve 80% of email tickets instantly while keeping humans in control. 5-minute setup, 14-day free trial.",
  keywords:
    "customer service automation, AI support, helpdesk software, customer support, email automation, WooCommerce support, Shopify support",
  authors: [
    {
      name: "Delight Desk",
      url: "https://delightdesk.io",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <MantineProvider>{children}</MantineProvider>
        </QueryProvider>
        <Toaster richColors theme="light" duration={3000} />
      </body>
    </html>
  );
}
