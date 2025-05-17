import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon"
        href="https://lh3.googleusercontent.com/a/ACg8ocKrIUGopTDJ7wJfCmyNSPAnXyQAqxDBrwVAJ4eGfEqo7BlMagY=s576-c-no"
        type="image/png"/>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Analytics/>
        </ThemeProvider>
      </body>
    </html>
  )
}
