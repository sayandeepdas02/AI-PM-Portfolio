export type BlogCategory = "AI" | "Product" | "GTM" | "Recruitment";

export interface BlogSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogBody {
  intro: string;
  sections: BlogSection[];
  takeaway: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  publishedAt: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  readTime: string;
  featured: boolean;
  coverStyle: string;
  body: BlogBody;
}

const POSTS_PER_PAGE = 9;

const coverStyles = [
  "grid-blue",
  "signal-black",
  "paper-sky",
  "ember-orange",
  "mint-lines",
  "cobalt-graph",
] as const;

const categoryAngles: Record<BlogCategory, string> = {
  AI: "AI visibility, product distribution, and workflow leverage",
  Product: "product judgment, prioritization, and scaling systems",
  GTM: "founder-led distribution, positioning, and repeatable revenue",
  Recruitment: "early-team hiring, scorecards, and operating discipline",
};

const categoryActionBullets: Record<BlogCategory, string[]> = {
  AI: [
    "Document the exact founder questions this piece should answer in search, AI Overviews, and ChatGPT-style surfaces.",
    "Turn the article into reusable assets such as a checklist, prompt pack, and internal GTM memo.",
    "Add examples from live startup workflows so the advice feels earned rather than theoretical.",
  ],
  Product: [
    "Define the decision this article helps a founder make in the next two weeks.",
    "Anchor every framework to one metric, one customer signal, and one team constraint.",
    "End each section with an operational move that can be tried before the next sprint ends.",
  ],
  GTM: [
    "Translate strategy into one message, one distribution bet, and one measurable sales motion.",
    "Use founder language, not marketing abstractions, so the advice feels immediately executable.",
    "Connect product feedback and revenue signals instead of treating GTM as a separate function.",
  ],
  Recruitment: [
    "Describe the hiring mistake this post helps avoid before a founder adds headcount.",
    "Give examples of what strong evidence looks like in interviews, scorecards, and references.",
    "Tie every recommendation back to speed, ownership, and the operating cadence of small teams.",
  ],
};

const categorySectionTitles: Record<BlogCategory, string[]> = {
  AI: [
    "Why this matters now",
    "Where founders usually misread the signal",
    "How I would structure the first pass",
    "Tactical examples from startup execution",
    "What to measure next",
  ],
  Product: [
    "The operating context",
    "The mistake that creates drag",
    "A practical framework",
    "How this plays out in the room",
    "Signals worth tracking",
  ],
  GTM: [
    "What changed in the market",
    "The common GTM failure mode",
    "A lean operating model",
    "Examples that sharpen the playbook",
    "How to know it is working",
  ],
  Recruitment: [
    "Why the hiring decision is leverage",
    "The trap most founders walk into",
    "A stronger hiring approach",
    "What good execution looks like",
    "The review loop to keep",
  ],
};

const categoryParagraphs: Record<BlogCategory, (title: string, excerpt: string) => string[]> = {
  AI: (title, excerpt) => [
    `${title} is one of those founder topics where the market is moving faster than the playbook. ${excerpt} This placeholder draft frames the piece the way I would for operators working inside YC-backed and venture-scale AI companies.`,
    `In practice, the winning move is rarely “do more AI.” It is to define the customer question, structure the information architecture, and then decide where AI should accelerate research, distribution, or workflow depth.`,
    `That is the lens behind this article: use AI as an execution amplifier, not as decoration. The final version should include real examples, screenshots, and numbers once the production draft is ready.`,
  ],
  Product: (title, excerpt) => [
    `${title} sits at the center of early-stage product execution because founders are always trading speed against certainty. ${excerpt} This draft is written to sound like a working operator memo rather than a generic PM article.`,
    `The useful framing is not “what is the perfect roadmap?” but “what is the minimum sequence of decisions that compounds learning without slowing the team down?” That is where product judgment becomes visible.`,
    `When this article is fully written, it should include concrete startup examples, before-and-after decisions, and the signals that changed the recommendation.`,
  ],
  GTM: (title, excerpt) => [
    `${title} matters because GTM is no longer a downstream function for startup teams. ${excerpt} In the companies I have worked with, distribution quality often changes faster than the product surface.`,
    `The teams that win usually connect messaging, sales conversations, onboarding friction, and product feedback into one operating loop. That makes GTM a design problem as much as a revenue problem.`,
    `This placeholder version is intentionally practical: it should later be expanded with actual examples from founder selling, AI-assisted outbound, and positioning tests.`,
  ],
  Recruitment: (title, excerpt) => [
    `${title} is really a question about operating quality. ${excerpt} Hiring mistakes in small teams are expensive because they slow decisions, dilute standards, and create hidden management work.`,
    `A useful recruiting article should help founders define evidence before they enter the interview loop. The goal is not just to hire someone good, but to hire someone who strengthens the team’s decision velocity.`,
    `The final article should later include interview prompts, scorecard examples, and examples of when a founder should delay a hire instead of forcing one.`,
  ],
};

