'use client';

import "../styles/global.css";
import ClientLayout from "../components/layout/ClientLayout";
import { Chewy } from "next/font/google";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

// Load the Chewy font
const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chewy",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={chewy.variable}>
      <head>
        <title>My Pet Health App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gray-100 text-gray-800 font-sans">
        <MantineProvider >
          <ClientLayout>{children}</ClientLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
