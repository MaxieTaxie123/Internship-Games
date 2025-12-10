export interface NewsData {
  id: number;
  headline: string;
  authorCompany: string;
  authorImage: string;
  articleImage: string;
  companyName?: string;
  isTrue: boolean;
  description: string;
}

const baseNewsData: NewsData[] = [
  {
    id: 1,
    headline: `Fusie aangekondigd tussen [COMPANY_NAME] en Headtilt`,
    authorCompany: "8rabants Dagblad",
    authorImage: "./fake-news/bd.png",
    articleImage: "./fake-news/hoofdbazen.png",
    isTrue: false,
    description:
      `
      [COMPANY_NAME] gaat fuseren met Headtilt onder de nieuwe naam HoofdBazen om marktpositie te versterken. Het nieuwe bedrijf richt zich op het versterken van hun bestaande projecten. Mensen reageren GESCHOKT.
      `,
  },
  {
    id: 2,
    headline: `Hoofdkantoor [COMPANY_NAME] verhuist naar Hong Kong`,
    authorCompany: "E1ndhovens Dagblad",
    authorImage: "./fake-news/ed.png",
    articleImage: "./fake-news/dirk-hong-kong.jpg",
    isTrue: false,
    description:
      `Het hoofdkantoor van [COMPANY_NAME] verhuist naar Hong Kong vanwege goedkopere werkkrachten en belastingvoordelen. Dit besluit leidt tot zorgen over de impact op de Nederlandse economie.`,
  },
  {
    id: 3,
    headline: "Cybercrime: The Game genomineerd voor nationale prijs",
    authorCompany: "IGN Benelux",
    authorImage: "./fake-news/ign.png",
    articleImage: "./fake-news/cyber_splash.jpeg",
    isTrue: true,
    description:
      `Het educatieve spel Cybercrime: The Game, ontwikkeld door [COMPANY_NAME], is genomineerd voor de 'Best Applied Game' bij de Dutch Game Awards. Het spel leert bedrijven over online veiligheid en de gevaren van cybercrime.`,
  },
  {
    id: 4,
    headline: "CEO verdacht van witwassen — onderzoek gestart",
    authorCompany: "Crime Nieuws NL",
    articleImage: "./fake-news/witwassen.jpeg",
    authorImage: "./fake-news/cnnl.png",
    isTrue: false,
    description:
      "Anonieme bronnen claimen dat de CEO betrokken is bij witwassen via buitenlandse holdings. Het bedrijf ontkent en werkt mee aan onderzoek.",
  },
  {
    id: 5,
    headline: "Gerucht: CEO ‘overleden’ — bedrijf spreekt bericht tegen",
    authorCompany: "Business Inside",
    articleImage: "./fake-news/gravestone.jpeg",
    authorImage: "./fake-news/bi.png",
    isTrue: false,
    description:
      "Op sociale media circuleert een bericht over het overlijden van de CEO. PR bevestigt dat dit onjuist is en dat er geen incident heeft plaatsgevonden.",
  },
  {
    id: 6,
    headline: "CEO ‘gearresteerd’ bij inval? Politie bevestigt geen aanhouding",
    authorCompany: "E1ndhovens Dagblad",
    articleImage: "./fake-news/dirk-arrest.png",
    authorImage: "./fake-news/ed.png",
    isTrue: false,
    description:
      "Een vermeende arrestatievideo blijkt kunstmatig samengesteld. Politie en bedrijf bevestigen dat er geen aanhouding is verricht.",
  },
  {
    id: 7,
    headline: "Bonussen topmanagement stijgen; salarissen medewerkers bevroren",
    authorCompany: "Brabants Dagblad",
    articleImage: "./fake-news/ceo.jpeg",
    authorImage: "./fake-news/bd.png",
    isTrue: true,
    description:
      "Jaarlijkse bonussen voor het executive team nemen toe, terwijl salarissen voor overige medewerkers gelijk blijven. OR vraagt om toelichting.",
  },
  {
    id: 8,
    headline:
      "Schandaal rond directie: geruchten over affaire en financiële onregelmatigheden",
    authorCompany: "Business Inside",
    articleImage: "./fake-news/accusation.png",
    authorImage: "./fake-news/bi.png",
    isTrue: false,
    description:
      "Verschillende roddels doen de ronde over de directie. Interne audit ziet geen harde aanwijzingen; communicatie roept op tot terughoudendheid.",
  },
  {
    id: 9,
    headline: "Overval op hoofdkantoor [COMPANY_NAME]",
    authorCompany: "Stadskrant Veghel",
    authorImage: "./fake-news/sv.png",
    articleImage: "./fake-news/brokenglass.jpeg",
    isTrue: true,
    description:
      "Bij een nachtelijke overval is materiaal buitgemaakt. Hierbij zijn er geen gewonden gevallen.",
  },
  {
    id: 10,
    headline: "Reorganisatie met ontslagen in ondersteunende afdelingen",
    authorCompany: "Eindhovens Dagblad",
    articleImage: "./fake-news/layoff.jpeg",
    authorImage: "./fake-news/ed.png",
    isTrue: true,
    description:
      "Door herstructurering verdwijnen rollen in HR en Operations. Betrokken medewerkers ontvangen begeleiding en transitievergoeding.",
  },
];

export const DEFAULT_COMPANY_NAME = "Uitjesbazen";

export const newsData: NewsData[] = baseNewsData.map((n) => ({
  ...n,
  companyName:
    n.companyName && n.companyName.trim()
      ? n.companyName
      : DEFAULT_COMPANY_NAME,
}));