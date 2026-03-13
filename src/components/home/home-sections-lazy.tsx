"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { CustomCursor } from "@/components/home/custom-cursor"
import "@/types/plausible"

interface HomeSectionsLazyProps {
  locale: string
}

interface LazyMountProps {
  children: ReactNode
  minHeightClassName?: string
  rootMargin?: string
}

function SectionSkeleton({ minHeightClassName = "min-h-[60vh]" }: { minHeightClassName?: string }) {
  return (
    <div className={`${minHeightClassName} w-full bg-background border-t-8 border-white animate-pulse`}>
      <div className="h-full w-full bg-gradient-to-b from-muted/40 via-muted/25 to-muted/10" />
    </div>
  )
}

function LazyMount({ children, minHeightClassName, rootMargin = "300px 0px" }: LazyMountProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.01,
      },
    )

    const element = containerRef.current
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [isVisible, rootMargin])

  return <div ref={containerRef}>{isVisible ? children : <SectionSkeleton minHeightClassName={minHeightClassName} />}</div>
}

function HomePagePlausibleTracker({ locale }: HomeSectionsLazyProps) {
  useEffect(() => {
    window.plausible?.("Home Page Load", {
      props: {
        locale,
      },
    })
  }, [locale])

  return null
}

const TransportsSection = dynamic(
  () => import("@/components/home/transports-section").then((mod) => mod.TransportsSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeightClassName="min-h-[85vh]" />,
  },
)

const PaymentMethodsSection = dynamic(
  () => import("@/components/home/payment-methods-section").then((mod) => mod.PaymentMethodsSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeightClassName="min-h-[70vh]" />,
  },
)

const ProductsSection = dynamic(
  () => import("@/components/home/products-section").then((mod) => mod.ProductsSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeightClassName="min-h-[85vh]" />,
  },
)

const FeaturedSection = dynamic(
  () => import("@/components/home/featured-section").then((mod) => mod.FeaturedSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeightClassName="min-h-[75vh]" />,
  },
)

const PlausibleAnalyticsSection = dynamic(
  () => import("@/components/home/plausible-analytics-section").then((mod) => mod.PlausibleAnalyticsSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeightClassName="min-h-[55vh]" />,
  },
)

const TestimonialsSection = dynamic(
  () => import("@/components/home/testimonials-section").then((mod) => mod.TestimonialsSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton minHeightClassName="min-h-[65vh]" />,
  },
)

export function HomeSectionsLazy({ locale }: HomeSectionsLazyProps) {
  return (
    <>
      <HomePagePlausibleTracker locale={locale} />

      <div id="reservar">
        <CustomCursor text="+TOURS" navigateTo={`/${locale}/tours`}>
          <LazyMount minHeightClassName="min-h-[85vh]" rootMargin="450px 0px">
            <TransportsSection />
          </LazyMount>
          <LazyMount minHeightClassName="min-h-[70vh]" rootMargin="400px 0px">
            <PaymentMethodsSection />
          </LazyMount>
          <LazyMount minHeightClassName="min-h-[85vh]" rootMargin="350px 0px">
            <ProductsSection />
          </LazyMount>
        </CustomCursor>
      </div>

      <LazyMount minHeightClassName="min-h-[75vh]" rootMargin="300px 0px">
        <FeaturedSection />
      </LazyMount>

      <LazyMount minHeightClassName="min-h-[55vh]" rootMargin="280px 0px">
        <PlausibleAnalyticsSection />
      </LazyMount>

      <LazyMount minHeightClassName="min-h-[65vh]" rootMargin="250px 0px">
        <TestimonialsSection />
      </LazyMount>
    </>
  )
}