const seedPosts = [
  {
    category: "AI",
    title: "What Founders Need to Know About AEO in 2026",
    excerpt:
      "A working primer on answer engine optimization, AI citations, and how startups should adapt content strategy when search is increasingly mediated by AI answers.",
  },
  {
    category: "AI",
    title: "How to Make Your Startup Show Up in AI Answers",
    excerpt:
      "A practical draft on turning category pages, blog posts, and proof assets into content that large answer engines can quote and recommend.",
  },
  {
    category: "AI",
    title: "SEO vs AEO vs GEO: What Actually Matters for Early-Stage Startups",
    excerpt:
      "A founder-friendly comparison of classic search, AI answer visibility, and generative discovery so teams know where to invest first.",
  },
  {
    category: "AI",
    title: "How I’d Structure an AI Content Engine for a YC Startup",
    excerpt:
      "A lightweight editorial and distribution system for venture-backed teams that need content to feed demand generation, search, and product education at once.",
  },
  {
    category: "AI",
    title: "When AI Features Are a Moat and When They’re Just Table Stakes",
    excerpt:
      "A strategic note on separating real product defensibility from commodity AI packaging in crowded software categories.",
  },
  {
    category: "AI",
    title: "The Right Way to Add AI to a B2B SaaS Product",
    excerpt:
      "A step-by-step draft on choosing where AI belongs in the workflow, what to instrument, and how to avoid bolting on features customers do not trust.",
  },
  {
    category: "AI",
    title: "AI Workflow Automation for Lean GTM Teams",
    excerpt:
      "An operator-focused post on using AI to accelerate research, outbound preparation, post-call notes, and pipeline hygiene without adding headcount too early.",
  },
  {
    category: "AI",
    title: "How AI Changes User Research for Product Teams",
    excerpt:
      "A draft on combining interviews, transcript analysis, and structured synthesis so research becomes faster without becoming shallow.",
  },
  {
    category: "AI",
    title: "The AI Visibility Stack Every Founder Should Understand",
    excerpt:
      "A model for how brand mentions, pages, structured data, proof assets, and content clusters shape visibility across AI-first discovery surfaces.",
  },
  {
    category: "Product",
    title: "How to Find Product-Market Fit Before You Burn the Team",
    excerpt:
      "A practical memo on narrowing scope, sharpening the ICP, and avoiding the kind of roadmap sprawl that hides weak demand.",
  },
  {
    category: "Product",
    title: "A PM’s Framework for Prioritizing Features in Early-Stage Startups",
    excerpt:
      "A prioritization draft built around learning velocity, revenue relevance, and user pain rather than weighted spreadsheets that no one trusts.",
  },
  {
    category: "Product",
    title: "What to Build First When You Only Have 90 Days of Runway",
    excerpt:
      "A field-tested view of sequencing product work when the company needs sharper proof of value before it needs polish.",
  },
  {
    category: "Product",
    title: "How to Design Product Loops That Compound Growth",
    excerpt:
      "A guide to turning usage, referrals, insight loops, and team behavior into product mechanisms that create repeatable expansion.",
  },
  {
    category: "Product",
    title: "The Real Difference Between 0 to 1 and 1 to 10 Product Work",
    excerpt:
      "A clear split between invention work and scaling work, with notes on what should change in decisions, metrics, and cross-functional habits.",
  },
  {
    category: "Product",
    title: "How to Turn Founder Intuition Into a Product Strategy",
    excerpt:
      "A framework for converting strong founder instinct into a sharper operating thesis that the team can execute and critique.",
  },
  {
    category: "Product",
    title: "Metrics That Actually Matter Before Series A",
    excerpt:
      "A grounded draft on leading indicators, retention signals, and proof-of-value metrics that matter more than vanity growth charts in the early stage.",
  },
  {
    category: "Product",
    title: "How to Build a Product That Scales Without Overengineering",
    excerpt:
      "A practical note on avoiding premature platform work while still leaving room for growth, reliability, and a better user experience later.",
  },
  {
    category: "Product",
    title: "What Breaks When a Startup Starts Growing Fast",
    excerpt:
      "An operator view of the hidden product, communication, and process fractures that appear when adoption outruns the team’s operating model.",
  },
  {
    category: "GTM",
    title: "Founder-Led GTM: What Still Works in 2026",
    excerpt:
      "A current view on the founder motions that still move pipeline today: customer conversations, sharp positioning, proof-led demos, and fast feedback loops.",
  },
  {
    category: "GTM",
    title: "The First GTM Hire: Who to Bring In and When",
    excerpt:
      "A practical framework for deciding whether the next leverage point is sales, growth, product marketing, or a more hybrid operator profile.",
  },
  {
    category: "GTM",
    title: "How to Build a GTM Motion Before Hiring a Big Team",
    excerpt:
      "A founder playbook for building a repeatable demand and conversion loop while headcount is still constrained and the message is still evolving.",
  },
  {
    category: "GTM",
    title: "Why RevOps Starts Earlier Than Most Founders Think",
    excerpt:
      "A note on instrumentation, lifecycle hygiene, and the operating discipline that prevents startup GTM from becoming impossible to debug later.",
  },
  {
    category: "GTM",
    title: "How to Create a Messaging House for a Technical Product",
    excerpt:
      "A working draft on turning technical depth into crisp category messaging, buyer language, and differentiated positioning that sales can repeat.",
  },
  {
    category: "GTM",
    title: "The Fastest Way to Validate Positioning With Real Buyers",
    excerpt:
      "A tactical post on message testing through calls, decks, outbound hooks, landing pages, and objection handling rather than internal debate alone.",
  },
  {
    category: "GTM",
    title: "Content, Outbound, or Partnerships: Where Early Traction Really Comes From",
    excerpt:
      "A comparative look at the three channels most early startups consider and the conditions under which each one becomes worth the effort.",
  },
  {
    category: "GTM",
    title: "How AI Is Changing B2B Sales Playbooks",
    excerpt:
      "An operator view on what AI is actually changing across prospect research, demo prep, onboarding, and post-sale support in modern B2B GTM teams.",
  },
  {
    category: "GTM",
    title: "What a Great GTM Feedback Loop Looks Like Between Sales and Product",
    excerpt:
      "A practical model for making customer objections, onboarding friction, usage drop-offs, and expansion signals visible to the people building the product.",
  },
  {
    category: "Recruitment",
    title: "How to Hire Your First 10 Startup Employees Without Regret",
    excerpt:
      "A founder-focused draft on role design, evidence-based interviewing, and protecting team quality when every early hire changes company velocity.",
  },
  {
    category: "Recruitment",
    title: "What to Look for in Early Product Hires",
    excerpt:
      "A practical guide to evaluating product candidates for ambiguity tolerance, judgment, ownership, and the ability to work close to founders.",
  },
  {
    category: "Recruitment",
    title: "How YC-Backed Startups Should Think About Recruiting",
    excerpt:
      "A draft on calibrating speed, talent density, and role clarity when the company needs exceptional operators but does not yet have enterprise hiring infrastructure.",
  },
  {
    category: "Recruitment",
    title: "Hiring for Speed vs Hiring for Stability",
    excerpt:
      "A working framework for deciding when you need fast-moving builders and when you need people who stabilize systems, quality, and process.",
  },
  {
    category: "Recruitment",
    title: "How to Build a Recruiting Funnel When You Don’t Have Brand Pull",
    excerpt:
      "A practical note on sourcing, storytelling, and candidate experience when the company is early and credibility has to be earned manually.",
  },
  {
    category: "Recruitment",
    title: "What Great Startup Interviews Actually Measure",
    excerpt:
      "A draft on moving past vague culture-fit interviews toward concrete signals of problem solving, execution quality, and startup readiness.",
  },
  {
    category: "Recruitment",
    title: "When to Hire a PM, a Designer, or an Engineer First",
    excerpt:
      "A founder memo on sequencing cross-functional hires based on the real bottleneck rather than org-chart aspiration.",
  },
  {
    category: "Recruitment",
    title: "How to Build a Small Team That Ships Like a Big One",
    excerpt:
      "A practical article about communication rules, ownership boundaries, and execution standards that let a lean team move with surprising speed.",
  },
  {
    category: "Recruitment",
    title: "The Recruiting Mistakes That Slow Down Startup Growth",
    excerpt:
      "A closing draft on the hiring patterns that quietly create drag: weak scorecards, vague roles, rushed close processes, and poor expectation setting.",
  },
] as const satisfies ReadonlyArray<{
  category: BlogCategory;
  title: string;
  excerpt: string;
}>;

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createBody(category: BlogCategory, title: string, excerpt: string): BlogBody {
  const sectionTitles = categorySectionTitles[category];
  const paragraphs = categoryParagraphs[category](title, excerpt);
  const angle = categoryAngles[category];
  const bullets = categoryActionBullets[category];

  return {
    intro: `${excerpt} This version is intentionally a placeholder draft, but it is written to feel like a credible operator note rooted in ${angle}.`,
    sections: [
      {
        title: sectionTitles[0],
        paragraphs: [paragraphs[0]],
      },
      {
        title: sectionTitles[1],
        paragraphs: [paragraphs[1]],
        bullets: [
          `Teams usually overcomplicate ${title.toLowerCase()} before they define the highest-leverage question.`,
          "They chase channels, features, or hires before aligning on the user problem and the proof required to move forward.",
        ],
      },
      {
        title: sectionTitles[2],
        paragraphs: [paragraphs[2]],
        bullets,
      },
      {
        title: sectionTitles[3],
        paragraphs: [
          `A strong final version of this article should include live examples from startup execution: one win, one miss, and one decision that changed after better evidence showed up.`,
          "That is especially important for founder audiences because they do not need abstract best practices. They need patterns that survive contact with limited time, messy data, and real market pressure.",
        ],
      },
      {
        title: sectionTitles[4],
        paragraphs: [
          "The core measurement question is whether this advice changes the speed or quality of a founder decision. If the final version cannot make that shift visible, the piece should be rewritten until it can.",
        ],
        bullets: [
          "What signal improved after this change?",
          "What got simpler for the team?",
          "What would I stop doing if this approach worked?",
        ],
      },
    ],
    takeaway: `The takeaway for ${title.toLowerCase()} is simple: keep the recommendation close to the operating reality of the team, make the tradeoffs explicit, and write the final version so a founder can act on it immediately.`,
  };
}

