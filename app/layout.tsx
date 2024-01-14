"use client";
import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { PuzzleWalletProvider } from "@puzzlehq/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import GamePlayProvider from "@/context/gamePlayContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" suppressHydrationWarning>
      <PuzzleWalletProvider
        dAppName="Aleo Fortune"
        dAppDescription="A Roulette Game"
        dAppUrl=""
        dAppIconURL=""
      >
        <QueryClientProvider client={queryClient}>
          <body suppressHydrationWarning>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <GamePlayProvider>
                <Header />
                {children}
                {/* <Footer /> */}
                <Toaster />
              </GamePlayProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </QueryClientProvider>
      </PuzzleWalletProvider>
    </html>
  );
}
