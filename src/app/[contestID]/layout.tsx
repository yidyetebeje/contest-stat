export const metadata = {
  title: "Contest Stat",
  description: "Contest Stat by a2sv contest squad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
