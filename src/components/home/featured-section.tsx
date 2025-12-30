"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/context"

gsap.registerPlugin(ScrollTrigger)

export function FeaturedSection() {
  const { dictionary } = useTranslation()
  const dict = dictionary.featuredSection

  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const imagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [
      titleRef.current,
      subtitleRef.current,
      textRef.current,
      labelRef.current,
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

  return (
    <section className="w-full bg-white">
      <div className="border-l-8 border-r-8 border-t-8 border-white">
        <div className="py-12 md:py-16 px-8 sm:px-12 lg:px-16">
          <div ref={containerRef} className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8 md:mb-12 items-start">
              <div>
                <h2
                  ref={titleRef}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight tracking-tighter"
                >
                  {dict.title}
                </h2>
                <p ref={subtitleRef} className="text-2xl md:text-3xl italic text-black/70 font-black mt-2">
                  {dict.titleLine2}
                </p>
              </div>

              <div ref={textRef} className="flex flex-col justify-start">
                <p className="text-sm md:text-base text-black/80 leading-relaxed mb-6 font-semibold">
                  {dict.description}
                </p>
                <button className="text-black font-black text-xs md:text-sm hover:text-neon-orange transition-colors w-fit uppercase tracking-widest">
                  {dict.shopButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div ref={labelRef} className="absolute top-6 left-6 z-10">
          <p className="text-white font-black text-sm md:text-base tracking-widest uppercase">{dict.restaurantLabel}</p>
        </div>

        <div
          ref={imagesContainerRef}
          className="relative h-96 md:h-[500px] lg:h-[600px] bg-gray-200 overflow-hidden border-b-8 border-white"
        >
          <Image
            src="https://res.cloudinary.com/ddbzpbrje/image/upload/v1765780203/surtido-plano-con-deliciosa-comida-brasilena_l7n5xl.jpg"
            alt="Maxwell Restaurant"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