export const blogs: BlogPost[] = seedPosts.map((post, index) => {
  const publishedAt = new Date(Date.UTC(2026, 6, 17 - index, 9, 0, 0))
    .toISOString()
    .slice(0, 10);

  return {
    slug: slugify(post.title),
    title: post.title,
    category: post.category,
    publishedAt,
    excerpt: post.excerpt,
    seoTitle: `${post.title} | Sayandeep Das`,
    seoDescription: `${post.excerpt} Insights from Sayandeep Das on AI, GTM, product strategy, startup hiring, and scaling venture-backed teams.`,
    keywords: [
      post.title,
      `${post.category} startup playbook`,
      "Sayandeep Das",
      "Sayandeep",
      "GTM Engineer Sayandeep",
      "Product Manager Sayandeep",
    ],
    readTime: `${4 + (index % 4)} min read`,
    featured: index === 0,
    coverStyle: coverStyles[index % coverStyles.length],
    body: createBody(post.category, post.title, post.excerpt),
  };
});

export { POSTS_PER_PAGE };

export function getSortedBlogs() {
  return [...blogs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}

export function getBlogPageCount() {
  return Math.ceil(blogs.length / POSTS_PER_PAGE);
}

export function getBlogsForPage(page: number) {
  const sortedBlogs = getSortedBlogs();
  const start = (page - 1) * POSTS_PER_PAGE;
  return sortedBlogs.slice(start, start + POSTS_PER_PAGE);
}

export function getBlogCategories() {
  const counts = blogs.reduce<Record<BlogCategory, number>>(
    (acc, blog) => {
      acc[blog.category] += 1;
      return acc;
    },
    {
      AI: 0,
      Product: 0,
      GTM: 0,
      Recruitment: 0,
    }
  );

  return [
    { label: "All", count: blogs.length },
    { label: "AI", count: counts.AI },
    { label: "Product", count: counts.Product },
    { label: "GTM", count: counts.GTM },
    { label: "Recruitment", count: counts.Recruitment },
  ];
}
