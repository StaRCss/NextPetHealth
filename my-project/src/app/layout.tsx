import "../styles/global.css";
import ClientLayout from "../components/layout/ClientLayout";
import { Chewy } from "next/font/google";

// Load the Chewy font
const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chewy", // To use as a Tailwind variable
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
