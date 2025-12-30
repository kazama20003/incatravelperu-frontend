import type { Locale } from "@/lib/i18n/config"

export interface FeaturedSectionDictionary {
  title: string
  titleLine2: string
  description: string
  shopButton: string
  restaurantLabel: string
}

export const featuredSectionDictionaries: Record<Locale, FeaturedSectionDictionary> = {
  es: {
    title: "Una Familia Incatravel,",
    titleLine2: "Dedicada a tu Comodidad.",
    description:
      "Incatravel es una empresa familiar que se dedica a brindar los mejores tours y servicios de transporte. Nos enfocamos en tu comodidad, seguridad y los mejores precios para que disfrutes cada momento de tu viaje con tranquilidad.",
    shopButton: "VER TOURS →",
    restaurantLabel: "TOURS INCATRAVEL",
  },
  en: {
    title: "An Incatravel Family,",
    titleLine2: "Dedicated to Your Comfort.",
    description:
      "Incatravel is a family business dedicated to providing the best tours and transportation services. We focus on your comfort, safety, and the best prices so you can enjoy every moment of your trip with peace of mind.",
    shopButton: "VIEW TOURS →",
    restaurantLabel: "INCATRAVEL TOURS",
  },
  fr: {
    title: "Une Famille Incatravel,",
    titleLine2: "Dédiée à Votre Confort.",
    description:
      "Incatravel est une entreprise familiale dédiée à fournir les meilleurs circuits et services de transport. Nous nous concentrons sur votre confort, votre sécurité et les meilleurs prix pour que vous puissiez profiter de chaque moment de votre voyage en toute tranquillité.",
    shopButton: "VOIR LES CIRCUITS →",
    restaurantLabel: "CIRCUITS INCATRAVEL",
  },
  it: {
    title: "Una Famiglia Incatravel,",
    titleLine2: "Dedicata al Tuo Comfort.",
    description:
      "Incatravel è un'azienda familiare dedicata a fornire i migliori tour e servizi di trasporto. Ci concentriamo sul tuo comfort, sicurezza e i migliori prezzi in modo che tu possa goderti ogni momento del tuo viaggio con tranquillità.",
    shopButton: "VISUALIZZA TOUR →",
    restaurantLabel: "TOUR INCATRAVEL",
  },
  de: {
    title: "Eine Incatravel Familie,",
    titleLine2: "Ihrem Komfort Gewidmet.",
    description:
      "Incatravel ist ein Familienunternehmen, das sich der Bereitstellung der besten Touren und Transportdienste widmet. Wir konzentrieren uns auf Ihren Komfort, Ihre Sicherheit und die besten Preise, damit Sie jeden Moment Ihrer Reise unbesorgt genießen können.",
    shopButton: "TOUREN ANSEHEN →",
    restaurantLabel: "INCATRAVEL TOUREN",
  },
  pt: {
    title: "Uma Família Incatravel,",
    titleLine2: "Dedicada ao Seu Conforto.",
    description:
      "Incatravel é uma empresa familiar dedicada a fornecer os melhores passeios e serviços de transporte. Focamos no seu conforto, segurança e nos melhores preços para que você aproveite cada momento da sua viagem com tranquilidade.",
    shopButton: "VER TOURS →",
    restaurantLabel: "TOURS INCATRAVEL",
  },
  zh: {
    title: "Incatravel 家族，",
    titleLine2: "致力于您的舒适。",
    description:
      "Incatravel 是一家致力于提供最佳旅游和交通服务的家族企业。我们专注于您的舒适、安全和最优惠的价格，让您安心享受旅途的每一刻。",
    shopButton: "查看旅游 →",
    restaurantLabel: "INCATRAVEL 旅游",
  },
  ja: {
    title: "Incatravel ファミリー、",
    titleLine2: "あなたの快適さに捧げます。",
    description:
      "Incatravel は、最高のツアーと交通サービスを提供することに専念する家族経営の企業です。お客様の快適さ、安全性、そして最高の価格に焦点を当て、旅行の一瞬一瞬を安心して楽しんでいただけます。",
    shopButton: "ツアーを見る →",
    restaurantLabel: "INCATRAVEL ツアー",
  },
  ru: {
    title: "Семья Incatravel,",
    titleLine2: "Посвящена Вашему Комфорту.",
    description:
      "Incatravel — это семейный бизнес, посвященный предоставлению лучших туров и транспортных услуг. Мы фокусируемся на вашем комфорте, безопасности и лучших ценах, чтобы вы могли наслаждаться каждым моментом вашей поездки со спокойной душой.",
    shopButton: "ПОСМОТРЕТЬ ТУРЫ →",
    restaurantLabel: "ТУРЫ INCATRAVEL",
  },
}

export function getFeaturedSectionDictionary(locale: Locale): FeaturedSectionDictionary {
  return featuredSectionDictionaries[locale]
}
