import type { Locale } from "./config"

// Global
import { getGlobalDictionary, type GlobalDictionary } from "./dictionaries/global"

// Home
import { getHomeDictionary, type HomeDictionary } from "./dictionaries/home"

// Modules
import { getToursDictionary, type ToursDictionary } from "./dictionaries/tours"
import { getVisitDictionary, type VisitDictionary } from "./dictionaries/visit"
import { getClubDictionary, type ClubDictionary } from "./dictionaries/club"
import { getEventsDictionary, type EventsDictionary } from "./dictionaries/events"
import { getAboutDictionary, type AboutDictionary } from "./dictionaries/about"

// Sections
import { getHeroSectionDictionary, type HeroSectionDictionary } from "./dictionaries/hero-section"
import { getFeaturedSectionDictionary, type FeaturedSectionDictionary } from "./dictionaries/featured-section"
import { getProductsSectionDictionary, type ProductsSectionDictionary } from "./dictionaries/products-section"
import { getTestimonialsDictionary, type TestimonialsDictionary } from "./dictionaries/testimonials"
import { getPaymentMethodsDictionary, type PaymentMethodsDictionary } from "./dictionaries/payment-methods"
import { getTransportsSectionDictionary, type TransportsSectionDictionary } from "./dictionaries/transports-section"
import { getFooterDictionary, type FooterDictionary } from "./dictionaries/footer"

export interface DictionarySchema extends GlobalDictionary {
  hero: HomeDictionary["hero"]
  products: HomeDictionary["products"]
  tours: ToursDictionary
  visit: VisitDictionary
  club: ClubDictionary
  events: EventsDictionary
  about: AboutDictionary
  heroSection: HeroSectionDictionary
  featuredSection: FeaturedSectionDictionary
  productsSection: ProductsSectionDictionary
  testimonials: TestimonialsDictionary
  paymentMethods: PaymentMethodsDictionary
  transportsSection: TransportsSectionDictionary
  footer: FooterDictionary
}

export type Dictionary = DictionarySchema

export function getDictionary(locale: Locale): DictionarySchema {
  return {
    // Base global dictionary (incluye footer base)
    ...getGlobalDictionary(locale),
    // Home sections
    ...getHomeDictionary(locale),

    // Módulos
    tours: getToursDictionary(locale),
    visit: getVisitDictionary(locale),
    club: getClubDictionary(locale),
    events: getEventsDictionary(locale),
    about: getAboutDictionary(locale),

    // Secciones
    heroSection: getHeroSectionDictionary(locale),
    featuredSection: getFeaturedSectionDictionary(locale),
    productsSection: getProductsSectionDictionary(locale),
    testimonials: getTestimonialsDictionary(locale),
    paymentMethods: getPaymentMethodsDictionary(locale),
    transportsSection: getTransportsSectionDictionary(locale),

    // Footer completo (sobrescribe el footer básico del GlobalDictionary)
    footer: getFooterDictionary(locale),
  }
}

export {
  getGlobalDictionary,
  getHomeDictionary,
  getToursDictionary,
  getVisitDictionary,
  getClubDictionary,
  getEventsDictionary,
  getAboutDictionary,
  getHeroSectionDictionary,
  getFeaturedSectionDictionary,
  getProductsSectionDictionary,
  getTestimonialsDictionary,
  getPaymentMethodsDictionary,
  getTransportsSectionDictionary,
}
