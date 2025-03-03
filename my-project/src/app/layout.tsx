import React from 'react';
import dynamic from 'next/dynamic'; // For lazy-loading components
import "./styles/global.css"; // Ensure unused styles are purged

// Dynamically import the Navbar to reduce initial load
const Navbar = dynamic(() => import('./components/Navbar'), {
  ssr: true, // Enable server-side rendering for Navbar if necessary
  loading: () => <div>Loading...</div>, // Optional: Display a loading state
});

// Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Pet Health App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        {/* Avoid adding unnecessary <head> elements */}
      </head>
      <body className="min-h-screen bg-gray-100 text-gray-800">
        {/* Navbar outside the main container to make it full width */}
        <Navbar />
        
        {/* Main content with padding, but Navbar is independent of container class */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
