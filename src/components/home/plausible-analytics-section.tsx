"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BarChart3, Globe2, ShieldCheck } from "lucide-react"
import { useTranslation } from "@/lib/i18n/context"
import "@/types/plausible"

gsap.registerPlugin(ScrollTrigger)

export function PlausibleAnalyticsSection() {
  const { dictionary } = useTranslation()
  const dict = dictionary.plausibleAnalytics
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll("[data-plausible-reveal]")
    const animation = gsap.fromTo(
      elements,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          end: "top 55%",
          scrub: 0.15,
        },
      },
    )

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [])

  const cards = [
    {
      icon: ShieldCheck,
      title: dict.card1Title,
      description: dict.card1Description,
    },
    {
      icon: Globe2,
      title: dict.card2Title,
      description: dict.card2Description,
    },
    {
      icon: BarChart3,
      title: dict.card3Title,
      description: dict.card3Description,
    },
  ]

  return (
    <section ref={sectionRef} className="w-full bg-black text-white border-x-8 border-white">
      <div className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end mb-12">
            <div data-plausible-reveal>
              <span className="inline-flex items-center border border-white/20 px-3 py-1 text-[10px] font-black tracking-[0.35em] uppercase text-white/70">
                {dict.eyebrow}
              </span>
              <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
                {dict.title}
              </h2>
              <p className="mt-2 text-xl md:text-2xl italic text-white/70 font-black">{dict.titleLine2}</p>
            </div>

            <p
              data-plausible-reveal
              className="max-w-xl text-sm md:text-base leading-relaxed text-white/72 font-semibold lg:justify-self-end"
            >
              {dict.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card) => (
              <article
                key={card.title}
                data-plausible-reveal
                className="border border-white/15 bg-white/5 p-6 md:p-7 min-h-56 flex flex-col"
              >
                <div className="flex items-center justify-between mb-10">
                  <card.icon className="h-6 w-6 text-[#FF4D00]" />
                  <span className="text-[10px] font-black tracking-[0.35em] uppercase text-white/40">Plausible</span>
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-wide mb-3">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/72 font-semibold">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
