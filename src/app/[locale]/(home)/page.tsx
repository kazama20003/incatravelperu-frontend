import { HeroSection } from "@/components/home/hero-section"
import { CustomCursor } from "@/components/home/custom-cursor"
import { HomeSectionsLazy } from "@/components/home/home-sections-lazy"

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  return (
    <main className="min-h-screen bg-background">
      <CustomCursor scrollToId="reservar">
        <HeroSection />
      </CustomCursor>

      <HomeSectionsLazy locale={locale} />
    </main>
  )
}
