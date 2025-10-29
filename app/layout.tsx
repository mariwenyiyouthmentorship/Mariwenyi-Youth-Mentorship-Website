import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Mariwenyi Youth Mentorship",
    template: "%s | Mariwenyi Youth Mentorship",
  },
  description: "Christian and life mentorship for youth, offering scholarships to bright and needy students",
  keywords: ["youth mentorship", "scholarships", "education", "Christian mentorship", "Kenya", "Mariwenyi"],
  authors: [{ name: "Dr. Fredrick M. Mmwazighe" }],
  creator: "Mariwenyi Youth Mentorship",
  publisher: "Mariwenyi Youth Mentorship",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mariwenyi.youth.mentorship",
    title: "Mariwenyi Youth Mentorship",
    description: "Christian and life mentorship for youth, offering scholarships to bright and needy students",
    siteName: "Mariwenyi Youth Mentorship",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mariwenyi Youth Mentorship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariwenyi Youth Mentorship",
    description: "Christian and life mentorship for youth, offering scholarships to bright and needy students",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/public/favicon.ico" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",

  generator: "mym-project",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
