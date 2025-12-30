"use client"

import { Instagram, Facebook, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n/context"
import { getFooterDictionary } from "@/lib/i18n/dictionaries/footer"
import type { Locale } from "@/lib/i18n/config"

export function Footer() {
  const { locale: currentLocale } = useTranslation()
  const dict = getFooterDictionary(currentLocale as Locale)

  const navItems = [
    { name: dict.tours, href: `/${currentLocale}/tours` },
    { name: dict.transports, href: `/${currentLocale}/transports` },
    { name: dict.visit, href: `/${currentLocale}/visit` },
    { name: dict.club, href: `/${currentLocale}/club` },
    { name: dict.events, href: `/${currentLocale}/events` },
    { name: dict.about, href: `/${currentLocale}/about` },
  ]

  return (
    <footer className="bg-white text-black border-white">
      <div className="w-full h-px bg-black/25" />

      <div className="px-6 md:px-12 pt-12 pb-6">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          <div className="shrink-0">
            <h3 className="font-black text-2xl sm:text-3xl tracking-tighter text-black uppercase">{dict.brand}</h3>
          </div>

          {/* Subscribe + Navigation */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            {/* Subscribe */}
            <div className="flex flex-col gap-4">
              <span className="text-sm tracking-wide font-black uppercase">{dict.subscribe}</span>
              <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                <input
                  type="email"
                  placeholder={dict.email}
                  className="bg-transparent text-sm placeholder:text-black/50 focus:outline-none w-48 font-black uppercase"
                />
                <button className="p-1 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-16 md:gap-24">
              <nav className="flex flex-col gap-3">
                {navItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-black uppercase hover:text-neon-orange transition-colors tracking-widest"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <nav className="flex flex-col gap-3">
                {navItems.slice(3).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-black uppercase hover:text-neon-orange transition-colors tracking-widest"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Middle section - Address, Brand, Socials */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12">
          {/* Address */}
          <div className="text-xs leading-relaxed italic text-black/80 font-black">
            <p>{dict.address}</p>
            <p>{dict.country}</p>
            <p>
              {dict.phone} <span className="not-italic">+51 84 123 4567</span>
            </p>
          </div>

          {/* Brand */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black uppercase">
            {dict.brand}
          </h2>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:text-neon-orange transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-neon-orange transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-black/25">
          <p className="text-[10px] leading-relaxed text-black/70 max-w-3xl font-black uppercase">
            {dict.copyright} &nbsp;&nbsp; {dict.license}
          </p>
          <div className="flex items-center gap-6 text-[10px] text-black/70 font-black uppercase">
            <Link href="#" className="hover:text-black transition-colors">
              {dict.privacy}
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              {dict.terms}
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              {dict.shipping}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
