import type { Locale } from "../config"

export interface TransportsSectionDictionary {
  title: string
  subtitle: string
  description: string
  exploreTransports: string
  reserve: string
  viewDetails: string
  noTransportsAvailable: string
}

const transportsSectionDictionaries: Record<Locale, TransportsSectionDictionary> = {
  es: {
    title: "Nuestros",
    subtitle: "Transportes Disponibles.",
    description:
      "Descubre nuestro servicio de transporte confiable y cómodo. Con vehículos modernos y conductores profesionales, garantizamos una experiencia de viaje segura y agradable hacia tus destinos favoritos.",
    exploreTransports: "EXPLORAR TRANSPORTES",
    reserve: "Reservar",
    viewDetails: "Ver Detalles",
    noTransportsAvailable: "No hay transportes disponibles en este momento",
  },
  en: {
    title: "Our",
    subtitle: "Available Transports.",
    description:
      "Discover our reliable and comfortable transportation service. With modern vehicles and professional drivers, we guarantee a safe and pleasant travel experience to your favorite destinations.",
    exploreTransports: "EXPLORE TRANSPORTS",
    reserve: "Reserve",
    viewDetails: "View Details",
    noTransportsAvailable: "No transports available at the moment",
  },
  fr: {
    title: "Nos",
    subtitle: "Transports Disponibles.",
    description:
      "Découvrez notre service de transport fiable et confortable. Avec des véhicules modernes et des conducteurs professionnels, nous garantissons une expérience de voyage sûre et agréable vers vos destinations préférées.",
    exploreTransports: "EXPLORER LES TRANSPORTS",
    reserve: "Réserver",
    viewDetails: "Voir Détails",
    noTransportsAvailable: "Aucun transport disponible pour le moment",
  },
  it: {
    title: "I Nostri",
    subtitle: "Trasporti Disponibili.",
    description:
      "Scopri il nostro servizio di trasporto affidabile e confortevole. Con veicoli moderni e conducenti professionisti, garantiamo un'esperienza di viaggio sicura e piacevole verso le tue destinazioni preferite.",
    exploreTransports: "ESPLORA TRASPORTI",
    reserve: "Prenota",
    viewDetails: "Vedi Dettagli",
    noTransportsAvailable: "Nessun trasporto disponibile al momento",
  },
  de: {
    title: "Unsere",
    subtitle: "Verfügbare Transporte.",
    description:
      "Entdecken Sie unseren zuverlässigen und komfortablen Transportservice. Mit modernen Fahrzeugen und professionellen Fahrern garantieren wir ein sicheres und angenehmes Reiseerlebnis zu Ihren bevorzugten Zielen.",
    exploreTransports: "TRANSPORTE ERKUNDEN",
    reserve: "Reservieren",
    viewDetails: "Details Anzeigen",
    noTransportsAvailable: "Derzeit keine Transporte verfügbar",
  },
  pt: {
    title: "Nossos",
    subtitle: "Transportes Disponíveis.",
    description:
      "Descubra nosso serviço de transporte confiável e confortável. Com veículos modernos e motoristas profissionais, garantimos uma experiência de viagem segura e agradável para seus destinos favoritos.",
    exploreTransports: "EXPLORAR TRANSPORTES",
    reserve: "Reservar",
    viewDetails: "Ver Detalhes",
    noTransportsAvailable: "Nenhum transporte disponível no momento",
  },
  zh: {
    title: "我们的",
    subtitle: "可用运输。",
    description: "发现我们可靠舒适的运输服务。拥有现代车辆和专业驾驶员，我们保证为您提供安全愉快的旅行体验。",
    exploreTransports: "探索运输",
    reserve: "预订",
    viewDetails: "查看详情",
    noTransportsAvailable: "目前没有可用的运输",
  },
  ja: {
    title: "私たちの",
    subtitle: "利用可能な交通。",
    description:
      "信頼できて快適な輸送サービスを発見してください。最新の車両と専門的なドライバーにより、お気に入りの目的地への安全で快適な旅行体験をお約束します。",
    exploreTransports: "交通を探索",
    reserve: "予約",
    viewDetails: "詳細を見る",
    noTransportsAvailable: "現在利用可能な交通はありません",
  },
  ru: {
    title: "Наши",
    subtitle: "Доступные Транспортные Услуги.",
    description:
      "Откройте для себя наш надежный и удобный сервис доставки. С современными транспортными средствами и профессиональными водителями мы гарантируем безопасное и приятное путешествие в ваши любимые пункты назначения.",
    exploreTransports: "ИССЛЕДОВАТЬ ТРАНСПОРТ",
    reserve: "Забронировать",
    viewDetails: "Посмотреть Детали",
    noTransportsAvailable: "Транспортные услуги недоступны в данный момент",
  },
}

export function getTransportsSectionDictionary(locale: Locale): TransportsSectionDictionary {
  return transportsSectionDictionaries[locale] || transportsSectionDictionaries.es
}
