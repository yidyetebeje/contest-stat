import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/ui-com/theme-provider";
import { ModeToggle } from "@/ui-com/theme-selector";
import { Separator } from "@/components/ui/separator";
import SvgComponent from "@/ui-com/a2sv-logo";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Contest Stat",
  description: "A website to show contest statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="flex justify-between py-5 border-b-teal-700 md:border-0 lg:w-5/6 w-11/12 mx-auto">
            <div>
              <Link href="/" className="text-2xl font-bold">
                A2SV Contest Stat
              </Link>
            </div>
            <div>
              <ModeToggle />
            </div>
          </nav>
          <Separator />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
