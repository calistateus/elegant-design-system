import type { CaseStudy } from '@/components/simple/cards/ElegantCaseStudyCard';
export type { CaseStudy };

export interface Specialty {
  title: string;
  description: string;
  iconName: string; // Used for Lucide icon mapping
}

export interface Referral {
  quote: string;
  name: string;
  role: string;
}

export const HOMEPAGE_CONTENT = {
  hero: {
    headline: "I help fintech teams scale product across design and engineering without sacrificing velocity or user trust.",
    subheading: "Previously: USAA, New York Life. Currently open to senior IC and lead roles in fintech or logistics.",
    tags: ["Design systems", "High-growth + regulated environments", "Data-dense flows", "AI-native design"]
  },
  caseStudies: [
    {
      id: "un-mobile",
      tags: ["MOBILE EXPERIENCE", "UNITED NATIONS"],
      title: "Leadership On An AI-First Team: Creating Mobile Experience + Conversation Design Architecture",
      description: "Lead a team of 6 from research to production, rapidly shipping features through mature AI-assisted design pipeline",
      outcome: "Economically empowered Sierra Leoneans in the pilot program – up to doubling monthly incomes",
      imagePath: "/images/case-study-un.svg"
    },
    {
      id: "nyl-calculators",
      tags: ["CALCULATORS", "NEW YORK LIFE"],
      title: "Making Numbers Feel Human: Financial Planning Calculator Audit + Rebuild",
      description: "Audited existing calculators and worked with BI to discover areas of improvement across conversion and accessibility.",
      outcome: "Made complex financial data feel actionable. Increased click through rate and minimized accessibility issues.",
      imagePath: "/images/case-study-nyl.svg"
    },
    {
      id: "usaa-systems",
      tags: ["DESIGN SYSTEMS", "USAA"],
      title: "Zero Breaking Changes: Redesigning Critical Design Systems Infrastructure",
      description: "Refactored one of the most used components in the system to include more interactivity without deprecating",
      outcome: "Qualitatively improved confidence and speed on service calls for representatives using data tables in high-pressure contexts.",
      imagePath: "/images/case-study-usaa.svg"
    }
  ] as CaseStudy[],
  specialties: {
    headline: "My Specialties",
    items: [
      {
        title: "Design Systems",
        description: "I've contributed to design systems at the mature Fortune 100-level and set them up from scratch. I'm most proud of increasing adoption of new components by 15% at USAA by focusing on building relationships with design directors.",
        iconName: "Layers"
      },
      {
        title: "Consumer Tools",
        description: "Whether I am partnering with an international investment firm or the United Nations — one thing that drives me is providing tools that lead users towards empowerment.",
        iconName: "Wrench"
      },
      {
        title: "Regulated Industries",
        description: "My 7+ years of experience spans insurance, consumer femtech, healthcare, and wealth management industries.",
        iconName: "ShieldCheck"
      },
      {
        title: "AI-Enabled Products + Design Environments",
        description: "Whether designing conversation architecture or setting up skills in Claude Code to get the best output — I enjoy problem solving and new tools for creativity.",
        iconName: "Sparkles"
      }
    ] as Specialty[]
  },
  referrals: {
    headline: "Referrals",
    items: [
      {
        quote: "Calista is one of the most professional designers I have ever worked with. Her work from beginning to design to developer handoff is flawless and continually proves why her work should be the gold standard in the industry.",
        name: "Sahand Sadri",
        role: "React Developer"
      },
      {
        quote: "One thing I can assure anyone who is curious about working with Calista is that she is highly adaptive. In the past 5 years I've seen her skills become a game changer for every project she touches.",
        name: "Chelsie Ellingson",
        role: "Founder"
      }
    ] as Referral[]
  },
  playground: {
    headline: "Playground",
    subheading: "Recent Musings + Explorations",
    links: ["Claude code explorations", "Open source design system"],
    buttonText: "Step into my garden —>"
  },
  navigation: {
    top: ["About", "Resume", "Email"],
    bottom: ["LinkedIn", "Blog", "GitHub", "Email"]
  }
};
