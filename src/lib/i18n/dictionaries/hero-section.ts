const heroSectionDictionaries = {
  es: {
    title: "Descubre Perú con",
    titleLine2: "Incatravelperu",
    description: "Aseguramos tus pagos con Izipay para cualquier tour o transporte",
    reserveWhatsApp1: "Reservar +51 959 784 730",
    reserveWhatsApp2: "Reservar +51 997 407 040",
    shopNow: "Ver Tours",
  },
  en: {
    title: "Discover Peru with",
    titleLine2: "Incatravelperu",
    description: "We secure your payments with Izipay for any tour or transportation",
    reserveWhatsApp1: "Reserve +51 959 784 730",
    reserveWhatsApp2: "Reserve +51 997 407 040",
    shopNow: "View Tours",
  },
  fr: {
    title: "Découvrez le Pérou avec",
    titleLine2: "Incatravelperu",
    description: "Nous sécurisons vos paiements avec Izipay pour tout tour ou transport",
    reserveWhatsApp1: "Réserver +51 959 784 730",
    reserveWhatsApp2: "Réserver +51 997 407 040",
    shopNow: "Voir les Tours",
  },
  it: {
    title: "Scopri il Perù con",
    titleLine2: "Incatravelperu",
    description: "Assicuriamo i tuoi pagamenti con Izipay per qualsiasi tour o trasporto",
    reserveWhatsApp1: "Prenota +51 959 784 730",
    reserveWhatsApp2: "Prenota +51 997 407 040",
    shopNow: "Vedi Tour",
  },
  de: {
    title: "Entdecken Sie Peru mit",
    titleLine2: "Incatravelperu",
    description: "Wir sichern Ihre Zahlungen mit Izipay für jede Tour oder Transport",
    reserveWhatsApp1: "Reservieren +51 959 784 730",
    reserveWhatsApp2: "Reservieren +51 997 407 040",
    shopNow: "Touren Ansehen",
  },
  pt: {
    title: "Descubra o Peru com",
    titleLine2: "Incatravelperu",
    description: "Garantimos seus pagamentos com Izipay para qualquer tour ou transporte",
    reserveWhatsApp1: "Reservar +51 959 784 730",
    reserveWhatsApp2: "Reservar +51 997 407 040",
    shopNow: "Ver Tours",
  },
  zh: {
    title: "与Incatravelperu一起",
    titleLine2: "发现秘鲁",
    description: "我们使用Izipay保护您的任何旅游或交通支付",
    reserveWhatsApp1: "预订 +51 959 784 730",
    reserveWhatsApp2: "预订 +51 997 407 040",
    shopNow: "查看旅游",
  },
  ja: {
    title: "Incatrravelperuと共に",
    titleLine2: "ペルーを発見",
    description: "あらゆるツアーや交通機関の支払いをIzipayで保護します",
    reserveWhatsApp1: "予約 +51 959 784 730",
    reserveWhatsApp2: "予約 +51 997 407 040",
    shopNow: "ツアーを見る",
  },
  ru: {
    title: "Откройте для себя Перу с",
    titleLine2: "Incatravelperu",
    description: "Мы обеспечиваем безопасность ваших платежей с помощью Izipay для любого тура или транспорта",
    reserveWhatsApp1: "Забронировать +51 959 784 730",
    reserveWhatsApp2: "Забронировать +51 997 407 040",
    shopNow: "Смотреть Туры",
  },
}

export type HeroSectionDictionary = (typeof heroSectionDictionaries)["es"]

export function getHeroSectionDictionary(locale: string): HeroSectionDictionary {
  return heroSectionDictionaries[locale as keyof typeof heroSectionDictionaries] || heroSectionDictionaries.es
}
