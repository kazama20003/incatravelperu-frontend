"use client"

import { use, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Clock3,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react"
import { defaultLocale, isValidLocale, type Locale } from "@/lib/i18n/config"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const mediaAssets = {
  heroVideo: "https://res.cloudinary.com/demzflxgq/video/upload/v1774327217/Suyckutambo_Espinar_Cusco_dd2mjz.mp4",
  showcaseVideo: "https://res.cloudinary.com/demzflxgq/video/upload/v1774326261/WhatsApp_Video_2026-03-14_at_9.49.13_PM_vjmgfq.mp4",
  routeVideo: "https://res.cloudinary.com/demzflxgq/video/upload/v1774326261/WhatsApp_Video_2026-03-20_at_12.21.07_PM_nfc6gs.mp4",
  detailVideo: "https://res.cloudinary.com/demzflxgq/video/upload/v1774326359/WhatsApp_Video_2026-03-14_at_9.49.13_PM_wxcqbk.mp4",
  imageOne: "https://res.cloudinary.com/demzflxgq/image/upload/v1774326260/WhatsApp_Image_2026-03-14_at_9.49.00_PM_2_g7v0h3.jpg",
  imageTwo: "https://res.cloudinary.com/demzflxgq/image/upload/v1774326260/WhatsApp_Image_2026-03-14_at_9.49.00_PM_1_d4w7xn.jpg",
}

const contentByLocale = {
  es: {
    eyebrow: "Transportes privados | Cabanaconde, Cusco y Puno",
    title: ["MOVILIDAD", "PRIVADA", "CON ESTILO"],
    description:
      "Coordinamos traslados privados para viajeros que buscan un servicio directo, cómodo y flexible entre Colca, Cabanaconde, Cusco y Puno.",
    primaryCta: "Reservar por WhatsApp",
    secondaryCta: "Ver transportes",
    benefitOne: "Salidas privadas y directas",
    benefitTwo: "Rutas viceversa disponibles",
    routesLabel: "Servicio privado",
    privateBadge: "Privado",
    flexibleBadge: "Flexible",
    showcaseLabel: "Galeria",
    benefitThree: "Atención rápida por WhatsApp",
    routesTitle: "Rutas más solicitadas",
    routesSubtitle: "Diseñado con la misma estética editorial de la sección de transportes, pero enfocado en un servicio más premium y personalizado.",
    galleryTitle: "Servicio real, unidades reales",
    imageOneAlt: "Servicio de transporte privado",
    imageTwoAlt: "Detalle del viaje",
    whyUsLabel: "Por que nosotros",
    gallerySubtitle: "Tus recursos ahora forman una página propia con videos, escenas de ruta y una presentación más seria del servicio privado.",
    whyTitle: "Por qué elegir este servicio",
    whyItems: [
      "Recojo coordinado según tu ruta y horario",
      "Ideal para viajes Colca - Cusco - Puno sin complicaciones",
      "Atención directa para grupos pequeños, parejas o familias",
    ],
    finalTitle: "Coordina tu transporte privado",
    finalBadge: "Transporte privado",
    whatsappMessage: "Hola, me interesa coordinar un transporte privado.",
    finalText: "Escríbenos por WhatsApp y te ayudamos a definir la mejor salida según tu punto de inicio, destino y número de pasajeros.",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "Ruta privada", note: "Ideal después del trek en Colca." },
      { title: "Cabanaconde - Puno", meta: "Ruta privada", note: "Conexión cómoda hacia el lago Titicaca." },
      { title: "Cusco - Cabanaconde", meta: "Viceversa", note: "Traslado directo para iniciar tu experiencia." },
      { title: "Puno - Cabanaconde", meta: "Viceversa", note: "Servicio flexible según horario y grupo." },
    ],
  },
  en: {
    eyebrow: "Private transport | Cabanaconde, Cusco and Puno",
    title: ["PRIVATE", "TRAVEL", "IN STYLE"],
    description:
      "We arrange private transfers for travelers looking for a direct, comfortable and flexible service between Colca, Cabanaconde, Cusco and Puno.",
    primaryCta: "Book on WhatsApp",
    secondaryCta: "View transports",
    benefitOne: "Direct private departures",
    benefitTwo: "Round-trip routes available",
    benefitThree: "Fast WhatsApp support",
    routesLabel: "Private service",
    routesTitle: "Most requested routes",
    routesSubtitle:
      "Built with the same editorial feel as the transports section, but focused on a more premium and personalized service.",
    galleryTitle: "Real service, real units",
    privateBadge: "Private",
    flexibleBadge: "Flexible",
    showcaseLabel: "Showcase",
    gallerySubtitle:
      "Your assets now live in their own page with route videos, real scenes and a stronger presentation for private service.",
    imageOneAlt: "Private transport service",
    imageTwoAlt: "Travel detail",
    whyUsLabel: "Why us",
    whyTitle: "Why choose this service",
    whyItems: [
      "Pickup coordinated according to your route and schedule",
      "Ideal for Colca - Cusco - Puno trips without extra hassle",
      "Direct support for small groups, couples or families",
    ],
    finalTitle: "Arrange your private transport",
    finalBadge: "Private transport",
    whatsappMessage: "Hello, I would like information about your private transport service.",
    finalText:
      "Send us a WhatsApp message and we will help you choose the best departure based on your origin, destination and group size.",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "Private route", note: "Ideal after your Colca trek." },
      { title: "Cabanaconde - Puno", meta: "Private route", note: "Comfortable connection toward Lake Titicaca." },
      { title: "Cusco - Cabanaconde", meta: "Reverse route", note: "Direct transfer to start your trip." },
      { title: "Puno - Cabanaconde", meta: "Reverse route", note: "Flexible service based on your group and time." },
    ],
  },
  fr: {
    eyebrow: "Transports prives | Cabanaconde, Cusco et Puno",
    title: ["MOBILITE", "PRIVEE", "AVEC STYLE"],
    description:
      "Nous organisons des transferts prives pour les voyageurs qui recherchent un service direct, confortable et flexible entre Colca, Cabanaconde, Cusco et Puno.",
    primaryCta: "Reserver sur WhatsApp",
    secondaryCta: "Voir les transports",
    benefitOne: "Departs prives et directs",
    benefitTwo: "Routes aller-retour disponibles",
    benefitThree: "Reponse rapide sur WhatsApp",
    routesLabel: "Service prive",
    routesTitle: "Itineraires les plus demandes",
    routesSubtitle:
      "Concu avec la meme approche editoriale que la section transports, mais axe sur un service plus premium et personnalise.",
    privateBadge: "Prive",
    flexibleBadge: "Flexible",
    showcaseLabel: "Galerie",
    galleryTitle: "Service reel, vehicules reels",
    gallerySubtitle:
      "Vos ressources ont maintenant leur propre page avec des videos de route, de vraies scenes et une presentation plus forte du service prive.",
    imageOneAlt: "Service de transport prive",
    imageTwoAlt: "Detail du voyage",
    whyUsLabel: "Pourquoi nous",
    whyTitle: "Pourquoi choisir ce service",
    whyItems: [
      "Prise en charge coordonnee selon votre itineraire et votre horaire",
      "Ideal pour les trajets Colca - Cusco - Puno sans complication",
      "Attention directe pour petits groupes, couples ou familles",
    ],
    finalTitle: "Organisez votre transport prive",
    finalBadge: "Transport prive",
    whatsappMessage: "Bonjour, je souhaite organiser un transport prive.",
    finalText:
      "Ecrivez-nous sur WhatsApp et nous vous aiderons a definir le meilleur depart selon votre point de depart, votre destination et le nombre de passagers.",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "Route privee", note: "Ideal apres votre trek dans le Colca." },
      { title: "Cabanaconde - Puno", meta: "Route privee", note: "Connexion confortable vers le lac Titicaca." },
      { title: "Cusco - Cabanaconde", meta: "Trajet retour", note: "Transfert direct pour commencer votre voyage." },
      { title: "Puno - Cabanaconde", meta: "Trajet retour", note: "Service flexible selon votre groupe et votre horaire." },
    ],
  },
  it: {
    eyebrow: "Trasporti privati | Cabanaconde, Cusco e Puno",
    title: ["MOBILITA", "PRIVATA", "CON STILE"],
    description:
      "Organizziamo trasferimenti privati per viaggiatori che cercano un servizio diretto, comodo e flessibile tra Colca, Cabanaconde, Cusco e Puno.",
    primaryCta: "Prenota su WhatsApp",
    secondaryCta: "Vedi trasporti",
    benefitOne: "Partenze private e dirette",
    benefitTwo: "Percorsi andata e ritorno disponibili",
    benefitThree: "Assistenza rapida su WhatsApp",
    routesLabel: "Servizio privato",
    routesTitle: "Percorsi piu richiesti",
    routesSubtitle:
      "Progettato con la stessa estetica editoriale della sezione trasporti, ma pensato per un servizio piu premium e personalizzato.",
    privateBadge: "Privato",
    flexibleBadge: "Flessibile",
    showcaseLabel: "Galleria",
    galleryTitle: "Servizio reale, unita reali",
    gallerySubtitle:
      "Le tue risorse ora vivono in una pagina propria con video di percorso, scene reali e una presentazione piu forte del servizio privato.",
    imageOneAlt: "Servizio di trasporto privato",
    imageTwoAlt: "Dettaglio del viaggio",
    whyUsLabel: "Perche noi",
    whyTitle: "Perche scegliere questo servizio",
    whyItems: [
      "Prelievo coordinato in base al tuo percorso e orario",
      "Ideale per viaggi Colca - Cusco - Puno senza complicazioni",
      "Assistenza diretta per piccoli gruppi, coppie o famiglie",
    ],
    finalTitle: "Organizza il tuo trasporto privato",
    finalBadge: "Trasporto privato",
    whatsappMessage: "Ciao, vorrei organizzare un trasporto privato.",
    finalText:
      "Scrivici su WhatsApp e ti aiuteremo a scegliere la partenza migliore in base al punto di origine, alla destinazione e al numero di passeggeri.",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "Percorso privato", note: "Ideale dopo il tuo trekking nel Colca." },
      { title: "Cabanaconde - Puno", meta: "Percorso privato", note: "Collegamento comodo verso il lago Titicaca." },
      { title: "Cusco - Cabanaconde", meta: "Percorso inverso", note: "Trasferimento diretto per iniziare il viaggio." },
      { title: "Puno - Cabanaconde", meta: "Percorso inverso", note: "Servizio flessibile in base al gruppo e all'orario." },
    ],
  },
  de: {
    eyebrow: "Private Transfers | Cabanaconde, Cusco und Puno",
    title: ["PRIVATE", "FAHRTEN", "MIT STIL"],
    description:
      "Wir organisieren private Transfers fur Reisende, die einen direkten, komfortablen und flexiblen Service zwischen Colca, Cabanaconde, Cusco und Puno suchen.",
    primaryCta: "Per WhatsApp buchen",
    secondaryCta: "Transporte ansehen",
    benefitOne: "Direkte private Abfahrten",
    benefitTwo: "Hin- und Ruckfahrten verfugbar",
    benefitThree: "Schnelle WhatsApp-Betreuung",
    routesLabel: "Privater Service",
    routesTitle: "Meistgefragte Routen",
    routesSubtitle:
      "Mit derselben editoriellen Sprache wie der Transportbereich gestaltet, aber mit Fokus auf einen hochwertigeren und personlicheren Service.",
    privateBadge: "Privat",
    flexibleBadge: "Flexibel",
    showcaseLabel: "Galerie",
    galleryTitle: "Echter Service, echte Fahrzeuge",
    gallerySubtitle:
      "Ihre Inhalte haben jetzt eine eigene Seite mit Routenvideos, echten Szenen und einer starkeren Darstellung des privaten Services.",
    imageOneAlt: "Privater Transportservice",
    imageTwoAlt: "Reisedetail",
    whyUsLabel: "Warum wir",
    whyTitle: "Warum diesen Service wahlen",
    whyItems: [
      "Abholung passend zu Ihrer Route und Uhrzeit koordiniert",
      "Ideal fur Colca - Cusco - Puno Fahrten ohne zusatzlichen Aufwand",
      "Direkte Betreuung fur kleine Gruppen, Paare oder Familien",
    ],
    finalTitle: "Organisieren Sie Ihren privaten Transfer",
    finalBadge: "Privater Transfer",
    whatsappMessage: "Hallo, ich mochte einen privaten Transfer anfragen.",
    finalText:
      "Schreiben Sie uns auf WhatsApp und wir helfen Ihnen, die beste Abfahrt nach Startpunkt, Ziel und Gruppengrosse zu wahlen.",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "Private Route", note: "Ideal nach Ihrem Colca-Trek." },
      { title: "Cabanaconde - Puno", meta: "Private Route", note: "Komfortable Verbindung zum Titicacasee." },
      { title: "Cusco - Cabanaconde", meta: "Ruckroute", note: "Direkter Transfer zum Start Ihrer Reise." },
      { title: "Puno - Cabanaconde", meta: "Ruckroute", note: "Flexibler Service je nach Gruppe und Uhrzeit." },
    ],
  },
  pt: {
    eyebrow: "Transportes privados | Cabanaconde, Cusco e Puno",
    title: ["MOBILIDADE", "PRIVADA", "COM ESTILO"],
    description:
      "Coordenamos transportes privados para viajantes que buscam um servico direto, confortavel e flexivel entre Colca, Cabanaconde, Cusco e Puno.",
    primaryCta: "Reservar no WhatsApp",
    secondaryCta: "Ver transportes",
    benefitOne: "Saidas privadas e diretas",
    benefitTwo: "Rotas de ida e volta disponiveis",
    benefitThree: "Atendimento rapido pelo WhatsApp",
    routesLabel: "Servico privado",
    routesTitle: "Rotas mais solicitadas",
    routesSubtitle:
      "Desenhado com a mesma linguagem editorial da secao de transportes, mas focado em um servico mais premium e personalizado.",
    privateBadge: "Privado",
    flexibleBadge: "Flexivel",
    showcaseLabel: "Galeria",
    galleryTitle: "Servico real, unidades reais",
    gallerySubtitle:
      "Seus recursos agora vivem em uma pagina propria com videos de rota, cenas reais e uma apresentacao mais forte do servico privado.",
    imageOneAlt: "Servico de transporte privado",
    imageTwoAlt: "Detalhe da viagem",
    whyUsLabel: "Por que nos",
    whyTitle: "Por que escolher este servico",
    whyItems: [
      "Coleta coordenada de acordo com sua rota e horario",
      "Ideal para viagens Colca - Cusco - Puno sem complicacoes",
      "Atendimento direto para grupos pequenos, casais ou familias",
    ],
    finalTitle: "Organize seu transporte privado",
    finalBadge: "Transporte privado",
    whatsappMessage: "Ola, gostaria de organizar um transporte privado.",
    finalText:
      "Escreva para nos no WhatsApp e vamos ajudar voce a definir a melhor saida segundo sua origem, destino e numero de passageiros.",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "Rota privada", note: "Ideal depois do seu trekking no Colca." },
      { title: "Cabanaconde - Puno", meta: "Rota privada", note: "Conexao confortavel em direcao ao lago Titicaca." },
      { title: "Cusco - Cabanaconde", meta: "Rota inversa", note: "Transfer direto para comecar sua viagem." },
      { title: "Puno - Cabanaconde", meta: "Rota inversa", note: "Servico flexivel conforme o grupo e o horario." },
    ],
  },
  zh: {
    eyebrow: "私人交通 | Cabanaconde、Cusco 和 Puno",
    title: ["私人", "舒适", "出行"],
    description:
      "我们为需要直达、舒适且灵活服务的旅客安排私人接送，覆盖 Colca、Cabanaconde、Cusco 和 Puno 之间的路线。",
    primaryCta: "通过 WhatsApp 预订",
    secondaryCta: "查看交通",
    benefitOne: "私人直达出发",
    benefitTwo: "提供往返路线",
    benefitThree: "WhatsApp 快速回复",
    routesLabel: "私人服务",
    routesTitle: "最受欢迎路线",
    routesSubtitle: "延续 transports 页面同样的编辑感设计，但更聚焦高端且更个性化的私人服务。",
    privateBadge: "私人",
    flexibleBadge: "灵活",
    showcaseLabel: "展示",
    galleryTitle: "真实服务，真实车辆",
    gallerySubtitle: "这些素材现在集中在一个独立页面中，包含路线视频、真实场景和更完整的私人服务展示。",
    imageOneAlt: "私人交通服务",
    imageTwoAlt: "旅程细节",
    whyUsLabel: "为什么选择我们",
    whyTitle: "为什么选择这项服务",
    whyItems: [
      "根据您的路线和时间协调接送",
      "适合 Colca - Cusco - Puno 行程，省去额外麻烦",
      "为小团体、情侣或家庭提供直接沟通",
    ],
    finalTitle: "安排您的私人交通",
    finalBadge: "私人交通",
    whatsappMessage: "您好，我想协调一个私人交通服务。",
    finalText: "通过 WhatsApp 联系我们，我们会根据您的出发地、目的地和人数帮您安排最合适的班次。",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "私人路线", note: "适合在 Colca 徒步后继续前往。" },
      { title: "Cabanaconde - Puno", meta: "私人路线", note: "舒适连接前往的的喀喀湖方向。" },
      { title: "Cusco - Cabanaconde", meta: "反向路线", note: "直达接送，方便开启您的旅程。" },
      { title: "Puno - Cabanaconde", meta: "反向路线", note: "可根据人数和时间灵活安排。" },
    ],
  },
  ja: {
    eyebrow: "専用送迎 | Cabanaconde、Cusco、Puno",
    title: ["プライベート", "送迎を", "上質に"],
    description:
      "Colca、Cabanaconde、Cusco、Puno 間で、直行・快適・柔軟なサービスを求める旅行者向けに専用送迎を手配します。",
    primaryCta: "WhatsAppで予約",
    secondaryCta: "交通を見る",
    benefitOne: "専用で直行出発",
    benefitTwo: "往復ルートに対応",
    benefitThree: "WhatsAppで迅速対応",
    routesLabel: "専用サービス",
    routesTitle: "人気のルート",
    routesSubtitle: "transports セクションと同じ編集的な雰囲気を保ちながら、より上質で個別対応の専用サービスに焦点を当てています。",
    privateBadge: "専用",
    flexibleBadge: "柔軟",
    showcaseLabel: "ギャラリー",
    galleryTitle: "実際のサービス、実際の車両",
    gallerySubtitle: "これらの素材を、ルート動画や実際のシーンとともに、専用サービス向けの独立ページにまとめました。",
    imageOneAlt: "専用送迎サービス",
    imageTwoAlt: "旅のディテール",
    whyUsLabel: "私たちを選ぶ理由",
    whyTitle: "このサービスを選ぶ理由",
    whyItems: [
      "ルートと時間に合わせて送迎を調整",
      "Colca - Cusco - Puno の移動を余計な手間なく実現",
      "少人数グループ、カップル、家族に直接対応",
    ],
    finalTitle: "専用送迎を手配する",
    finalBadge: "専用送迎",
    whatsappMessage: "こんにちは。専用送迎について相談したいです。",
    finalText: "WhatsApp でご連絡いただければ、出発地、目的地、人数に応じて最適な出発時間をご案内します。",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "専用ルート", note: "Colca トレッキング後の移動に最適です。" },
      { title: "Cabanaconde - Puno", meta: "専用ルート", note: "チチカカ湖方面へ快適に接続します。" },
      { title: "Cusco - Cabanaconde", meta: "逆ルート", note: "旅を始めるための直行送迎です。" },
      { title: "Puno - Cabanaconde", meta: "逆ルート", note: "グループと時間に応じて柔軟に対応します。" },
    ],
  },
  ru: {
    eyebrow: "Частный трансфер | Cabanaconde, Cusco и Puno",
    title: ["ЧАСТНЫЕ", "ПОЕЗДКИ", "СО СТИЛЕМ"],
    description:
      "Мы организуем частные трансферы для путешественников, которым нужен прямой, комфортный и гибкий сервис между Colca, Cabanaconde, Cusco и Puno.",
    primaryCta: "Забронировать в WhatsApp",
    secondaryCta: "Смотреть транспорт",
    benefitOne: "Прямые частные выезды",
    benefitTwo: "Доступны маршруты туда и обратно",
    benefitThree: "Быстрая поддержка в WhatsApp",
    routesLabel: "Частный сервис",
    routesTitle: "Самые востребованные маршруты",
    routesSubtitle:
      "Страница выдержана в той же редакционной эстетике, что и раздел transports, но сфокусирована на более премиальном и персональном сервисе.",
    privateBadge: "Частный",
    flexibleBadge: "Гибкий",
    showcaseLabel: "Галерея",
    galleryTitle: "Реальный сервис, реальные машины",
    gallerySubtitle:
      "Теперь ваши материалы собраны на отдельной странице с видео маршрутов, реальными сценами и более сильной подачей частного сервиса.",
    imageOneAlt: "Сервис частного трансфера",
    imageTwoAlt: "Деталь поездки",
    whyUsLabel: "Почему мы",
    whyTitle: "Почему стоит выбрать этот сервис",
    whyItems: [
      "Подача автомобиля координируется по вашему маршруту и времени",
      "Идеально для поездок Colca - Cusco - Puno без лишних сложностей",
      "Прямая поддержка для небольших групп, пар и семей",
    ],
    finalTitle: "Организуйте ваш частный трансфер",
    finalBadge: "Частный трансфер",
    whatsappMessage: "Здравствуйте, меня интересует частный трансфер.",
    finalText:
      "Напишите нам в WhatsApp, и мы поможем выбрать лучший выезд с учетом точки отправления, пункта назначения и количества пассажиров.",
    routes: [
      { title: "Cabanaconde - Cusco", meta: "Частный маршрут", note: "Идеально после вашего трека в Colca." },
      { title: "Cabanaconde - Puno", meta: "Частный маршрут", note: "Комфортное соединение в сторону озера Титикака." },
      { title: "Cusco - Cabanaconde", meta: "Обратный маршрут", note: "Прямой трансфер для начала вашего путешествия." },
      { title: "Puno - Cabanaconde", meta: "Обратный маршрут", note: "Гибкий сервис в зависимости от группы и времени." },
    ],
  },
} as const

