"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Header from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { CartDrawerProvider } from "@/contexts/cart-context"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.12,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.15,
      autoRaf: false,
      anchors: true,
      stopInertiaOnNavigate: true,
    })

    lenisRef.current = lenis
    const unsubscribe = lenis.on("scroll", () => {
      ScrollTrigger.update()
    })

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      unsubscribe()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <CartDrawerProvider>
      <Header />
      {children}
      <Footer />
    </CartDrawerProvider>
  )
}
