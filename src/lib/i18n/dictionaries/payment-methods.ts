import type { Locale } from "@/lib/i18n/config"

export interface PaymentMethodsDictionary {
  title: string
  subtitle: string
  securePayment: string
  quote: string
  quoteAuthor: string
  description: string
  ctaText: string
}

const paymentMethodsDictionaries: Record<Locale, PaymentMethodsDictionary> = {
  es: {
    title: "Pagos Seguros con Izipay",
    subtitle: "Reserva tus tours y transporte con total seguridad",
    securePayment: "Pagos seguros procesados por Izipay",
    quote: "Aseguramos tus pagos con Izipay para cualquier tour o transporte. Tu seguridad es nuestra prioridad.",
    quoteAuthor: "- Incatravelperu, Tu familia en el turismo",
    description:
      "En Incatravelperu aceptamos todas las tarjetas de crédito y débito. Reserva tus tours y transporte con total confianza. Todos los pagos están protegidos y encriptados por Izipay.",
    ctaText: "Reservar ahora",
  },
  en: {
    title: "Secure Payments with Izipay",
    subtitle: "Book your tours and transport with complete security",
    securePayment: "Secure payments processed by Izipay",
    quote: "We secure your payments with Izipay for any tour or transport. Your security is our priority.",
    quoteAuthor: "- Incatravelperu, Your family in tourism",
    description:
      "At Incatravelperu we accept all credit and debit cards. Book your tours and transport with complete confidence. All payments are protected and encrypted by Izipay.",
    ctaText: "Book now",
  },
  fr: {
    title: "Paiements Sécurisés avec Izipay",
    subtitle: "Réservez vos tours et transports en toute sécurité",
    securePayment: "Paiements sécurisés traités par Izipay",
    quote:
      "Nous sécurisons vos paiements avec Izipay pour toute visite ou transport. Votre sécurité est notre priorité.",
    quoteAuthor: "- Incatravelperu, Votre famille dans le tourisme",
    description:
      "Chez Incatravelperu, nous acceptons toutes les cartes de crédit et de débit. Réservez vos tours et transports en toute confiance. Tous les paiements sont protégés et cryptés par Izipay.",
    ctaText: "Réserver maintenant",
  },
  it: {
    title: "Pagamenti Sicuri con Izipay",
    subtitle: "Prenota i tuoi tour e trasporti in totale sicurezza",
    securePayment: "Pagamenti sicuri elaborati da Izipay",
    quote:
      "Proteggiamo i tuoi pagamenti con Izipay per qualsiasi tour o trasporto. La tua sicurezza è la nostra priorità.",
    quoteAuthor: "- Incatravelperu, La tua famiglia nel turismo",
    description:
      "A Incatravelperu accettiamo tutte le carte di credito e debito. Prenota i tuoi tour e trasporti con totale fiducia. Tutti i pagamenti sono protetti e crittografati da Izipay.",
    ctaText: "Prenota ora",
  },
  de: {
    title: "Sichere Zahlungen mit Izipay",
    subtitle: "Buchen Sie Ihre Touren und Transporte mit vollständiger Sicherheit",
    securePayment: "Sichere Zahlungen verarbeitet von Izipay",
    quote: "Wir sichern Ihre Zahlungen mit Izipay für jede Tour oder Transport. Ihre Sicherheit ist unsere Priorität.",
    quoteAuthor: "- Incatravelperu, Ihre Familie im Tourismus",
    description:
      "Bei Incatravelperu akzeptieren wir alle Kredit- und Debitkarten. Buchen Sie Ihre Touren und Transporte mit vollem Vertrauen. Alle Zahlungen sind durch Izipay geschützt und verschlüsselt.",
    ctaText: "Jetzt buchen",
  },
  pt: {
    title: "Pagamentos Seguros com Izipay",
    subtitle: "Reserve seus passeios e transporte com total segurança",
    securePayment: "Pagamentos seguros processados pela Izipay",
    quote:
      "Garantimos seus pagamentos com Izipay para qualquer passeio ou transporte. Sua segurança é nossa prioridade.",
    quoteAuthor: "- Incatravelperu, Sua família no turismo",
    description:
      "Na Incatravelperu aceitamos todos os cartões de crédito e débito. Reserve seus passeios e transporte com total confiança. Todos os pagamentos são protegidos e criptografados pela Izipay.",
    ctaText: "Reservar agora",
  },
  zh: {
    title: "使用Izipay安全支付",
    subtitle: "安全预订您的旅游和交通",
    securePayment: "由Izipay处理的安全支付",
    quote: "我们使用Izipay为任何旅游或交通确保您的付款安全。您的安全是我们的首要任务。",
    quoteAuthor: "- Incatravelperu，您的旅游家人",
    description: "在Incatravelperu，我们接受所有信用卡和借记卡。放心预订您的旅游和交通。所有付款均由Izipay保护和加密。",
    ctaText: "立即预订",
  },
  ja: {
    title: "Izipayによる安全な支払い",
    subtitle: "ツアーと交通を完全な安全性で予約",
    securePayment: "Izipayによる安全な支払い処理",
    quote: "すべてのツアーまたは交通のためにIzipayで支払いを保護します。お客様の安全が私たちの優先事項です。",
    quoteAuthor: "- Incatravelperu、観光のご家族",
    description:
      "Incatravelperuでは、すべてのクレジットカードとデビットカードを受け付けています。安心してツアーと交通を予約してください。すべての支払いはIzipayによって保護され暗号化されています。",
    ctaText: "今すぐ予約",
  },
  ru: {
    title: "Безопасные Платежи с Izipay",
    subtitle: "Бронируйте туры и транспорт с полной безопасностью",
    securePayment: "Безопасные платежи обрабатываются Izipay",
    quote: "Мы обеспечиваем ваши платежи с Izipay для любого тура или транспорта. Ваша безопасность - наш приоритет.",
    quoteAuthor: "- Incatravelperu, Ваша семья в туризме",
    description:
      "В Incatravelperu мы принимаем все кредитные и дебетовые карты. Бронируйте туры и транспорт с полной уверенностью. Все платежи защищены и зашифрованы Izipay.",
    ctaText: "Забронировать сейчас",
  },
}

export function getPaymentMethodsDictionary(locale: Locale): PaymentMethodsDictionary {
  return paymentMethodsDictionaries[locale] || paymentMethodsDictionaries.es
}