export default function PrivateTransportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = use(params)
  const locale: Locale = isValidLocale(localeParam) ? localeParam : defaultLocale
  const content = contentByLocale[locale]

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-hero-line]"),
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power4.out", delay: 0.18 }
      )

      gsap.fromTo(
        root.querySelectorAll("[data-hero-copy]"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.42 }
      )

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              toggleActions: "play none none none",
            },
          }
        )
      })

      const heroVideo = root.querySelector("[data-hero-video]")
      if (heroVideo) {
        gsap.to(heroVideo, {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroVideo,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  const openWhatsApp = () => {
    window.open(`https://wa.me/51959748730?text=${encodeURIComponent(content.whatsappMessage)}`, "_blank")
  }

  return (
    <main ref={rootRef} className="min-h-screen bg-[#f4efe7] text-[#141414]">
      <section className="relative min-h-[100svh] overflow-hidden bg-black">
        <div data-hero-video className="absolute inset-0">
          <video className="h-full w-full object-cover" src={mediaAssets.heroVideo} autoPlay muted loop playsInline />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.76)_0%,rgba(0,0,0,0.42)_42%,rgba(0,0,0,0.24)_100%)]" />

        <div className="relative z-10 flex min-h-[100svh] items-end px-4 pb-10 pt-[10rem] sm:px-6 md:px-8 lg:px-10 xl:px-14">
          <div className="grid w-full items-end gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.8fr)]">
            <div className="max-w-[1080px]">
              <p data-hero-copy className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-white/78 sm:text-sm">
                {content.eyebrow}
              </p>

              <h1 className="text-[3.1rem] font-black uppercase leading-[0.84] tracking-[-0.065em] text-white sm:text-[4.6rem] md:text-[5.8rem] lg:text-[6.8rem] xl:text-[7.6rem]">
                {content.title.map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span data-hero-line className="block">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="max-w-xl lg:justify-self-end">
              <p data-hero-copy className="text-base font-semibold leading-relaxed text-white/92 sm:text-lg md:text-[1.35rem]">
                {content.description}
              </p>

              <div data-hero-copy className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={openWhatsApp}
                  className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[1.1rem] bg-neon-orange px-6 py-4 text-sm font-black uppercase tracking-[0.03em] text-black transition-colors hover:bg-[#ff8c26] sm:text-base"
                >
                  <MessageCircle className="h-5 w-5" />
                  {content.primaryCta}
                </button>

                <Link
                  href={`/${locale}/transports`}
                  className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[1.1rem] bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.03em] text-black transition-colors hover:bg-white/85 sm:text-base"
                >
                  {content.secondaryCta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f4efe7] px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {[content.benefitOne, content.benefitTwo, content.benefitThree].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-black sm:text-base">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 bg-white">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div data-reveal>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-neon-orange">{content.routesLabel}</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {content.routesTitle}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-black/70">{content.routesSubtitle}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.routes.map((route) => (
              <article
                key={route.title}
                data-reveal
                className="rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-neon-orange px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-black">
                    {route.meta}
                  </span>
                  <CarFront className="h-5 w-5 text-black/45" />
                </div>
                <h3 className="mt-5 text-2xl font-black uppercase tracking-[-0.03em]">{route.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/70">{route.note}</p>
                <div className="mt-5 flex items-center gap-5 text-[12px] font-black uppercase tracking-[0.12em] text-black/55">
                  <span className="inline-flex items-center gap-2">
                    <MapPinned className="h-4 w-4" />
                    {content.privateBadge}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {content.flexibleBadge}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-4 py-18 text-white sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div data-reveal>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-neon-orange">{content.showcaseLabel}</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {content.galleryTitle}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{content.gallerySubtitle}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div data-reveal className="overflow-hidden rounded-[2rem]">
              <video className="h-full min-h-[28rem] w-full object-cover" src={mediaAssets.showcaseVideo} autoPlay muted loop playsInline />
            </div>
            <div className="grid gap-4">
              <div data-reveal className="relative min-h-[13.5rem] overflow-hidden rounded-[1.75rem]">
                <Image src={mediaAssets.imageOne} alt={content.imageOneAlt} fill className="object-cover" />
              </div>
              <div data-reveal className="relative min-h-[13.5rem] overflow-hidden rounded-[1.75rem]">
                <Image src={mediaAssets.imageTwo} alt={content.imageTwoAlt} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div data-reveal className="overflow-hidden rounded-[1.75rem]">
            <video className="h-full min-h-[18rem] w-full object-cover" src={mediaAssets.routeVideo} autoPlay muted loop playsInline />
          </div>
          <div data-reveal className="overflow-hidden rounded-[1.75rem]">
            <video className="h-full min-h-[18rem] w-full object-cover" src={mediaAssets.detailVideo} autoPlay muted loop playsInline />
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div data-reveal>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-neon-orange">{content.whyUsLabel}</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {content.whyTitle}
            </h2>
          </div>

          <div className="grid gap-4">
            {content.whyItems.map((item) => (
              <div
                key={item}
                data-reveal
                className="flex items-start gap-4 rounded-[1.5rem] border border-black/10 bg-white px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)]"
              >
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neon-orange text-black">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <p className="text-base font-semibold leading-7 text-black/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-18 text-white sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div
          data-reveal
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,0,0.18),rgba(255,255,255,0.04))] px-6 py-8 sm:px-8 md:px-10 md:py-10"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-neon-orange">
                <Star className="h-4 w-4" />
                {content.finalBadge}
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-4xl md:text-5xl">
                {content.finalTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/74">{content.finalText}</p>
            </div>

            <button
              onClick={openWhatsApp}
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[1.1rem] bg-neon-orange px-6 py-4 text-sm font-black uppercase tracking-[0.03em] text-black transition-colors hover:bg-[#ff8c26] sm:text-base"
            >
              <MessageCircle className="h-5 w-5" />
              {content.primaryCta}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
