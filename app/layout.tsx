import type { Metadata } from "next";
import { ThemeProvider } from "./_components/theme-provider";
import { Roboto } from "next/font/google";
import "./globals.css"

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "App Amigo Secreto",
    description: "Aplicativo de sorteio de amigo secreto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body
                className={`${roboto.variable} antialiased`} suppressHydrationWarning
            >
                 <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
