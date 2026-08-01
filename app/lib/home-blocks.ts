export type ContentBlock = {
  title: string;
  eyebrow: string;
  period?: string;
  description: string;
  image?: string;
};

const WHITE = "/images/placeholder-white.png";

export const workExperience: ContentBlock[] = [
  {
    eyebrow: "Company: Nutrivaano",
    period: "Present",
    title: "Business Developer",
    description:
      "Building Nutrivaano's beverage line from the ground up, blending consumer research, flavor innovation, product development, branding, and go to market strategy into a launch ready consumer brand.",
    image: WHITE,
  },
  {
    eyebrow: "Company: StahlKitchens",
    period: "till Feb'26",
    title: "Brand & Marketing Apprentice",
    description:
      "Worked at the intersection of content and partnerships, crafting social media strategies, managing creator collaborations, and leading conversations with clients and partner agencies.",
    image: "/images/experience/01-stahl.png",
  },
  {
    eyebrow: "Company: Wondergifts Dubai",
    period: "till Jun'25",
    title: "Content & Marketing Apprentice",
    description:
      "Crafted product stories at scale by writing on brand copy for 1,800+ SKUs, developing SEO driven content for multiple product lines, and supporting a new market launch through competitor and consumer research.",
    image: "/images/experience/02-wondergifts.png",
  },
  {
    eyebrow: "Company: Scarters India",
    period: "till Mar'25",
    title: "Founders Office Apprentice",
    description:
      "Explored customer behavior to design retention strategies, built structured CRM workflows for targeted engagement, and translated global market research into a year long product launch strategy.",
    image: "/images/experience/03-scarters.png",
  },
  {
    eyebrow: "Company: Amour Affairs / Little Wonders",
    period: "till Aug'24",
    title: "Business Development & Client Relations Apprentice",
    description:
      "Built Little Wonders from the ground up through branding, market research, client acquisition, CRM management for 1,200+ clients, and the design of key brand collaterals.",
    image: "/images/experience/04-amour.png",
  },
  {
    eyebrow: "Company: Journeys Explore",
    period: "till Aug'24",
    title: "Social Media and Marketing Apprentice",
    description:
      "Built and managed the brand's content across social media and blogs, while supporting the execution of an annual event attended by over 800 people.",
    image: "/images/experience/05-journeys.png",
  },
];

export const projects: ContentBlock[] = [
  {
    eyebrow: "Year 2",
    title: "#Karo",
    description:
      "Led logistics, sales, community engagement, and event execution, helping bring the initiative to life through cross functional collaboration and on ground coordination.",
    image: WHITE,
  },
  {
    eyebrow: "Year 1",
    title: "Service Design Project",
    description:
      "Explored the end to end customer experience of a local salon through observation, competitor research, and user interviews, identifying opportunities to improve the service journey.",
    image: WHITE,
  },
  {
    eyebrow: "Year 1",
    title: "History Literature Festival",
    description:
      "Led the marketing campaign for my first client project by driving outreach across influencers, educational organizations, and local communities. The campaign reached 30,000+ people and helped bring 2,000+ attendees to the festival.",
    image: WHITE,
  },
  {
    eyebrow: "Year 1",
    title: "Stahl Retail Store",
    description:
      "Designed a prototype for Stahl's first retail experience store, exploring how immersive spaces and thoughtful customer journeys could strengthen brand perception and build lasting customer connections.",
    image: WHITE,
  },
  {
    eyebrow: "Year 1",
    title: "Legacy Project",
    description:
      "Designed and prototyped a toy that embodied Let's Enterprise's core value of problem solving, balancing user experience, manufacturability, and a ₹50 production cost.",
    image: WHITE,
  },
  {
    eyebrow: "Year 1",
    title: "Kickstart (Startup)",
    description:
      "Selected to lead a team in launching Mink, a fruit box startup built from scratch during a two week startup challenge. We applied design thinking to validate the idea, develop the product, build the brand, and execute sales and delivery, ultimately serving 193 customers.",
    image: WHITE,
  },
];
