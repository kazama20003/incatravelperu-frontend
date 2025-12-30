import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"

import { siteConfig } from "@/lib/seo/seo-config"

// ---------------------------------------------
//  FUENTES PARA EL ESTILO OSMO / BRUTALISTA
// ---------------------------------------------

// Fuente principal (texto)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Titulares XXL tipo “Dev Toolkit”
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})


// ---------------------------------------------
//  SEO + METADATA
// ---------------------------------------------

export const metadata: Metadata = {
  title: "Inca Travel Peru - Tourism & Transport Dashboard",
  description:
    "Book tours and transportation services worldwide. Authentic travel experiences at affordable prices.",
  keywords: ["tourism", "tours", "transportation", "travel booking", "vacation"],
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: "Inca Travel Peru" }],
  creator: "Inca Travel Peru",
  publisher: "Inca Travel Peru",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.url,
    title: "Inca Travel Peru - Tourism & Transport Dashboard",
    description: "Book tours and transportation services worldwide.",
    siteName: "Inca Travel Peru",
    images: [
      {
        url: "https://res.cloudinary.com/ddbzpbrje/image/upload/v1767086891/Captura_de_pantalla_2025-12-30_042713_cjvshs.png",
        width: 1200,
        height: 630,
        alt: "Inca Travel Peru - Tourism & Transport Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inca Travel Perus - Tourism & Transport Dashboard",
    description: "Book tours and transportation services worldwide.",
    images: [
      "https://res.cloudinary.com/ddbzpbrje/image/upload/v1767086891/Captura_de_pantalla_2025-12-30_042713_cjvshs.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION",
    yandex: "YOUR_YANDEX_VERIFICATION",
  },
}


// ---------------------------------------------
//  ROOT LAYOUT
// ---------------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>

        <meta name="theme-color" content="#1f2937" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Inca Travel Peru",
              description: "Global tourism and transportation booking platform",
              url: siteConfig.url,
              logo:
                "https://res.cloudinary.com/ddbzpbrje/image/upload/v1767086141/ChatGPT_Image_30_dic_2025_04_15_12_b1t3nf.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "support@incatravelperu.com",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "Global",
              },
              areaServed: ["ES", "EN", "FR", "IT", "DE", "PT", "ZH", "JA", "RU"],
            }),
          }}
        />
      </head>

      {/* Aplicamos Inter como base y dejamos Space Grotesk para los títulos */}
      <body className={`antialiased bg-[#F0F0F0] text-black ${inter.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
