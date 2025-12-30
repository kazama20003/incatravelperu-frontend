"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslation } from "@/lib/i18n/context"
import { useTopTransports } from "@/hooks/use-transports"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"

gsap.registerPlugin(ScrollTrigger)

export function TransportsSection() {
  const { locale, dictionary } = useTranslation()
  const dict = dictionary.transportsSection
  const { data: transports, isLoading } = useTopTransports(locale)

  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const imagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [
      titleRef.current,
      subtitleRef.current,
      descriptionRef.current,
      dividerRef.current,
      imagesContainerRef.current,
    ]

    elements.forEach((el) => {
      if (!el) return

      gsap.set(el, {
        opacity: 0,
        y: 50,
      })

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 70%",
          scrub: 0.1,
          markers: false,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const displayTransports = transports?.slice(0, 4) || []

  return (
    <section id="transports-section" className="w-full bg-background">
      <div ref={dividerRef} className="border-t-8 border-white" />

      <div className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <div className="flex items-baseline gap-4 flex-wrap">
              <h2
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-tight"
              >
                {dict.title}
              </h2>
              <p ref={subtitleRef} className="text-xl sm:text-2xl md:text-3xl italic text-foreground/80 font-light">
                {dict.subtitle}
              </p>
            </div>
          </div>

          <div ref={descriptionRef} className="mb-8 md:mb-12 border-b-2 border-neon-orange pb-8">
            <p className="text-xs sm:text-sm md:text-base text-foreground/90 leading-relaxed mb-4 max-w-2xl">
              {dict.description}
            </p>
            <button
              className="text-foreground font-black text-xs md:text-sm hover:text-neon-orange transition-colors w-fit uppercase tracking-widest"
              onClick={(e) => e.stopPropagation()}
            >
              {dict.exploreTransports}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={imagesContainerRef}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t-8 border-white bg-background"
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-screen overflow-hidden bg-gray-200 animate-pulse flex items-center justify-center border-r-8 border-white">
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="md:hidden border-b-4 border-white" />
            </div>
          ))
        ) : displayTransports.length > 0 ? (
          displayTransports.map((transport) => {
            const mainImage = transport.images?.[0]?.url || "/placeholder.svg"

            return (
              <div key={transport._id}>
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-screen overflow-hidden group border-r-8 border-white">
                  <Image
                    src={mainImage || "/placeholder.svg"}
                    alt={transport.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white mb-2 uppercase tracking-tighter">
                      {transport.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed mb-4 line-clamp-2">
                      {transport.description}
                    </p>
                    <div className="text-xs sm:text-sm text-white/80 mb-3 flex flex-wrap gap-2">
                      {transport.durationHours && (
                        <span className="flex items-center gap-1">
                          ⏱️ {transport.durationHours}h{transport.durationMinutes && `${transport.durationMinutes}m`}
                        </span>
                      )}
                      {transport.availableDays && transport.availableDays.length > 0 && (
                        <span className="flex items-center gap-1">📅 {transport.availableDays.length} días</span>
                      )}
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-neon-orange mb-4">
                      ${transport.currentPrice.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <AddToCartButton
                        productId={transport._id}
                        productType="transport"
                        productTitle={transport.title}
                        productImage={transport.images?.[0]?.url}
                        productDescription={transport.description}
                        unitPrice={transport.currentPrice}
                        triggerChildren={
                          <button className="px-4 sm:px-5 py-2 bg-neon-orange text-black font-black text-xs sm:text-sm uppercase rounded-full hover:bg-black hover:text-neon-orange transition-all duration-200 whitespace-nowrap tracking-widest">
                            {dict.reserve}
                          </button>
                        }
                      />
                      <Link
                        href={`/${locale}/transports/${transport.slug}`}
                        className="px-4 sm:px-5 py-2 bg-black text-neon-orange font-black text-xs sm:text-sm uppercase rounded-full hover:bg-neon-orange hover:text-black transition-all duration-200 whitespace-nowrap tracking-widest"
                      >
                        {dict.viewDetails}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="md:hidden border-b-4 border-white" />
              </div>
            )
          })
        ) : (
          <div className="col-span-full p-12 text-center text-foreground/50">
            <p className="font-black uppercase tracking-widest">{dict.noTransportsAvailable}</p>
          </div>
        )}
      </div>
    </section>
  )
}
