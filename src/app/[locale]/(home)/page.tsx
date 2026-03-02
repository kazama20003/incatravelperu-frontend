import { HeroSection } from "@/components/home/hero-section"
import { FeaturedSection } from "@/components/home/featured-section"
import { ProductsSection } from "@/components/home/products-section"
import { CustomCursor } from "@/components/home/custom-cursor"
import { PaymentMethodsSection } from "@/components/home/payment-methods-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { TransportsSection } from "@/components/home/transports-section"

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

      <div id="reservar">
        <CustomCursor text="+TOURS" navigateTo={`/${locale}/tours`}>
         <TransportsSection />
         <PaymentMethodsSection />
          <ProductsSection />
        </CustomCursor>
      </div>
      <FeaturedSection />
      <TestimonialsSection />
    </main>
  )
}
