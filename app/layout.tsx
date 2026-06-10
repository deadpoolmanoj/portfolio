import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SideBar from "./components/SideBar";
import TopNavBar from "./components/TopNavBar";
import { ConversationProvider } from "@/context/ConversationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "./components/ThemeToggole";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "AskManoj",
  description: "AI-powered portfolio assistant for Manoj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${instrumentSerif.variable}
        h-full antialiased
      `}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              }
            })();`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col md:flex-row"
        style={{ backgroundColor: "var(--color-bg-page)", color: "var(--color-text-primary)" }}
      >
        <ThemeProvider>
          <ThemeToggle />
          <ConversationProvider>
            <TopNavBar />
            <SideBar />
            <main className="flex-1 flex justify-center" style={{ backgroundColor: "var(--color-bg-page)" }}>
              {children}
            </main>
          </ConversationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}