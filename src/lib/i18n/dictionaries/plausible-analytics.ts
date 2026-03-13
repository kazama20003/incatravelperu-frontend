import type { Locale } from "@/lib/i18n/config"

export interface PlausibleAnalyticsDictionary {
  eyebrow: string
  title: string
  titleLine2: string
  description: string
  card1Title: string
  card1Description: string
  card2Title: string
  card2Description: string
  card3Title: string
  card3Description: string
}

const plausibleAnalyticsDictionaries: Record<Locale, PlausibleAnalyticsDictionary> = {
  es: {
    eyebrow: "Plausible Analytics",
    title: "Cada visita",
    titleLine2: "queda registrada.",
    description:
      "La home ahora carga Plausible con un evento por visita para medir interes real, comparar idiomas y seguir el rendimiento sin depender de cookies invasivas.",
    card1Title: "Visitas limpias",
    card1Description: "Cada carga de la pagina principal envia un evento dedicado para registrar trafico real.",
    card2Title: "Lectura por idioma",
    card2Description: "El evento incluye el locale activo para entender que traduccion atrae mas consultas.",
    card3Title: "Mejora continua",
    card3Description: "Los datos ayudan a optimizar la home y relacionar visitas con reservas por WhatsApp.",
  },
  en: {
    eyebrow: "Plausible Analytics",
    title: "Every visit",
    titleLine2: "is recorded.",
    description:
      "The home page now loads Plausible with one event per visit to measure real interest, compare languages, and track performance without invasive cookies.",
    card1Title: "Clean visits",
    card1Description: "Each home page load sends a dedicated event to capture real traffic.",
    card2Title: "Locale insight",
    card2Description: "The event includes the active locale so you can see which translation attracts more inquiries.",
    card3Title: "Continuous tuning",
    card3Description: "These signals help improve the home page and connect visits with WhatsApp reservations.",
  },
  fr: {
    eyebrow: "Plausible Analytics",
    title: "Chaque visite",
    titleLine2: "est enregistree.",
    description:
      "La page d'accueil charge maintenant Plausible avec un evenement par visite pour mesurer l'interet reel, comparer les langues et suivre les performances sans cookies intrusifs.",
    card1Title: "Visites propres",
    card1Description: "Chaque chargement de la page d'accueil envoie un evenement dedie pour capter le trafic reel.",
    card2Title: "Lecture par langue",
    card2Description: "L'evenement inclut la langue active pour voir quelle traduction genere le plus de demandes.",
    card3Title: "Amelioration continue",
    card3Description: "Ces donnees aident a optimiser la home et a relier les visites aux reservations WhatsApp.",
  },
  it: {
    eyebrow: "Plausible Analytics",
    title: "Ogni visita",
    titleLine2: "viene registrata.",
    description:
      "La home ora carica Plausible con un evento per visita per misurare l'interesse reale, confrontare le lingue e seguire le prestazioni senza cookie invasivi.",
    card1Title: "Visite pulite",
    card1Description: "Ogni caricamento della home invia un evento dedicato per registrare traffico reale.",
    card2Title: "Lettura per lingua",
    card2Description: "L'evento include la lingua attiva per capire quale traduzione porta piu richieste.",
    card3Title: "Ottimizzazione continua",
    card3Description: "Questi dati aiutano a migliorare la home e a collegare le visite alle prenotazioni WhatsApp.",
  },
  de: {
    eyebrow: "Plausible Analytics",
    title: "Jeder Besuch",
    titleLine2: "wird erfasst.",
    description:
      "Die Startseite ladt jetzt Plausible mit einem Ereignis pro Besuch, um echtes Interesse zu messen, Sprachen zu vergleichen und die Leistung ohne invasive Cookies zu verfolgen.",
    card1Title: "Saubere Besuche",
    card1Description: "Jeder Ladevorgang der Startseite sendet ein eigenes Ereignis fur echten Traffic.",
    card2Title: "Sprachvergleich",
    card2Description: "Das Ereignis enthalt die aktive Sprache, damit du siehst, welche Ubersetzung mehr Anfragen bringt.",
    card3Title: "Laufende Optimierung",
    card3Description: "Diese Daten helfen dabei, die Home zu verbessern und Besuche mit WhatsApp-Reservierungen zu verbinden.",
  },
  pt: {
    eyebrow: "Plausible Analytics",
    title: "Cada visita",
    titleLine2: "fica registrada.",
    description:
      "A home agora carrega o Plausible com um evento por visita para medir interesse real, comparar idiomas e acompanhar desempenho sem depender de cookies invasivos.",
    card1Title: "Visitas limpas",
    card1Description: "Cada carregamento da pagina inicial envia um evento dedicado para registrar trafego real.",
    card2Title: "Leitura por idioma",
    card2Description: "O evento inclui o idioma ativo para mostrar qual traducao gera mais consultas.",
    card3Title: "Melhoria continua",
    card3Description: "Esses dados ajudam a otimizar a home e relacionar visitas com reservas via WhatsApp.",
  },
  zh: {
    eyebrow: "Plausible Analytics",
    title: "每一次访问",
    titleLine2: "都会被记录。",
    description:
      "首页现在会加载 Plausible，并在每次访问时发送一个事件，用来衡量真实兴趣、比较语言版本，并在不依赖侵入式 Cookie 的情况下跟踪表现。",
    card1Title: "干净的访问数据",
    card1Description: "首页每次加载都会发送一个独立事件，用来记录真实流量。",
    card2Title: "按语言分析",
    card2Description: "事件会附带当前语言版本，便于查看哪种翻译带来更多咨询。",
    card3Title: "持续优化",
    card3Description: "这些数据有助于改进首页，并把访问趋势与 WhatsApp 预订联系起来。",
  },
  ja: {
    eyebrow: "Plausible Analytics",
    title: "すべての訪問が",
    titleLine2: "記録されます。",
    description:
      "ホームページでは Plausible を読み込み、訪問ごとにイベントを送信して、実際の関心、言語別の反応、そしてパフォーマンスを侵入的な Cookie なしで確認できます。",
    card1Title: "クリーンな訪問計測",
    card1Description: "ホームの読み込みごとに専用イベントを送信し、実際のトラフィックを記録します。",
    card2Title: "言語別の把握",
    card2Description: "イベントには現在の言語が含まれ、どの翻訳がより多くの問い合わせを生むか確認できます。",
    card3Title: "継続的な改善",
    card3Description: "このデータを使ってホームを改善し、訪問と WhatsApp 予約のつながりを追えます。",
  },
  ru: {
    eyebrow: "Plausible Analytics",
    title: "Каждый визит",
    titleLine2: "фиксируется.",
    description:
      "Главная страница теперь загружает Plausible и отправляет событие при каждом визите, чтобы измерять реальный интерес, сравнивать языки и отслеживать эффективность без навязчивых cookie.",
    card1Title: "Чистые визиты",
    card1Description: "Каждая загрузка главной страницы отправляет отдельное событие для учета реального трафика.",
    card2Title: "Аналитика по языкам",
    card2Description: "Событие включает активный язык, чтобы понять, какой перевод приводит больше обращений.",
    card3Title: "Постоянная оптимизация",
    card3Description: "Эти данные помогают улучшать home и связывать визиты с бронированиями через WhatsApp.",
  },
}

export function getPlausibleAnalyticsDictionary(locale: Locale): PlausibleAnalyticsDictionary {
  return plausibleAnalyticsDictionaries[locale]
}
