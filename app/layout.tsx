import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-deepBlue-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}


