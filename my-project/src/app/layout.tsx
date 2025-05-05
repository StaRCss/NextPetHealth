
import "./styles/global.css";
import ClientLayout from "../components/layout/ClientLayout"; // Import the Client Component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Pet Health App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gray-100 text-gray-800">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
