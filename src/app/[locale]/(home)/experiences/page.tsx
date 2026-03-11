"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { type Locale, isValidLocale, defaultLocale } from "@/lib/i18n/config"
import { usePathname } from "next/navigation"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Experience {
  videoSrc: string
  title: string
  description: string
  featured?: boolean
  badge?: string
  actionText: string
}

interface FAQ {
  question: string
  answer: string
}

interface ExperiencesPageCopy {
  hero: {
    subtitle: string
    title: string
    description: string
  }
  ctaBar: {
    primary: string
    secondary: string
  }
  section: {
    title: string
    titleItalic: string
    description: string
  }
  card: {
    actionText: string
    featuredBadge: string
  }
  experiences: Array<{
    title: string
    description: string
  }>
  faq: {
    title: string
    titleItalic: string
    description: string
    items: FAQ[]
  }
}

const esCopy: ExperiencesPageCopy = {
  hero: {
    subtitle: "Historias Reales",
    title: "Experiencias de Nuestros Clientes, Turistas y Viajeros",
    description: "Momentos compartidos por viajeros que vivieron Perú con nosotros.",
  },
  ctaBar: {
    primary: "Quiero Vivir Esta Experiencia",
    secondary: "Hablar con un Asesor",
  },
  section: {
    title: "Experiencias de",
    titleItalic: "Clientes, Turistas y Viajeros",
    description:
      "Cada video y testimonio refleja aventuras auténticas en Cusco, el Valle Sagrado y Machu Picchu, guiadas por nuestro equipo local.",
  },
  card: {
    actionText: "Ver Historia",
    featuredBadge: "Destacado",
  },
  experiences: [
    {
      title: "Amanecer en Machu Picchu",
      description: "Una pareja comparte cómo fue su primera vista de la ciudadela al amanecer.",
    },
    {
      title: "Ruta gastronómica en Cusco",
      description: "Turistas cuentan su recorrido por sabores locales y mercados tradicionales.",
    },
    {
      title: "Aventura en la Montaña de Colores",
      description: "Grupo de viajeros narra su experiencia de altura y paisajes únicos.",
    },
    {
      title: "Valle Sagrado en familia",
      description: "Familias resaltan la organización, seguridad y comodidad del itinerario.",
    },
    {
      title: "Conexión cultural con comunidades",
      description: "Viajeros describen talleres y encuentros con artesanos locales.",
    },
    {
      title: "Atardecer inolvidable en los Andes",
      description: "Testimonio sobre vistas panorámicas y acompañamiento personalizado.",
    },
  ],
  faq: {
    title: "Preguntas",
    titleItalic: "Frecuentes",
    description: "Respuestas rápidas sobre cómo participar en nuestras experiencias turísticas.",
    items: [
      {
        question: "¿Cómo reservo una experiencia?",
        answer:
          "Puedes reservar desde nuestra web o por WhatsApp. Te ayudamos a elegir la experiencia ideal según tu tiempo y presupuesto.",
      },
      {
        question: "¿Incluyen transporte y guía?",
        answer:
          "Sí. La mayoría de experiencias incluyen recojo, transporte turístico y guía profesional. Cada detalle aparece en la descripción antes de reservar.",
      },
      {
        question: "¿Son aptas para familias?",
        answer:
          "Tenemos rutas para familias, parejas y grupos. También adaptamos opciones para niños y adultos mayores.",
      },
      {
        question: "¿Puedo personalizar mi itinerario?",
        answer:
          "Sí. Diseñamos experiencias privadas y personalizadas según tus intereses, fechas y ritmo de viaje.",
      },
      {
        question: "¿Con cuánta anticipación debo reservar?",
        answer:
          "Recomendamos reservar con 7 a 15 días de anticipación, sobre todo en temporada alta y feriados.",
      },
      {
        question: "¿Qué pasa si cambia el clima?",
        answer:
          "Monitoreamos las condiciones diariamente. Si una ruta no es segura, te ofrecemos reprogramación o una alternativa equivalente.",
      },
    ],
  },
}

const enCopy: ExperiencesPageCopy = {
  hero: {
    subtitle: "Real Stories",
    title: "Experiences From Our Travelers",
    description: "Moments shared by visitors who discovered Peru with our team.",
  },
  ctaBar: {
    primary: "I Want This Experience",
    secondary: "Talk to an Advisor",
  },
  section: {
    title: "Experiences From",
    titleItalic: "Our Clients",
    description:
      "Every video and testimonial shows authentic adventures in Cusco, the Sacred Valley, and Machu Picchu with local guidance.",
  },
  card: {
    actionText: "Watch Story",
    featuredBadge: "Featured",
  },
  experiences: [
    {
      title: "Machu Picchu Sunrise",
      description: "A couple shares the emotion of seeing the citadel at first light.",
    },
    {
      title: "Cusco Food Journey",
      description: "Travelers talk about local flavors, markets, and traditional cuisine.",
    },
    {
      title: "Rainbow Mountain Adventure",
      description: "Guests describe the altitude challenge and unforgettable landscapes.",
    },
    {
      title: "Sacred Valley Family Trip",
      description: "Families highlight comfort, safety, and smooth trip coordination.",
    },
    {
      title: "Cultural Connection",
      description: "Visitors share artisan workshops and local community encounters.",
    },
    {
      title: "Andean Sunset Experience",
      description: "A traveler testimonial about panoramic views and personal support.",
    },
  ],
  faq: {
    title: "Frequently",
    titleItalic: "Asked",
    description: "Quick answers about joining our travel experiences.",
    items: [
      {
        question: "How do I book an experience?",
        answer:
          "You can book through our website or WhatsApp. We help you choose the best option based on your time and budget.",
      },
      {
        question: "Do experiences include transport and guide?",
        answer:
          "Yes. Most experiences include pickup, tourist transportation, and a professional guide. Full details are shown before booking.",
      },
      {
        question: "Are experiences family-friendly?",
        answer: "We offer routes for families, couples, and groups, with adaptable options for children and seniors.",
      },
      {
        question: "Can I customize my itinerary?",
        answer: "Yes. We build private and customized experiences based on your interests, dates, and travel pace.",
      },
      {
        question: "How early should I book?",
        answer: "We recommend booking 7 to 15 days in advance, especially during high season and holidays.",
      },
      {
        question: "What if weather conditions change?",
        answer:
          "We monitor conditions daily. If a route is unsafe, we offer rescheduling or a similar alternative experience.",
      },
    ],
  },
}

