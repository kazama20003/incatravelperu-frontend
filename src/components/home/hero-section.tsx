"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n/context"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const { dictionary,  } = useTranslation()
  const translations = dictionary.heroSection
  const router = useRouter()

  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const [audioActive, setAudioActive] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    const video = videoRef.current

    if (video) {
      video.play().catch(() => {
        // Silenciar error de autoplay
      })
    }

    if (!audio) return

    const unlockAudio = () => {
      audio
        .play()
        .then(() => {
          setAudioActive(true)
        })
        .catch(() => {
          // Silenciar error de autoplay
        })

      window.removeEventListener("click", unlockAudio)
      window.removeEventListener("touchstart", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
    }

    window.addEventListener("click", unlockAudio)
    window.addEventListener("touchstart", unlockAudio)
    window.addEventListener("keydown", unlockAudio)

    return () => {
      window.removeEventListener("click", unlockAudio)
      window.removeEventListener("touchstart", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
    }
  }, [])

  useEffect(() => {
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current, { y: 100, opacity: 0 })

      ScrollTrigger.create({
        trigger: buttonsRef.current,
        start: "top 90%",
        onEnter: () => {
          gsap.to(buttonsRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          })
        },
        once: true,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (audioActive) {
        audio.pause()
      } else {
        await audio.play()
      }
      setAudioActive(!audioActive)
    } catch {
      // Silenciar error
    }
  }

  const handleReserveWhatsApp1 = () => {
    const phoneNumber = "51959784730"
    const message = encodeURIComponent("Hola, me interesa reservar un tour o transporte con Incatravelperu")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleReserveWhatsApp2 = () => {
    const phoneNumber = "51997407040"
    const message = encodeURIComponent("Hola, me interesa reservar un tour o transporte con Incatravelperu")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleShopNow = () => {
    router.push(`/tours`)
  }

  return (
    <section className="relative w-full h-screen overflow-hidden video-showcase">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-[1.05] md:scale-[1.2]"
        >
          <source
            src="https://res.cloudinary.com/ddbzpbrje/video/upload/v1767044968/20104965-hd_1280_720_30fps_gwjdgp.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-end">
          <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 pb-12 md:pb-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">
                {translations.title} <br /> {translations.titleLine2}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/90 italic font-light max-w-md mb-6 md:mb-8">
                {translations.description}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 pb-8 md:pb-16 lg:pb-20 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 sm:gap-0">
          {/* AUDIO BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleAudio()
            }}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center text-white backdrop-blur-sm"
            aria-label="Toggle audio"
          >
            {audioActive ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 3a1 1 0 012 0v5a1 1 0 11-2 0V3zm3 7a1 1 0 012 0v2a1 1 0 11-2 0v-2zm3-5a1 1 0 112 0v7a1 1 0 11-2 0V5zM6 7a1 1 0 012 0v4a1 1 0 11-2 0V7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.172a1 1 0 011.414 0A6.972 6.972 0 0118 10a6.972 6.972 0 01-1.929 4.828 1 1 0 01-1.414-1.414A4.972 4.972 0 0016 10c0-1.713-.672-3.259-1.757-4.372a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleReserveWhatsApp1()
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#25D366] text-white font-black rounded-full hover:bg-[#128C7E] transition-all text-xs sm:text-sm uppercase tracking-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {translations.reserveWhatsApp1}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleReserveWhatsApp2()
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#25D366] text-white font-black rounded-full hover:bg-[#128C7E] transition-all text-xs sm:text-sm uppercase tracking-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {translations.reserveWhatsApp2}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleShopNow()
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-transparent text-white font-black rounded-full hover:bg-white/10 transition-all border-2 border-neon-orange text-xs sm:text-sm uppercase tracking-tight"
            >
              {translations.shopNow}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
