"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Check, ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useProfile } from "@/hooks/use-auth"
import { locales, localeNames, isValidLocale, type Locale } from "@/lib/i18n/config"
import { useTranslation } from "@/lib/i18n/context"

const Marquee = ({ items }: { items: string[] }) => {
  return (
    <div className="bg-neon-orange text-black font-black text-xs sm:text-sm py-2 overflow-hidden flex items-center">
      <div className="marquee-wrapper">
        {[0, 1, 2].map((iteration) => (
          <div key={iteration} className="marquee-content whitespace-nowrap flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={i} className="px-6 uppercase tracking-tighter flex items-center gap-4 shrink-0">
                {item} <span className="text-lg">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const lastScrollRef = useRef(0)

  const { data: user } = useProfile()
  const pathname = usePathname()
  const router = useRouter()

  const { locale: currentLocale, dictionary: dict } = useTranslation()

  const localeFlags: Record<Locale, { alt: string; src: string }> = {
    es: { alt: "Bandera de Espana", src: "https://flagcdn.com/w40/es.png" },
    en: { alt: "Flag of the United States", src: "https://flagcdn.com/w40/us.png" },
    fr: { alt: "Drapeau de la France", src: "https://flagcdn.com/w40/fr.png" },
    it: { alt: "Bandiera d'Italia", src: "https://flagcdn.com/w40/it.png" },
    de: { alt: "Flagge Deutschlands", src: "https://flagcdn.com/w40/de.png" },
    pt: { alt: "Bandeira de Portugal", src: "https://flagcdn.com/w40/pt.png" },
    zh: { alt: "Bandera de China", src: "https://flagcdn.com/w40/cn.png" },
    ja: { alt: "Bandera de Japon", src: "https://flagcdn.com/w40/jp.png" },
    ru: { alt: "Bandera de Rusia", src: "https://flagcdn.com/w40/ru.png" },
  }

  const experiencesLabelByLocale: Record<Locale, string> = {
    es: "EXPERIENCIAS",
    en: "EXPERIENCES",
    fr: "EXPERIENCES",
    it: "ESPERIENZE",
    de: "ERLEBNISSE",
    pt: "EXPERIENCIAS",
    zh: "体验",
    ja: "体験",
    ru: "ОПЫТ",
  }

  const navItems = [
    { name: dict.nav.tours, href: `/${currentLocale}/tours` },
    { name: dict.nav.transports, href: `/${currentLocale}/transports` },
    { name: dict.nav.privateTransports, href: `/${currentLocale}/transport-private` },
    { name: dict.nav.visit, href: `/${currentLocale}/visit` },
    { name: experiencesLabelByLocale[currentLocale], href: `/${currentLocale}/experiences` },
    { name: dict.nav.events, href: `/${currentLocale}/events` },
    { name: dict.nav.about, href: `/${currentLocale}/about` },
  ]

  const marqueeItems = [
    dict.nav.tours,
    dict.nav.transports,
    dict.nav.events,
    dict.common.offers,
    "IZIPAY",
    "VISA",
    dict.common.payments,
    dict.common.cards,
  ]

  const switchLocale = (newLocale: Locale) => {
    setIsLangMenuOpen(false)
    setIsMenuOpen(false)

    if (newLocale === currentLocale) {
      return
    }

    const segments = pathname.split("/").filter(Boolean)

    if (isValidLocale(segments[0])) {
      segments.shift()
    }

    const pathWithoutLocale = segments.length > 0 ? "/" + segments.join("/") : ""
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const scrollDelta = currentScroll - lastScrollRef.current

      if (!marqueeRef.current) return

      if (scrollDelta > 0 && currentScroll > 50) {
        marqueeRef.current.classList.add("marquee-hidden")
        marqueeRef.current.classList.remove("marquee-visible")
      } else if (scrollDelta < 0) {
        marqueeRef.current.classList.add("marquee-visible")
        marqueeRef.current.classList.remove("marquee-hidden")
      }

      lastScrollRef.current = currentScroll
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-100 p-3 sm:p-5">
        <div className="max-w-[92rem] mx-auto flex flex-col gap-2">
          <div className="bg-background overflow-visible z-50" style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between h-16 sm:h-24 px-4 sm:px-7 lg:px-8">
              <Link href={`/${currentLocale}`} className="flex items-center gap-2 sm:gap-4 shrink-0">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                  <Image
                    src="https://res.cloudinary.com/dwvikvjrq/image/upload/v1758308769/ChatGPT_Image_1_jul_2025__15_21_51-removebg-preview_1_zi4adi.png"
                    alt="Tourism Logo"
                    width={56}
                    height={56}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-black text-lg sm:text-2xl tracking-tighter text-foreground uppercase hidden xs:block">
                  ETOURISM
                </span>
              </Link>

              <nav className="hidden xl:flex items-center gap-5 2xl:gap-6 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={false}
                    className="text-xs sm:text-sm font-black text-foreground uppercase tracking-widest hover:text-neon-orange transition-colors relative group whitespace-nowrap"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-foreground transition-all group-hover:w-full group-hover:bg-neon-orange"></span>
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="relative hidden md:block" ref={langMenuRef}>
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full hover:bg-neon-orange hover:text-black transition-all duration-300"
                  >
                    <Image
                      src={localeFlags[currentLocale].src}
                      alt={localeFlags[currentLocale].alt}
                      width={18}
                      height={14}
                      className="h-[14px] w-[18px] rounded-[2px] object-cover"
                    />
                    <span className="text-[10px] font-black">{localeNames[currentLocale]}</span>
                    <ChevronDown size={12} className={`transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isLangMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg overflow-hidden shadow-lg z-300">
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => switchLocale(loc)}
                          className={`w-full px-6 py-4 text-left text-sm font-black flex items-center justify-between transition-colors last:border-b-0 ${
                            currentLocale === loc
                              ? "bg-neon-orange text-black"
                              : "bg-white text-black hover:bg-gray-100"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Image
                              src={localeFlags[loc].src}
                              alt={localeFlags[loc].alt}
                              width={20}
                              height={15}
                              className="h-[15px] w-5 rounded-[2px] object-cover"
                            />
                            <span>{localeNames[loc]}</span>
                          </span>
                          {currentLocale === loc && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-8 w-0.5 bg-black/30 mx-1 hidden lg:block"></div>

                {user ? (
                  <Link href={`/${currentLocale}/users/profile`} prefetch={false}>
                    <button className="px-4 sm:px-5 py-2 bg-neon-orange text-black font-black text-xs sm:text-sm uppercase rounded-full hover:bg-black hover:text-neon-orange transition-all duration-200 whitespace-nowrap">
                      {dict.common.reservations}
                    </button>
                  </Link>
                ) : (
                  <Link href={`/${currentLocale}/login`} prefetch={false}>
                    <button className="px-4 sm:px-5 py-2 bg-black text-white font-black text-xs sm:text-sm uppercase rounded-full hover:bg-neon-orange hover:text-black transition-all duration-200 whitespace-nowrap">
                      {dict.common.login}
                    </button>
                  </Link>
                )}

                <div className="bg-black text-white p-0.5 sm:p-1 rounded-full hover:scale-105 transition-transform flex items-center justify-center relative z-0">
                  <CartDrawer />
                </div>

                <button
                  className="xl:hidden p-2 sm:p-3 bg-neon-orange text-black rounded-full hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 font-black"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
                >
                  {isMenuOpen ? <X size={18} className="sm:size-5" /> : <Menu size={18} className="sm:size-5" />}
                </button>
              </div>
            </div>
          </div>

          <div
            ref={marqueeRef}
            className="overflow-hidden marquee-visible transition-all duration-400"
            style={{
              borderRadius: "8px",
            }}
          >
            <Marquee items={marqueeItems} />
          </div>
        </div>
      </header>

      <nav
        className={`fixed inset-0 bg-neon-orange z-55 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-8 p-4 bg-black text-neon-orange rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <X size={32} />
        </button>

        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-lg">
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              prefetch={false}
              className={`text-3xl sm:text-6xl font-black text-black uppercase tracking-tighter hover:italic transition-all duration-300 transform ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-10 flex flex-col items-center gap-4">
            <span className="font-black uppercase text-sm tracking-widest text-black/60">
              {dict.common.changeLanguage}
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`px-5 py-2 font-black rounded-xl transition-all active:translate-x-1 active:translate-y-1 ${
                    currentLocale === loc
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Image
                      src={localeFlags[loc].src}
                      alt={localeFlags[loc].alt}
                      width={20}
                      height={15}
                      className="h-[15px] w-5 rounded-[2px] object-cover"
                    />
                    <span>{localeNames[loc]}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
