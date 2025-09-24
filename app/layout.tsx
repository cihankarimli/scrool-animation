export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className="antialiased"
        style={{ margin: 0, padding: 0, overflowX: "hidden" }}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
