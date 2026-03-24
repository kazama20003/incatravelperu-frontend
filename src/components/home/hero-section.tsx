"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useTranslation } from "@/lib/i18n/context"

export function HeroSection() {
  const { dictionary } = useTranslation()
  const translations = dictionary.heroSection
  const [recommendCopied, setRecommendCopied] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const titleLineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const benefitRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const video = videoRef.current

    if (video) {
      video.play().catch(() => {
        // Silenciar error de autoplay
      })
    }
  }, [])

  useEffect(() => {
    const titleNodes = titleLineRefs.current.filter(Boolean)
    const benefitNodes = benefitRefs.current.filter(Boolean)
    const video = videoRef.current

    gsap.set(
      [eyebrowRef.current, descriptionRef.current, ctaRef.current, trustRef.current, ...titleNodes, ...benefitNodes].filter(
        Boolean
      ),
      { opacity: 0 }
    )
    gsap.set([eyebrowRef.current, ...titleNodes].filter(Boolean), { yPercent: 120 })
    gsap.set([descriptionRef.current, ctaRef.current].filter(Boolean), { y: 34 })
    gsap.set([...benefitNodes, trustRef.current].filter(Boolean), { y: 24 })

    let hasStarted = false
    let fallbackTimeout: ReturnType<typeof setTimeout> | null = null

    const playIntro = () => {
      if (hasStarted) return
      hasStarted = true

      introTimelineRef.current?.kill()
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.08 })

      if (eyebrowRef.current) {
        timeline.to(eyebrowRef.current, { yPercent: 0, opacity: 1, duration: 0.65 })
      }

      if (titleNodes.length > 0) {
        timeline.to(titleNodes, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, "-=0.3")
      }

      if (descriptionRef.current) {
        timeline.to(descriptionRef.current, { y: 0, opacity: 1, duration: 0.65 }, "-=0.35")
      }

      if (ctaRef.current) {
        timeline.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6 }, "-=0.35")
      }

      if (benefitNodes.length > 0) {
        timeline.to(benefitNodes, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out" }, "-=0.3")
      }

      if (trustRef.current) {
        timeline.to(trustRef.current, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.3")
      }

      introTimelineRef.current = timeline
    }

    const handleVideoReady = () => {
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout)
        fallbackTimeout = null
      }
      playIntro()
    }

    if (video?.readyState && video.readyState >= 2) {
      playIntro()
    } else {
      video?.addEventListener("loadeddata", handleVideoReady)
      video?.addEventListener("canplay", handleVideoReady)
      fallbackTimeout = setTimeout(playIntro, 1400)
    }

    return () => {
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout)
      }
      video?.removeEventListener("loadeddata", handleVideoReady)
      video?.removeEventListener("canplay", handleVideoReady)
      introTimelineRef.current?.kill()
    }
  }, [])

  const handleReserveWhatsApp1 = () => {
    const phoneNumber = "51959748730"
    const message = encodeURIComponent(translations.whatsAppMessage)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleReserveWhatsApp2 = () => {
    const phoneNumber = "51997407040"
    const message = encodeURIComponent(translations.whatsAppMessage)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const titleLines = [translations.titleLine1Hero, translations.titleLine2Hero, translations.titleLine3Hero]
  const benefits = [translations.benefitTrek, translations.benefitPrivateTransport, translations.benefitRoutes]
  const socialProofIcons = [
    {
      name: "WhatsApp",
      className: "bg-[#25D366] text-white",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      className: "bg-[linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)] text-white",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.55a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.3A5.7 5.7 0 1 1 6.3 12 5.7 5.7 0 0 1 12 6.3Zm0 1.8A3.9 3.9 0 1 0 15.9 12 3.9 3.9 0 0 0 12 8.1Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      className: "bg-[#1877F2] text-white",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 22v-8.2h2.8l.42-3.2h-3.22V8.56c0-.93.27-1.56 1.6-1.56h1.7V4.13c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.21 1.52-4.21 4.33v2.27H7.2v3.2h2.86V22h3.44Z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      className: "bg-black/70 text-white",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14.55 3c.24 2.02 1.39 3.84 3.22 4.82.87.47 1.83.73 2.8.78v3.03a8.18 8.18 0 0 1-3.95-1.04v5.53A6.11 6.11 0 1 1 10.5 10v3.12a3.05 3.05 0 1 0 2.02 2.87V3h2.03Z" />
        </svg>
      ),
    },
  ] as const

  const handleRecommendPage = async () => {
    const pageUrl = window.location.href
    const shareText = `${translations.recommendShareText} ${pageUrl}`
    setRecommendCopied(false)

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Incatravelperu",
          text: translations.recommendShareText,
          url: pageUrl,
        })
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pageUrl)
        setRecommendCopied(true)
        window.setTimeout(() => setRecommendCopied(false), 2200)
        return
      }
    } catch {
      return
    }

    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
  }

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.02] sm:scale-[1.06] md:scale-[1.14]"
        >
          <source
            src="https://demo-posventas.s3.us-east-2.amazonaws.com/AdobeStock_503226626.mp4.mov"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative z-20 min-h-[100svh]">
        <div className="flex min-h-[100svh] w-full flex-col justify-between px-4 pb-8 pt-[9.75rem] sm:px-6 sm:pb-10 sm:pt-[11.5rem] md:px-8 md:pb-14 md:pt-[13rem] lg:px-10 lg:pt-[13.5rem] xl:px-14">
          <div className="max-w-[1120px]">
            <div className="mb-5 overflow-hidden text-[11px] font-black uppercase tracking-[0.08em] text-white sm:text-sm">
              <span ref={eyebrowRef} className="block">
                <span>{translations.eyebrowPrefix} </span>
                <span className="text-neon-orange">{translations.eyebrowAccent}</span>
              </span>
            </div>

            <h1 className="max-w-[1120px] text-[3rem] font-black uppercase leading-[0.84] tracking-[-0.065em] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.48)] sm:text-[4.5rem] md:text-[5.7rem] lg:text-[6.8rem] xl:text-[7.8rem]">
              {titleLines.map((line, index) => (
                <span key={line} className="block overflow-hidden">
                  <span
                    ref={(element) => {
                      titleLineRefs.current[index] = element
                    }}
                    className="block"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div className="grid w-full items-end gap-6 pb-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-white">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    ref={(element) => {
                      benefitRefs.current[index] = element
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-black/15">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path
                          d="M4 10.5L8 14.5L16 6.5"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-black sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>

              <div ref={trustRef} className="mt-7 flex items-start gap-4">
                <div className="flex -space-x-2">
                  {socialProofIcons.map((item) => (
                    <span
                      key={item.name}
                      title={item.name}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 shadow-[0_10px_22px_rgba(0,0,0,0.3)] ${item.className}`}
                    >
                      {item.icon}
                    </span>
                  ))}
                </div>

                <div className="max-w-xs">
                  <p className="text-sm font-black text-white sm:text-base">{translations.trustTitle}</p>
                  <p className="text-sm font-medium leading-6 text-white/82 sm:text-base">{translations.trustText}</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:justify-self-end">
              <div className="max-w-2xl lg:max-w-[680px]">
                <p
                  ref={descriptionRef}
                  className="text-base font-semibold leading-relaxed text-white sm:text-lg md:text-[1.35rem]"
                >
                  {translations.description}
                </p>

                <div ref={ctaRef} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReserveWhatsApp1()
                    }}
                    className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[1.1rem] bg-neon-orange px-6 py-4 text-sm font-black uppercase tracking-[0.03em] text-black transition-colors hover:bg-[#ff8c26] sm:text-base"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    {translations.reserveWhatsApp1}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReserveWhatsApp2()
                    }}
                    className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[1.1rem] bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.03em] text-black transition-colors hover:bg-white/85 sm:text-base"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    {translations.reserveWhatsApp2}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRecommendPage()
                    }}
                    className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[1.1rem] border border-white/20 bg-black/35 px-6 py-4 text-sm font-black uppercase tracking-[0.03em] text-white backdrop-blur-[2px] transition-colors hover:bg-black/55 sm:text-base"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M14 5L20 5L20 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14L20 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 14V18C19 19.1046 18.1046 20 17 20H6C4.89543 20 4 19.1046 4 18V7C4 5.89543 4.89543 5 6 5H10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {recommendCopied ? translations.recommendCopied : translations.recommendPage}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
