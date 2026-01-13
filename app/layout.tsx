import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: {
    default: "Ali Akbar | Creative Developer",
    template: "%s | Ali Akbar",
  },
  description: "Portfolio of Ali Akbar, a creative developer specializing in motion, interactive experiences, and premium web design.",
  keywords: ["Creative Developer", "Web Design", "Next.js", "Framer Motion", "Portfolio", "Ali Akbar"],
  authors: [{ name: "Ali Akbar" }],
  creator: "Ali Akbar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aliakbar.dev",
    title: "Ali Akbar | Creative Developer",
    description: "Building immersive digital experiences.",
    siteName: "Ali Akbar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Akbar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Akbar | Creative Developer",
    description: "Building immersive digital experiences.",
    images: ["/og-image.jpg"],
    creator: "@aliakbar",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { MotionProvider } from "@/components/providers/motion-provider";
import { PageTransition } from "@/components/layout/page-transition";
import { BackgroundEngine } from "@/components/background/background-engine";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, outfit.variable, "font-sans bg-background text-foreground antialiased")}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "neon", "aurora"]}
        >
          <MotionProvider>
            <SmoothScroll>
              <BackgroundEngine />
              <Navbar />
              <main className="relative z-10 min-h-screen flex flex-col pt-20">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
            </SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