const copyByLocale: Record<Locale, ExperiencesPageCopy> = {
  es: esCopy,
  en: enCopy,
  fr: enCopy,
  it: enCopy,
  de: enCopy,
  pt: enCopy,
  zh: enCopy,
  ja: enCopy,
  ru: enCopy,
}

const customerExperienceVideos = [
  "https://res.cloudinary.com/ddbzpbrje/video/upload/v1763011237/11929213_1920_1080_60fps_lq178j.mp4",
  "https://res.cloudinary.com/ddbzpbrje/video/upload/v1763011237/11929213_1920_1080_60fps_lq178j.mp4",
  "https://res.cloudinary.com/ddbzpbrje/video/upload/v1763011237/11929213_1920_1080_60fps_lq178j.mp4",
  "https://res.cloudinary.com/ddbzpbrje/video/upload/v1763011237/11929213_1920_1080_60fps_lq178j.mp4",
  "https://res.cloudinary.com/ddbzpbrje/video/upload/v1763011237/11929213_1920_1080_60fps_lq178j.mp4",
  "https://res.cloudinary.com/ddbzpbrje/video/upload/v1763011237/11929213_1920_1080_60fps_lq178j.mp4",
]

function ExperienceCard({ experience }: { experience: Experience }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={cardRef} className="group opacity-0">
      <div className="relative aspect-3/4 overflow-hidden bg-muted mb-4">
        <video
          src={experience.videoSrc}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />
        <span className="absolute right-4 bottom-4 h-10 w-10 rounded-full bg-white/90 text-black flex items-center justify-center">
          <Play className="h-4 w-4 ml-0.5" />
        </span>
        {experience.featured && experience.badge && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs tracking-widest uppercase">
            {experience.badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-serif text-foreground mb-1">{experience.title}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{experience.description}</p>

      <button className="w-full py-2.5 bg-primary text-primary-foreground text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
        {experience.actionText}
      </button>
    </div>
  )
}

function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="opacity-0">
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq: FAQ, index: number) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border bg-background px-6 data-[state=open]:border-foreground transition-all duration-300"
          >
            <AccordionTrigger className="py-6 hover:no-underline group">
              <div className="flex items-center gap-4 text-left">
                <span className="text-muted-foreground text-sm font-mono">0{index + 1}</span>
                <span className="text-foreground font-medium group-hover:text-muted-foreground transition-colors">
                  {faq.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default function ExperiencesPage() {
  const pathname = usePathname()
  const currentLocaleFromPath = pathname.split("/")[1]
  const currentLocale: Locale = isValidLocale(currentLocaleFromPath) ? currentLocaleFromPath : defaultLocale
  const copy = copyByLocale[currentLocale] || esCopy

  const experiences: Experience[] = copy.experiences.map((item, index) => ({
    videoSrc: customerExperienceVideos[index % customerExperienceVideos.length],
    title: item.title,
    description: item.description,
    featured: index === 0 || index === 3,
    badge: copy.card.featuredBadge,
    actionText: copy.card.actionText,
  }))

  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const faqTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }

      if (faqTitleRef.current) {
        gsap.fromTo(
          faqTitleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqTitleRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background">
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
          className="absolute inset-0 flex flex-col items-start justify-end text-left px-6 pb-12"
        >
          <span className="text-white/70 text-xs font-medium tracking-[0.3em] uppercase mb-3 opacity-0">
            {copy.hero.subtitle}
          </span>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif mb-2 opacity-0">{copy.hero.title}</h1>

          <p className="text-white/60 text-sm md:text-base max-w-md opacity-0">{copy.hero.description}</p>
        </div>
      </section>

      <section className="py-8 bg-secondary border-b border-border">
        <div className="px-6">
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3 bg-foreground text-background text-xs font-medium tracking-wider uppercase rounded-full border border-foreground transition-all hover:scale-[1.02]">
              {copy.ctaBar.primary}
            </button>
            <button className="px-8 py-3 bg-transparent border border-border text-muted-foreground text-xs font-medium tracking-wider uppercase rounded-full hover:text-foreground hover:border-foreground transition-all">
              {copy.ctaBar.secondary}
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <h2 ref={titleRef} className="text-3xl md:text-4xl font-serif text-foreground leading-tight opacity-0">
                {copy.section.title}
                <br />
                <span className="italic">{copy.section.titleItalic}</span>
              </h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{copy.section.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <h2 ref={faqTitleRef} className="text-3xl md:text-4xl font-serif text-foreground leading-tight opacity-0">
                {copy.faq.title}
                <br />
                <span className="italic">{copy.faq.titleItalic}</span>
              </h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{copy.faq.description}</p>
            </div>

            <FAQSection faqs={copy.faq.items} />
          </div>
        </div>
      </section>
    </main>
  )
}


