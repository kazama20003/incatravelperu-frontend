"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { type Locale, isValidLocale, defaultLocale } from "@/lib/i18n/config"
import { usePathname } from "next/navigation"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
  const pathname = usePathname()
  const currentLocaleFromPath = pathname.split("/")[1]
  const currentLocale: Locale = isValidLocale(currentLocaleFromPath) ? currentLocaleFromPath : defaultLocale

  const dict = getDictionary(currentLocale)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const visitRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const joinRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventType: "Tour Selection",
    message: "",
    subscribe: false,
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroVideoRef.current) {
        gsap.to(heroVideoRef.current, {
          scale: 1.1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      }

      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          opacity: 0,
          y: 100,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "50% top",
            scrub: true,
          },
        })
      }

      const heroElements = heroContentRef.current?.children
      if (heroElements) {
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            delay: 0.3,
            ease: "power3.out",
          },
        )
      }

      // Intro section
      if (introRef.current) {
        gsap.fromTo(
          introRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }

      // Images section
      if (imagesRef.current) {
        const images = imagesRef.current.querySelectorAll(".about-image")
        gsap.fromTo(
          images,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imagesRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        )
      }

      // Story section
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }

      // Visit section
      if (visitRef.current) {
        const cards = visitRef.current.querySelectorAll(".visit-card")
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visitRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }

      // Contact section
      if (contactRef.current) {
        gsap.fromTo(
          contactRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }

      // Join section
      if (joinRef.current) {
        gsap.fromTo(
          joinRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: joinRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappNumber = "+51959784730"
    const message = `Nombre: ${formData.firstName} ${formData.lastName}%0AEmail: ${formData.email}%0ATeléfono: ${formData.phone}%0ATipo: ${formData.eventType}%0AMensaje: ${formData.message}`
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
        <div ref={heroVideoRef} className="absolute inset-0">
          <video
            src="https://res.cloudinary.com/ddbzpbrje/video/upload/v1763011237/11929213_1920_1080_60fps_lq178j.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div
          ref={heroContentRef}
          className="absolute inset-0 flex flex-col items-start justify-end text-left px-4 md:px-8 lg:px-12 pb-12"
        >
          <span className="text-white/70 text-xs font-medium tracking-[0.3em] uppercase mb-3 opacity-0">
            {dict.about.about.hero.subtitle}
          </span>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif mb-2 opacity-0">
            {dict.about.about.hero.title}
          </h1>

          <p className="text-white/60 text-sm md:text-base max-w-md opacity-0">{dict.about.about.hero.description}</p>
        </div>
      </section>

      {/* Introduction Section - Title with Images */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-background">
        {/* Title Area */}
        <div ref={introRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
              {dict.about.about.intro.title}
              <br />
              <span className="italic text-muted-foreground">{dict.about.about.intro.titleHighlight}</span>
            </h2>
          </div>
          <div className="flex items-end">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">{dict.about.about.intro.description}</p>
              <button className="inline-flex items-center gap-2 text-foreground text-sm font-medium tracking-wider uppercase hover:gap-3 transition-all">
                {dict.about.about.intro.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Images */}
        <div ref={imagesRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="about-image aspect-4/3 overflow-hidden">
            <Image
              src="/tourist-group-exploring-arequipa-landmarks-peru-sou.jpg"
              alt="Tours in Arequipa"
              width={800}
              height={600}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="about-image aspect-4/3 overflow-hidden">
            <Image
              src="/comfortable-modern-tour-bus-driving-through-scenic.jpg"
              alt="Comfortable Transportation"
              width={800}
              height={600}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Story Section - Image + Text */}
      <section ref={storyRef} className="py-24 px-4 md:px-8 lg:px-12 bg-secondary opacity-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="aspect-4/5 overflow-hidden">
            <Image
              src="/family-owned-tour-agency-office-in-arequipa-peru-w.jpg"
              alt="Incatravelperu Agency"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-8">
              {dict.about.about.story.title}
            </h3>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {dict.about.about.story.paragraphs.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visit Section - 4 Info Cards */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-muted/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{dict.about.about.visit.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{dict.about.about.visit.description}</p>
        </div>

        <div ref={visitRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dict.about.about.visit.cards.map(
            (
              card: { title: string; lines: string[]; phone?: string; email?: string; action: string },
              index: number,
            ) => (
              <div
                key={index}
                className="visit-card bg-background p-6 flex flex-col justify-between min-h-80 opacity-0"
              >
                <div>
                  <h3 className="text-lg font-serif text-foreground mb-4">{card.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {card.lines.map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 space-y-3">
                  {card.phone && (
                    <a
                      href={`https://wa.me/${card.phone.replace(/\+/g, "").replace(/\s/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors block"
                    >
                      <span className="text-foreground">PH</span> {card.phone}
                    </a>
                  )}
                  {card.email && (
                    <a
                      href={`mailto:${card.email}`}
                      className="text-xs text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors block"
                    >
                      {card.email}
                    </a>
                  )}
                  <a
                    href={
                      card.phone
                        ? `https://wa.me/${card.phone.replace(/\+/g, "").replace(/\s/g, "")}`
                        : card.email
                          ? `mailto:${card.email}`
                          : "#"
                    }
                    target={card.phone ? "_blank" : undefined}
                    rel={card.phone ? "noopener noreferrer" : undefined}
                    className="w-full flex items-center justify-between py-3 border-t border-border text-foreground text-xs font-medium tracking-wider uppercase hover:gap-2 transition-all group"
                  >
                    {card.action}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 px-4 md:px-8 lg:px-12 bg-background opacity-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-muted/30 p-6 lg:p-10">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground text-center mb-4">
              {dict.about.about.contact.title}
            </h2>
            <p className="text-muted-foreground text-center mb-8">{dict.about.about.contact.description}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={dict.about.about.contact.form.firstName}
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="text"
                  placeholder={dict.about.about.contact.form.lastName}
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder={dict.about.about.contact.form.email}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="tel"
                  placeholder={dict.about.about.contact.form.phone}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div className="relative">
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-foreground transition-colors appearance-none"
                >
                  <option>Tour Selection</option>
                  <option>Transportation Only</option>
                  <option>Private Tour</option>
                  <option>Group Tour</option>
                  <option>Custom Package</option>
                  <option>Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <textarea
                placeholder={dict.about.about.contact.form.message}
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
              />

              <div className="flex items-start gap-3">
                <Checkbox
                  id="subscribe"
                  checked={formData.subscribe}
                  onCheckedChange={(checked) => setFormData({ ...formData, subscribe: checked as boolean })}
                />
                <label htmlFor="subscribe" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  {dict.about.about.contact.form.subscribe}
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-foreground text-background text-sm font-medium tracking-wider uppercase rounded-full hover:bg-foreground/90 transition-colors"
              >
                {dict.about.about.contact.form.submit}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="aspect-4/3 lg:aspect-auto lg:h-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.284487661072!2d-71.53931602396342!3d-16.39956423773177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a480521ca4f%3A0x8898b3c67f08b5e4!2sC.%20San%20Agust%C3%ADn%20210%2C%20Arequipa%2004012!5e0!3m2!1sen!2spe!4v1711234567890!5m2!1sen!2spe"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Address Card Overlay */}
            <div className="absolute bottom-6 right-6 bg-background p-6 max-w-xs shadow-lg">
              <p className="text-lg font-serif text-foreground mb-1">{dict.about.about.contact.address.line1}</p>
              <p className="text-lg font-serif text-foreground mb-4">{dict.about.about.contact.address.line2}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=C.+San+Agustín+210,+Arequipa+04012`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground text-foreground text-xs font-medium tracking-wider uppercase hover:bg-foreground hover:text-background transition-all"
              >
                {dict.about.about.contact.address.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section ref={joinRef} className="relative h-[50vh] min-h-[400px] overflow-hidden opacity-0">
        <Image
          src="/incatravelperu-team-working-together-travel-agency-.jpg"
          alt="Join Incatravelperu team"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center px-4 md:px-8 lg:px-12">
          <div className="text-white max-w-md">
            <h2 className="text-3xl md:text-4xl font-serif mb-2">{dict.about.about.team.title1}</h2>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{dict.about.about.team.title2}</h2>
            <p className="text-white/70 text-sm mb-2">{dict.about.about.team.description}</p>
            <p className="text-white text-sm mb-6">{dict.about.about.team.email}</p>
            <a
              href={`mailto:${dict.about.about.team.email}`}
              className="inline-flex items-center gap-2 text-white text-xs font-medium tracking-wider uppercase hover:gap-3 transition-all border-b border-white pb-1"
            >
              {dict.about.about.team.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
