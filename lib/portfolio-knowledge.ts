import {
    ChatAction,
    ChatReference,
    ChatResponseScope,
    PortfolioChatResponse,
    PortfolioKnowledgeEntry,
} from '@/types';
import {
    ABOUT_ME_CONTENT,
    EDUCATION,
    GENERAL_INFO,
    JOURNEY_ITEMS,
    MY_EXPERIENCE,
    MY_STACK,
    OUTSIDE_WORK_INTERESTS,
    PRODUCTS_WORKED_ON,
    PROJECTS,
    SOCIAL_LINKS,
} from '@/lib/portfolio-content';

interface MatchableKnowledgeEntry extends PortfolioKnowledgeEntry {
    aliases?: string[];
    externalHref?: string;
    kind?:
        | 'section'
        | 'project-detail'
        | 'project-overview'
        | 'hero'
        | 'hero-stat'
        | 'education-detail'
        | 'stack-category'
        | 'stack-item'
        | 'experience-detail'
        | 'journey-detail'
        | 'product-link'
        | 'outside-work-detail'
        | 'social-link'
        | 'resource-link'
        | 'site-credit';
    projectSlug?: string;
}

interface PortfolioChatPlan {
    response: PortfolioChatResponse;
    contextEntries: PortfolioKnowledgeEntry[];
    shouldUseModel: boolean;
}

const MODEL_CALL_THRESHOLD = 25;
const REFERENCE_THRESHOLD = 35;
const MAX_ACTIONS = 3;
const MAX_FOLLOW_UPS = 3;
const GREETING_ONLY_PATTERN =
    /^(?:hi|hii|hiii|hey|heyy|hello|hiya|howdy|yo|greetings|good morning|good afternoon|good evening)(?:\s+(?:there|buddy|friend|pal|bro|sis|team|folks|everyone|yall|ya|man))*$/i;
const HIRE_CONTACT_INTENT_PATTERN =
    /\b(hire|hiring|work with|work together|reach out|contact|email|resume|cv|availability|available|let's talk|lets talk)\b/i;
const GENERAL_QUESTION_PATTERN =
    /^(what|how|why|can|should|do|does|when|where|who)\b/i;
const GENERAL_GUIDANCE_PATTERNS = [
    {
        key: 'product',
        pattern:
            /\b(product engineer|product engineering|product manager|product minded|user centered|user-centered)\b/i,
    },
    {
        key: 'leadership',
        pattern:
            /\b(leadership|leader|teamwork|collaboration|communicat|stakeholder|cross functional|cross-functional)\b/i,
    },
    {
        key: 'career',
        pattern:
            /\b(career|internship|student|growth|grow|learning|learn|job search|interview|break into|stand out)\b/i,
    },
    {
        key: 'engineering',
        pattern:
            /\b(engineer|engineering|developer|software|system design|architecture|technical)\b/i,
    },
] as const;
const FULL_NAME_PATTERN =
    /\b(full name|last name|surname|family name|real name|complete name)\b/i;
const EDUCATION_AWARDS_PATTERN =
    /\b(award|awards|honor|honours|honors|scholar|scholarship|scholarships)\b/i;
const EDUCATION_COURSEWORK_PATTERN =
    /\b(coursework|course work|classes|courses|studied)\b/i;
const EDUCATION_ACTIVITIES_PATTERN =
    /\b(activity|activities|clubs|organizations|societies|leadership|involved)\b/i;
const STACK_CATEGORY_PATTERNS: Record<keyof typeof MY_STACK, RegExp> = {
    frontend: /\b(frontend|front end|ui)\b/i,
    backend: /\b(backend|back end|server)\b/i,
    database: /\b(database|databases|data stack|data)\b/i,
    tools: /\b(tools|tooling|platforms|software)\b/i,
    concepts: /\b(concepts|methodologies|principles|focus areas)\b/i,
};
const PROJECT_ROLE_PATTERN =
    /\b(role|responsibilit|contribution|contributed|what did cyril do|did he do|his part)\b/i;
const PROJECT_STACK_PATTERN =
    /\b(stack|tech stack|technology|technologies|built with|use|used)\b/i;
const PROJECT_OUTCOME_PATTERN =
    /\b(outcome|outcomes|impact|results|result|metrics|funding|users|uptime|performance)\b/i;
const PROJECT_LINK_PATTERN = /\b(link|live|website|demo|url)\b/i;
const WEBSITE_REPO_URL = 'https://github.com/cyrilkups/Portfolio';
const STOP_WORDS = new Set([
    'a',
    'about',
    'an',
    'and',
    'are',
    'can',
    'do',
    'does',
    'for',
    'he',
    'her',
    'him',
    'his',
    'how',
    'i',
    'is',
    'it',
    'me',
    'my',
    'of',
    'or',
    'she',
    'tell',
    'the',
    'their',
    'them',
    'they',
    'to',
    'what',
    'where',
    'who',
    'why',
    'you',
]);

function decodeHtmlEntities(value: string) {
    return value
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>');
}

function sanitizePlainText(value: string) {
    return decodeHtmlEntities(
        value
            .replace(/<br\s*\/?>/gi, ' ')
            .replace(/<\/li>/gi, ' ')
            .replace(/<\/p>/gi, ' ')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim(),
    );
}

function normalizeText(value: string) {
    return sanitizePlainText(value)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function tokenize(value: string) {
    return Array.from(
        new Set(
            normalizeText(value)
                .split(' ')
                .filter(
                    (token) => token.length > 1 && !STOP_WORDS.has(token),
                ),
        ),
    );
}

function joinIfPresent(values: Array<string | undefined | null>) {
    return values.filter(Boolean).join(' ');
}

function getSentences(value: string) {
    return (
        sanitizePlainText(value)
            .match(/[^.!?]+[.!?]*/g)
            ?.map((sentence) => sentence.trim())
            .filter(Boolean) ?? []
    );
}

function toShortAnswer(...parts: string[]) {
    return parts
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function stackSummary() {
    return Object.entries(MY_STACK)
        .map(
            ([category, items]) =>
                `${category}: ${items.map((item) => item.name).join(', ')}`,
        )
        .join(' ');
}

function experienceSummary() {
    return MY_EXPERIENCE.map(
        (experience) =>
            `${experience.title} at ${experience.company} (${experience.duration})`,
    ).join(' ');
}

function journeySummary() {
    return JOURNEY_ITEMS.map(
        (item) =>
            `${item.name}: ${item.organization}. ${item.description} ${item.stat}.`,
    ).join(' ');
}

function outsideWorkSummary() {
    return OUTSIDE_WORK_INTERESTS.map((interest) => interest.title).join(', ');
}

function productsWorkedOnSummary() {
    return PRODUCTS_WORKED_ON.map((product) => product.name).join(', ');
}

function projectOverviewSummary() {
    return PROJECTS.map(
        (project) =>
            `${project.title}: ${sanitizePlainText(project.description)} Tech stack: ${project.techStack.join(', ')}.`,
    ).join(' ');
}

function formatCategoryLabel(category: string) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

function getProjectSlugForProduct(name: string) {
    return (
        PROJECTS.find(
            (project) => normalizeText(project.title) === normalizeText(name),
        )?.slug ?? null
    );
}

const HERO_ENTRIES: MatchableKnowledgeEntry[] = [
    {
        id: 'hero-intro',
        title: 'Hero Intro',
        plainText: sanitizePlainText(
            "Cyril is a software developer and technical product manager. The hero section highlights 2+ years of experience, 15+ completed projects, and 4K+ hours worked. The primary call to action is the hire me resume link.",
        ),
        keywords: [
            'hero',
            'intro',
            'years of experience',
            'completed projects',
            'hours worked',
            'hire me',
        ],
        label: 'Hero',
        href: '/#banner',
        aliases: [
            'hero',
            'intro',
            'years of experience',
            'completed projects',
            'hours worked',
        ],
        kind: 'hero',
    },
];

const HERO_STAT_ENTRIES: MatchableKnowledgeEntry[] = [
    {
        id: 'hero-years-experience',
        title: 'Years of Experience',
        plainText:
            'Cyril highlights 2+ years of experience in the hero section of the site.',
        keywords: ['years of experience', '2+ years', 'experience'],
        label: 'Hero',
        href: '/#banner',
        aliases: [
            'how many years of experience',
            '2 years experience',
            '2+ years',
        ],
        kind: 'hero-stat',
    },
    {
        id: 'hero-completed-projects',
        title: 'Completed Projects',
        plainText:
            'The hero section highlights 15+ completed projects across Cyril\'s portfolio.',
        keywords: ['completed projects', '15+ projects', 'projects'],
        label: 'Hero',
        href: '/#banner',
        aliases: [
            'how many projects',
            'completed projects',
            '15+ completed projects',
        ],
        kind: 'hero-stat',
    },
    {
        id: 'hero-hours-worked',
        title: 'Hours Worked',
        plainText:
            'The hero section highlights 4K+ hours worked across Cyril\'s experience.',
        keywords: ['hours worked', '4k+ hours', 'hours'],
        label: 'Hero',
        href: '/#banner',
        aliases: ['how many hours', '4k hours', 'hours worked'],
        kind: 'hero-stat',
    },
];

const SECTION_ENTRIES: MatchableKnowledgeEntry[] = [
    {
        id: 'about-me-intro',
        title: 'About Cyril',
        plainText: sanitizePlainText(
            joinIfPresent([
                ABOUT_ME_CONTENT.fullName,
                ABOUT_ME_CONTENT.name,
                ABOUT_ME_CONTENT.summary,
                ABOUT_ME_CONTENT.approach,
                ABOUT_ME_CONTENT.footer,
            ]),
        ),
        keywords: [
            'about',
            'cyril',
            'background',
            'software developer',
            'technical product manager',
            'this is me',
            'full name',
            'last name',
            'surname',
            'cyril ofori kupualor',
        ],
        label: 'This is me',
        href: '/#about-me-intro',
        aliases: [
            'who is cyril',
            'about cyril',
            'this is me',
            'background',
            'full name',
            'cyril full name',
            'cyril ofori kupualor',
            'last name',
            'surname',
        ],
        kind: 'section',
    },
    {
        id: 'products-worked-on',
        title: 'Products Worked On',
        plainText: sanitizePlainText(
            `Products Cyril has worked on include ${productsWorkedOnSummary()}. Each one has a live link in the about section, and some also have project case studies on the site.`,
        ),
        keywords: ['products worked on', 'products', 'live products'],
        label: 'Products Worked On',
        href: '/#about-me',
        aliases: [
            'products worked on',
            'what products has he worked on',
            'live products',
        ],
        kind: 'section',
    },
    {
        id: 'education',
        title: 'Education',
        plainText: sanitizePlainText(
            joinIfPresent([
                `${EDUCATION.school}. ${EDUCATION.degree}. ${EDUCATION.minor}. GPA ${EDUCATION.gpa}. ${EDUCATION.location}.`,
                `Coursework: ${EDUCATION.coursework.join(', ')}.`,
                `Awards: ${EDUCATION.awards.join(', ')}.`,
                `Activities: ${EDUCATION.activities
                    .map((activity) =>
                        activity.role
                            ? `${activity.name} - ${activity.role}`
                            : activity.name,
                    )
                    .join(', ')}.`,
            ]),
        ),
        keywords: ['education', 'school', 'gpa', 'coursework', 'awards'],
        label: 'Education',
        href: '/#education',
        aliases: ['education', 'school', 'gpa', 'grambling', 'degree'],
        kind: 'section',
    },
    {
        id: 'stack',
        title: 'Tech Stack',
        plainText: sanitizePlainText(stackSummary()),
        keywords: ['stack', 'tech stack', 'skills', 'tools', 'technologies'],
        label: 'My Stack',
        href: '/#my-stack',
        aliases: ['tech stack', 'skills', 'tools', 'technologies'],
        kind: 'section',
    },
    {
        id: 'experience',
        title: 'Experience',
        plainText: sanitizePlainText(experienceSummary()),
        keywords: ['experience', 'work', 'roles', 'internship', 'career'],
        label: 'My Experience',
        href: '/#my-experience',
        aliases: ['experience', 'work', 'career', 'roles', 'internship'],
        kind: 'section',
    },
    {
        id: 'journey',
        title: 'Side Quest',
        plainText: sanitizePlainText(
            `Cyril's Side Quest section covers milestones across hackathons, scholarships, leadership, pitching, and community work. ${journeySummary()}`,
        ),
        keywords: [
            'side quest',
            'sidequest',
            'journey',
            'milestones',
            'fellowships',
            'community',
            'hackathons',
            'leadership',
        ],
        label: 'Side Quest',
        href: '/#journey',
        aliases: [
            'side quest',
            'sidequest',
            'journey',
            'milestones',
            'my journey',
            'side quests',
        ],
        kind: 'section',
    },
    {
        id: 'projects-overview',
        title: 'Projects',
        plainText: sanitizePlainText(projectOverviewSummary()),
        keywords: ['projects', 'portfolio', 'work', 'products'],
        label: 'Selected Projects',
        href: '/#selected-projects',
        aliases: ['projects', 'portfolio', 'work', 'products'],
        kind: 'project-overview',
    },
    {
        id: 'outside-work',
        title: 'Outside Work',
        plainText: sanitizePlainText(
            `Cyril outside work includes ${outsideWorkSummary()}.`,
        ),
        keywords: ['outside work', 'interests', 'hobbies'],
        label: 'Outside Work',
        href: '/#outside-work',
        aliases: ['outside work', 'interests', 'hobbies'],
        kind: 'section',
    },
    {
        id: 'contact',
        title: 'Contact',
        plainText: sanitizePlainText(
            `Reach Cyril by email at ${GENERAL_INFO.email}. Email subject: ${GENERAL_INFO.emailSubject}. Social links: ${SOCIAL_LINKS.map((link) => `${link.name} ${link.url}`).join(', ')}.`,
        ),
        keywords: ['contact', 'email', 'hire', 'reach out'],
        label: 'Contact',
        href: '/#contact',
        aliases: ['contact', 'email', 'hire', 'reach out'],
        kind: 'section',
    },
];

const PROJECT_ALIAS_MAP: Record<string, string[]> = {
    'campus-hustle': ['campus hustle'],
    'quick-reach': ['quick reach'],
    'card-fraud-detect-ai': ['card fraud ai', 'fraud detect ai', 'fraud ai'],
    'spec-linter': ['spec linter'],
    georim: ['georim'],
    'doc-link': ['doc link'],
    'stock-insight-engine': ['stock insight', 'stock insight engine'],
    'braille-technology': ['braille tech', 'braille technology'],
};

const PROJECT_ENTRIES: MatchableKnowledgeEntry[] = PROJECTS.map((project) => ({
    id: `project-${project.slug}`,
    title: project.title,
    plainText: sanitizePlainText(
        joinIfPresent([
            `${project.title}.`,
            project.description,
            project.role,
            project.caseStudy,
            `Tech stack: ${project.techStack.join(', ')}.`,
        ]),
    ),
    keywords: [
        project.title,
        ...project.techStack,
        project.slug.replace(/-/g, ' '),
    ].map((keyword) => normalizeText(keyword)),
    label: project.title,
    href: `/projects/${project.slug}`,
    aliases: PROJECT_ALIAS_MAP[project.slug] ?? [],
    kind: 'project-detail',
    projectSlug: project.slug,
}));

const STACK_CATEGORY_ENTRIES: MatchableKnowledgeEntry[] = Object.entries(
    MY_STACK,
).map(([category, items]) => ({
    id: `stack-category-${normalizeText(category).replace(/\s+/g, '-')}`,
    title:
        category === 'concepts'
            ? 'Engineering Concepts'
            : `${formatCategoryLabel(category)} Stack`,
    plainText: sanitizePlainText(
        category === 'concepts'
            ? `Concepts Cyril highlights include ${items.map((item) => item.name).join(', ')}.`
            : `Cyril's ${category} stack includes ${items.map((item) => item.name).join(', ')}.`,
    ),
    keywords: [category, `${category} stack`, 'tech stack', ...items.map((item) => item.name)],
    label: 'My Stack',
    href: '/#my-stack',
    aliases: [
        `${category} stack`,
        `his ${category} stack`,
        category,
        ...(category === 'concepts' ? ['concepts', 'methodologies'] : []),
    ],
    kind: 'stack-category',
}));

const STACK_ITEM_ENTRIES: MatchableKnowledgeEntry[] = Object.entries(MY_STACK).flatMap(
    ([category, items]) =>
        items.map((item) => ({
            id: `stack-item-${normalizeText(item.name).replace(/\s+/g, '-')}`,
            title: item.name,
            plainText: sanitizePlainText(
                `${item.name} is part of Cyril's ${category} stack on the website.`,
            ),
            keywords: [item.name, category, `${category} stack`, 'tech stack'],
            label: 'My Stack',
            href: '/#my-stack',
            aliases: [
                item.name,
                `does he use ${item.name}`,
                `${item.name} stack`,
            ],
            kind: 'stack-item',
        })),
);

const EDUCATION_DETAIL_ENTRIES: MatchableKnowledgeEntry[] = [
    {
        id: 'education-awards',
        title: 'Education Awards',
        plainText: sanitizePlainText(
            `Cyril's education awards include ${EDUCATION.awards.join(', ')}.`,
        ),
        keywords: ['awards', 'honors', 'scholarships', ...EDUCATION.awards],
        label: 'Education',
        href: '/#education',
        aliases: ['awards', 'honors', 'scholarships', 'education awards'],
        kind: 'education-detail',
    },
    {
        id: 'education-coursework',
        title: 'Coursework',
        plainText: sanitizePlainText(
            `Relevant coursework includes ${EDUCATION.coursework.join(', ')}.`,
        ),
        keywords: ['coursework', 'courses', 'classes', ...EDUCATION.coursework],
        label: 'Education',
        href: '/#education',
        aliases: ['coursework', 'courses', 'classes'],
        kind: 'education-detail',
    },
    {
        id: 'education-activities',
        title: 'Campus Activities',
        plainText: sanitizePlainText(
            `Cyril's campus activities include ${EDUCATION.activities
                .map((activity) =>
                    activity.role
                        ? `${activity.name} as ${activity.role}`
                        : activity.name,
                )
                .join(', ')}.`,
        ),
        keywords: [
            'activities',
            'clubs',
            'organizations',
            ...EDUCATION.activities.flatMap((activity) => [
                activity.name,
                activity.role ?? '',
            ]),
        ],
        label: 'Education',
        href: '/#education',
        aliases: ['activities', 'clubs', 'organizations', 'leadership'],
        kind: 'education-detail',
    },
    ...EDUCATION.awards.map((award) => ({
        id: `education-award-${normalizeText(award).replace(/\s+/g, '-')}`,
        title: award,
        plainText: sanitizePlainText(
            `${award} is one of Cyril's education awards and honors listed on the site.`,
        ),
        keywords: [award, 'award', 'honor', 'scholarship'],
        label: 'Education',
        href: '/#education',
        aliases: [award],
        kind: 'education-detail' as const,
    })),
    ...EDUCATION.coursework.map((course) => ({
        id: `education-course-${normalizeText(course).replace(/\s+/g, '-')}`,
        title: course,
        plainText: sanitizePlainText(
            `${course} is part of Cyril's listed coursework at ${EDUCATION.school}.`,
        ),
        keywords: [course, 'coursework', 'course', 'class'],
        label: 'Education',
        href: '/#education',
        aliases: [course],
        kind: 'education-detail' as const,
    })),
    ...EDUCATION.activities.map((activity) => ({
        id: `education-activity-${normalizeText(activity.name).replace(/\s+/g, '-')}`,
        title: activity.name,
        plainText: sanitizePlainText(
            activity.role
                ? `Cyril served as ${activity.role} in ${activity.name}.`
                : `${activity.name} is one of Cyril's campus activities listed on the site.`,
        ),
        keywords: [activity.name, activity.role ?? '', 'activity', 'organization', 'club'],
        label: 'Education',
        href: '/#education',
        aliases: [activity.name, activity.role ?? ''],
        kind: 'education-detail' as const,
    })),
];

const EXPERIENCE_ENTRIES: MatchableKnowledgeEntry[] = MY_EXPERIENCE.map(
    (experience) => ({
        id: `experience-${normalizeText(`${experience.title}-${experience.company}`).replace(/\s+/g, '-')}`,
        title: `${experience.title} at ${experience.company}`,
        plainText: sanitizePlainText(
            `${experience.title} at ${experience.company}. Duration: ${experience.duration}. ${
                experience.url
                    ? 'There is an external link available for this experience.'
                    : 'This role is summarized in the experience section of the site.'
            }`,
        ),
        keywords: [
            experience.title,
            experience.company,
            experience.duration,
            'experience',
            'role',
        ],
        label: 'My Experience',
        href: '/#my-experience',
        aliases: [experience.title, experience.company],
        kind: 'experience-detail',
        externalHref: experience.url,
    }),
);

const JOURNEY_ENTRIES: MatchableKnowledgeEntry[] = JOURNEY_ITEMS.map((item) => ({
    id: `journey-${normalizeText(item.name).replace(/\s+/g, '-')}`,
    title: item.name,
    plainText: sanitizePlainText(
        `${item.name}. ${item.organization}. ${item.description} Stat: ${item.stat}. This appears in Cyril's Side Quest section.`,
    ),
    keywords: [
        item.name,
        item.organization,
        item.tag,
        item.stat,
        'journey',
        'side quest',
        'sidequest',
    ],
    label: 'Side Quest',
    href: '/#journey',
    aliases: [item.name, item.organization, item.tag, `${item.name} side quest`],
    kind: 'journey-detail',
    externalHref: item.link,
}));

const PRODUCT_ENTRIES: MatchableKnowledgeEntry[] = PRODUCTS_WORKED_ON.map(
    (product) => ({
        id: `product-${normalizeText(product.name).replace(/\s+/g, '-')}`,
        title: product.name,
        plainText: sanitizePlainText(
            `${product.name} is one of the products Cyril has worked on. The live product link is ${product.url}. Some products also have a project case study on the site.`,
        ),
        keywords: [product.name, 'products worked on', 'product', 'live site'],
        label: 'Products Worked On',
        href: '/#about-me',
        aliases: [product.name, `${product.name} live`, `${product.name} website`],
        kind: 'product-link',
        externalHref: product.url,
        projectSlug: getProjectSlugForProduct(product.name) ?? undefined,
    }),
);

const OUTSIDE_WORK_ENTRIES: MatchableKnowledgeEntry[] = OUTSIDE_WORK_INTERESTS.map(
    (interest) => ({
        id: `outside-work-${normalizeText(interest.title).replace(/\s+/g, '-')}`,
        title: interest.title,
        plainText: sanitizePlainText(
            `${interest.title} is one of Cyril's interests outside of work and appears in the outside work section of the site.`,
        ),
        keywords: [interest.title, 'outside work', 'interests', 'hobbies'],
        label: 'Outside Work',
        href: '/#outside-work',
        aliases: [interest.title, `${interest.title} interest`],
        kind: 'outside-work-detail',
    }),
);

const SOCIAL_ENTRIES: MatchableKnowledgeEntry[] = SOCIAL_LINKS.map((link) => ({
    id: `social-${normalizeText(link.name).replace(/\s+/g, '-')}`,
    title: `${link.name} Profile`,
    plainText: sanitizePlainText(
        `${link.name} is one of Cyril's social links. The profile URL is ${link.url}.`,
    ),
    keywords: [link.name, 'social', 'contact', 'profile'],
    label: 'Contact',
    href: '/#contact',
    aliases: [link.name, `${link.name} profile`, `cyril ${link.name}`],
    kind: 'social-link',
    externalHref: link.url,
}));

const RESOURCE_ENTRIES: MatchableKnowledgeEntry[] = [
    {
        id: 'resource-resume',
        title: 'Resume',
        plainText: sanitizePlainText(
            `Cyril's resume and hire me materials are available at ${ABOUT_ME_CONTENT.hireMeUrl}.`,
        ),
        keywords: ['resume', 'cv', 'hire me'],
        label: 'Contact',
        href: '/#contact',
        aliases: ['resume', 'cv', 'hire me', 'hire link'],
        kind: 'resource-link',
        externalHref: ABOUT_ME_CONTENT.hireMeUrl,
    },
    {
        id: 'resource-upwork',
        title: 'Upwork',
        plainText: sanitizePlainText(
            `Cyril's Upwork profile is ${GENERAL_INFO.upworkProfile}.`,
        ),
        keywords: ['upwork', 'freelance', 'freelancer'],
        label: 'Contact',
        href: '/#contact',
        aliases: ['upwork', 'freelance profile', 'freelancer profile'],
        kind: 'resource-link',
        externalHref: GENERAL_INFO.upworkProfile,
    },
    {
        id: 'resource-old-portfolio',
        title: 'Old Portfolio',
        plainText: sanitizePlainText(
            `Cyril's previous portfolio version is ${GENERAL_INFO.oldPortfolio}.`,
        ),
        keywords: ['old portfolio', 'legacy portfolio', 'previous portfolio'],
        label: 'Contact',
        href: '/#contact',
        aliases: ['old portfolio', 'legacy portfolio', 'previous portfolio'],
        kind: 'resource-link',
        externalHref: GENERAL_INFO.oldPortfolio,
    },
];

const SITE_ENTRIES: MatchableKnowledgeEntry[] = [
    {
        id: 'site-credit',
        title: 'Portfolio Site Credit',
        plainText: sanitizePlainText(
            `This portfolio was designed and built by Cyril Kupualor. The site repository is ${WEBSITE_REPO_URL}.`,
        ),
        keywords: [
            'built this website',
            'designed this website',
            'portfolio repo',
            'github repo',
            'source code',
        ],
        label: 'Contact',
        href: '/#contact',
        aliases: [
            'who built this website',
            'who designed this website',
            'portfolio repo',
            'github repo',
            'source code',
        ],
        kind: 'site-credit',
        externalHref: WEBSITE_REPO_URL,
    },
];

const SECTION_ACTION_LABELS: Record<string, string> = {
    'about-me-intro': 'View profile',
    'products-worked-on': 'View products',
    education: 'View education',
    stack: 'View stack',
    experience: 'View experience',
    journey: 'View Side Quest',
    'projects-overview': 'View projects',
    'outside-work': 'View outside work',
    contact: 'Open contact',
};

const ADJACENT_SECTION_MAP: Record<string, string> = {
    'about-me-intro': 'experience',
    'products-worked-on': 'projects-overview',
    education: 'experience',
    stack: 'projects-overview',
    experience: 'projects-overview',
    journey: 'projects-overview',
    'projects-overview': 'contact',
    'outside-work': 'about-me-intro',
    contact: 'experience',
};

const ALL_MATCHABLE_ENTRIES: MatchableKnowledgeEntry[] = [
    ...HERO_ENTRIES,
    ...HERO_STAT_ENTRIES,
    ...SECTION_ENTRIES,
    ...STACK_CATEGORY_ENTRIES,
    ...STACK_ITEM_ENTRIES,
    ...EDUCATION_DETAIL_ENTRIES,
    ...EXPERIENCE_ENTRIES,
    ...JOURNEY_ENTRIES,
    ...PRODUCT_ENTRIES,
    ...OUTSIDE_WORK_ENTRIES,
    ...SOCIAL_ENTRIES,
    ...RESOURCE_ENTRIES,
    ...SITE_ENTRIES,
    ...PROJECT_ENTRIES,
];

function getEntryById(id: string) {
    return ALL_MATCHABLE_ENTRIES.find((entry) => entry.id === id);
}

function getEntriesByIds(ids: string[]) {
    return ids
        .map((id) => getEntryById(id))
        .filter(Boolean) as MatchableKnowledgeEntry[];
}

function getProjectBySlug(slug: string) {
    return PROJECTS.find((project) => project.slug === slug);
}

function dedupeReferences(references: ChatReference[]) {
    const seen = new Set<string>();

    return references.filter((reference) => {
        const key = `${reference.label}:${reference.href}`;
        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

function dedupeActions(actions: ChatAction[]) {
    const seen = new Set<string>();

    return actions.filter((action) => {
        const key = [
            action.kind,
            action.label,
            action.href ?? '',
            action.sectionId ?? '',
            action.projectSlug ?? '',
        ].join(':');

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

function dedupeStrings(values: string[]) {
    const seen = new Set<string>();

    return values.filter((value) => {
        const normalized = value.trim();
        if (!normalized) {
            return false;
        }

        const key = normalized.toLowerCase();
        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

function buildChatResponse(
    answer: string,
    references: ChatReference[] = [],
    actions: ChatAction[] = [],
    followUps: string[] = [],
    scope: ChatResponseScope = 'portfolio',
): PortfolioChatResponse {
    return {
        answer,
        references: dedupeReferences(references).slice(0, 2),
        actions: dedupeActions(actions).slice(0, MAX_ACTIONS),
        followUps: dedupeStrings(followUps).slice(0, MAX_FOLLOW_UPS),
        scope,
    };
}

function createScrollAction(sectionId: string, label?: string): ChatAction {
    const entry = getEntryById(sectionId);
    const href = entry?.href ?? `/#${sectionId}`;

    return {
        kind: 'scroll_to_section',
        label:
            label ??
            SECTION_ACTION_LABELS[sectionId] ??
            `Open ${entry?.label ?? sectionId}`,
        href,
        sectionId: href.startsWith('/#') ? href.slice(2) : sectionId,
    };
}

function createProjectAction(projectSlug: string, label?: string): ChatAction {
    const project = getProjectBySlug(projectSlug);

    return {
        kind: 'open_project',
        label: label ?? `Open ${project?.title ?? 'project'}`,
        href: project ? `/projects/${project.slug}` : undefined,
        projectSlug,
    };
}

function createExternalAction(label: string, href: string): ChatAction {
    return {
        kind: 'open_external',
        label,
        href,
    };
}

function createComposeEmailAction(label = 'Draft email'): ChatAction {
    return {
        kind: 'compose_email',
        label,
    };
}

function scoreEntry(
    query: string,
    entry: MatchableKnowledgeEntry,
    allEntries: MatchableKnowledgeEntry[],
) {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
        return 0;
    }

    let score = 0;
    const normalizedTitle = normalizeText(entry.title);
    const normalizedAliases = (entry.aliases ?? []).map((alias) =>
        normalizeText(alias),
    );
    const normalizedKeywords = entry.keywords
        .map((keyword) => normalizeText(keyword))
        .filter(Boolean);
    const phrases = Array.from(
        new Set([normalizedTitle, ...normalizedAliases].filter(Boolean)),
    );

    if (normalizedQuery === normalizedTitle) {
        score += 100;
    }

    if (normalizedAliases.some((alias) => alias === normalizedQuery)) {
        score += 40;
    }

    if (
        phrases.some(
            (phrase) =>
                phrase.split(' ').length >= 2 &&
                normalizedQuery.includes(phrase) &&
                normalizedQuery !== phrase,
        )
    ) {
        score += 20;
    }

    const queryTokens = tokenize(normalizedQuery);
    const keywordTokenSet = new Set([
        ...normalizedAliases.flatMap((alias) => tokenize(alias)),
        ...normalizedKeywords.flatMap((keyword) => tokenize(keyword)),
    ]);
    const entryTokens = new Set([
        ...tokenize(entry.title),
        ...entry.keywords.flatMap((keyword) => tokenize(keyword)),
        ...tokenize(entry.plainText),
    ]);
    const keywordOverlap = queryTokens.filter((token) =>
        keywordTokenSet.has(token),
    ).length;
    score += keywordOverlap * 6;

    if (
        normalizedAliases.some((alias) => alias && normalizedQuery.includes(alias))
    ) {
        score += 20;
    }

    if (
        normalizedKeywords.some(
            (keyword) => keyword && normalizedQuery.includes(keyword),
        )
    ) {
        score += 15;
    }

    const overlapCount = queryTokens.filter((token) => entryTokens.has(token))
        .length;
    score += overlapCount * 3;

    if (entry.projectSlug) {
        const slugTokens = tokenize(entry.projectSlug.replace(/-/g, ' '));
        const hasProjectSpecificMatch =
            normalizedQuery === normalizedTitle ||
            normalizedAliases.some((alias) => alias === normalizedQuery) ||
            slugTokens.some((token) => queryTokens.includes(token));

        if (slugTokens.some((token) => queryTokens.includes(token))) {
            score += 15;
        }

        if (hasProjectSpecificMatch) {
            score += 20;
        }
    }

    if (entry.kind === 'project-overview') {
        const matchingProject = allEntries.find(
            (candidate) =>
                candidate.kind === 'project-detail' &&
                candidate.projectSlug &&
                (normalizeText(candidate.title) === normalizedQuery ||
                    (PROJECT_ALIAS_MAP[candidate.projectSlug] ?? []).some(
                        (alias) => normalizeText(alias) === normalizedQuery,
                    )),
        );

        if (matchingProject) {
            score -= 10;
        }
    }

    return score;
}

function getTopPortfolioMatches(query: string, limit = 3) {
    const entries = ALL_MATCHABLE_ENTRIES;

    return entries
        .map((entry) => ({
            entry,
            score: scoreEntry(query, entry, entries),
        }))
        .filter((match) => match.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, limit);
}

function getPortfolioReferences(query: string): ChatReference[] {
    const seen = new Set<string>();

    return getTopPortfolioMatches(query, 5)
        .filter((match) => match.score >= REFERENCE_THRESHOLD)
        .filter((match) => {
            if (seen.has(match.entry.href)) {
                return false;
            }

            seen.add(match.entry.href);
            return true;
        })
        .slice(0, 2)
        .map((match) => ({
            label: match.entry.label,
            href: match.entry.href,
        }));
}

export function looksLikePortfolioQuestion(query: string) {
    const trimmed = query.trim();

    if (!trimmed) {
        return false;
    }

    if (
        GENERAL_QUESTION_PATTERN.test(trimmed) ||
        trimmed.endsWith('?')
    ) {
        return true;
    }

    const bestMatch = getTopPortfolioMatches(trimmed, 1)[0];
    return Boolean(bestMatch && bestMatch.score >= REFERENCE_THRESHOLD);
}

function getPortfolioEntryMatch(query: string) {
    const bestMatch = getTopPortfolioMatches(query, 1)[0];

    if (!bestMatch || bestMatch.score < MODEL_CALL_THRESHOLD) {
        return null;
    }

    const entry = getEntryById(bestMatch.entry.id);
    return entry ?? null;
}

function isFullNameQuestion(query: string) {
    return FULL_NAME_PATTERN.test(query) || normalizeText(query) === 'cyril name';
}

function isGreetingOnly(query: string) {
    return GREETING_ONLY_PATTERN.test(normalizeText(query));
}

function getPortfolioAnswerForEntry(
    primaryEntry: PortfolioKnowledgeEntry,
    query?: string,
) {
    const normalizedQuery = query ? normalizeText(query) : '';

    if (primaryEntry.id === 'about-me-intro') {
        if (query && isFullNameQuestion(query)) {
            return `Cyril's full name is ${ABOUT_ME_CONTENT.fullName}.`;
        }

        return toShortAnswer(
            ABOUT_ME_CONTENT.summary,
            ABOUT_ME_CONTENT.approach,
        );
    }

    if (primaryEntry.id === 'hero-intro') {
        if (/years of experience|experience/.test(normalizedQuery)) {
            return 'Cyril highlights 2+ years of experience in the hero section of the portfolio.';
        }

        if (/completed projects|projects/.test(normalizedQuery)) {
            return "The hero section highlights 15+ completed projects across Cyril's portfolio.";
        }

        if (/hours worked|hours/.test(normalizedQuery)) {
            return "The hero section highlights 4K+ hours worked across Cyril's experience.";
        }

        if (/resume|hire me|cv/.test(normalizedQuery)) {
            return 'The hero section points visitors to Cyril\'s Hire Me materials through the resume link.';
        }

        return getSentences(primaryEntry.plainText).slice(0, 2).join(' ');
    }

    if (primaryEntry.id === 'products-worked-on') {
        return toShortAnswer(
            `Products Cyril has worked on include ${productsWorkedOnSummary()}.`,
            'Those live products are highlighted in the about section, and some also have deeper project case studies on the site.',
        );
    }

    if (primaryEntry.id === 'education') {
        if (query && EDUCATION_AWARDS_PATTERN.test(query)) {
            return `Cyril's education awards include ${EDUCATION.awards.join(', ')}.`;
        }

        if (query && EDUCATION_COURSEWORK_PATTERN.test(query)) {
            return `Relevant coursework includes ${EDUCATION.coursework.join(', ')}.`;
        }

        if (query && EDUCATION_ACTIVITIES_PATTERN.test(query)) {
            return `Cyril's campus activities include ${EDUCATION.activities
                .map((activity) =>
                    activity.role
                        ? `${activity.name} as ${activity.role}`
                        : activity.name,
                )
                .join(', ')}.`;
        }

        return toShortAnswer(
            `Cyril attends ${EDUCATION.school}, where he is pursuing ${EDUCATION.degree} with a ${EDUCATION.minor}.`,
            `He has a GPA of ${EDUCATION.gpa}, and coursework includes ${EDUCATION.coursework.slice(0, 3).join(', ')}.`,
        );
    }

    if (primaryEntry.id === 'stack') {
        const matchedCategory = (
            Object.entries(STACK_CATEGORY_PATTERNS) as Array<
                [keyof typeof MY_STACK, RegExp]
            >
        ).find(([, pattern]) => (query ? pattern.test(query) : false));

        if (matchedCategory) {
            const [category] = matchedCategory;
            const items = MY_STACK[category].map((item) => item.name).join(', ');

            return category === 'concepts'
                ? `Concepts Cyril highlights include ${items}.`
                : `Cyril's ${category} stack includes ${items}.`;
        }

        return toShortAnswer(
            `Cyril's stack includes React, Tailwind CSS, TypeScript, JavaScript, Node.js, Kotlin, PostgreSQL, MongoDB, AWS, and Kafka.`,
            'He also works with Figma, Cloudflare, GitHub Copilot, Amazon Q Developer, and other product and engineering tools.',
        );
    }

    if (primaryEntry.id === 'experience') {
        const experiencePreview = MY_EXPERIENCE.slice(0, 3)
            .map((experience) => `${experience.title} at ${experience.company}`)
            .join(', ');

        return toShortAnswer(
            `Cyril's experience includes ${experiencePreview}.`,
            'His work blends software development, systems thinking, and product execution.',
        );
    }

    if (primaryEntry.id === 'journey') {
        const milestones = JOURNEY_ITEMS.slice(0, 3)
            .map((item) => `${item.name} at ${item.organization}`)
            .join(', ');

        return toShortAnswer(
            `Cyril's Side Quest section includes milestones like ${milestones}.`,
            'That section focuses on the scholarships, advocacy, pitching, and community work that shaped how he builds.',
        );
    }

    if (primaryEntry.id === 'projects-overview') {
        const projectNames = PROJECTS.map((project) => project.title).join(', ');

        return toShortAnswer(
            `Projects across the site include ${projectNames}.`,
            'They span student marketplaces, AI and fraud detection, developer tooling, event platforms, and accessibility-focused work.',
        );
    }

    if (primaryEntry.id === 'outside-work') {
        const interests = OUTSIDE_WORK_INTERESTS.map((interest) => interest.title)
            .join(', ');

        return toShortAnswer(
            `Outside of work, Cyril enjoys ${interests}.`,
            'Those interests show up across the personality and Side Quest sections of the portfolio.',
        );
    }

    if (primaryEntry.id === 'contact') {
        return toShortAnswer(
            `You can reach Cyril at ${GENERAL_INFO.email}.`,
            'He also links out to LinkedIn, GitHub, Instagram, and X from the contact section.',
        );
    }

    if (primaryEntry.id.startsWith('project-')) {
        const project = PROJECTS.find(
            (candidate) => primaryEntry.id === `project-${candidate.slug}`,
        );

        if (!project) {
            return getPortfolioFallbackAnswer();
        }

        if (query && PROJECT_ROLE_PATTERN.test(query)) {
            return (
                getSentences(project.role).slice(0, 2).join(' ') ||
                `Cyril's role on ${project.title} is described in the project case study.`
            );
        }

        if (query && PROJECT_STACK_PATTERN.test(query)) {
            return `${project.title} uses ${project.techStack.join(', ')}.`;
        }

        if (query && PROJECT_OUTCOME_PATTERN.test(query) && project.caseStudy) {
            return (
                getSentences(project.caseStudy).slice(0, 3).join(' ') ||
                getSentences(project.description).slice(0, 2).join(' ')
            );
        }

        if (query && PROJECT_LINK_PATTERN.test(query) && project.liveUrl) {
            return `${project.title} is live at ${project.liveUrl}.`;
        }

        const description = getSentences(project.description).slice(0, 2).join(' ');

        return toShortAnswer(
            description,
            `The stack includes ${project.techStack.slice(0, 5).join(', ')}.`,
        );
    }

    if (
        primaryEntry.id.startsWith('product-') ||
        primaryEntry.id.startsWith('social-') ||
        primaryEntry.id.startsWith('resource-') ||
        primaryEntry.id === 'site-credit'
    ) {
        return primaryEntry.plainText;
    }

    return (
        getSentences(primaryEntry.plainText).slice(0, 2).join(' ') ||
        getPortfolioFallbackAnswer()
    );
}

function isHireOrContactIntent(query: string) {
    return HIRE_CONTACT_INTENT_PATTERN.test(query);
}

function getGeneralGuidanceKey(query: string) {
    const matchedPattern = GENERAL_GUIDANCE_PATTERNS.find(({ pattern }) =>
        pattern.test(query),
    );

    return matchedPattern?.key ?? 'default';
}

function looksLikeGeneralGuidanceQuestion(query: string) {
    const trimmed = query.trim();
    if (!trimmed || isHireOrContactIntent(trimmed)) {
        return false;
    }

    if (getPortfolioEntryMatch(trimmed)) {
        return false;
    }

    const normalized = normalizeText(trimmed);

    return (
        GENERAL_QUESTION_PATTERN.test(trimmed) ||
        trimmed.endsWith('?') ||
        /\b(advice|tips|best|great|strong|improve|become|build|approach)\b/i.test(
            normalized,
        )
    );
}

function getGeneralGuidanceAnswer(
    key: ReturnType<typeof getGeneralGuidanceKey>,
) {
    if (key === 'product') {
        return toShortAnswer(
            'In general, strong product engineers pair technical execution with user empathy, sharp prioritization, and the ability to turn ambiguity into usable systems.',
            'They communicate tradeoffs clearly, stay close to real user needs, and focus on outcomes instead of shipping features in isolation.',
        );
    }

    if (key === 'leadership') {
        return toShortAnswer(
            'In general, strong leaders create clarity, build trust, and help teams keep moving through ambiguity without losing momentum.',
            'They listen well, surface tradeoffs early, and make it easier for other people to do excellent work.',
        );
    }

    if (key === 'career') {
        return toShortAnswer(
            'In general, career growth comes from stacking real projects, strong communication, and a clear story about the decisions and tradeoffs behind your work.',
            'The strongest signal is usually concrete execution paired with reflection, not just polished claims.',
        );
    }

    if (key === 'engineering') {
        return toShortAnswer(
            'In general, strong engineers combine solid fundamentals with practical judgment, clear communication, and a bias toward solving the right problem.',
            'The best ones can move from ambiguity to execution while keeping users, maintainability, and tradeoffs in view.',
        );
    }

    return toShortAnswer(
        'In general, strong builders combine technical depth, clear communication, and an obsession with useful outcomes.',
        "If you want to see how Cyril approaches that, his experience, projects, and stack are the best next stops on the site.",
    );
}

function getGeneralGuidanceEntryIds(
    key: ReturnType<typeof getGeneralGuidanceKey>,
) {
    if (key === 'product') {
        return ['experience', 'projects-overview', 'stack'];
    }

    if (key === 'leadership') {
        return ['experience', 'journey', 'projects-overview'];
    }

    if (key === 'career') {
        return ['experience', 'education', 'projects-overview'];
    }

    if (key === 'engineering') {
        return ['stack', 'projects-overview', 'experience'];
    }

    return ['projects-overview', 'experience', 'contact'];
}

function getGeneralGuidanceFollowUps(
    key: ReturnType<typeof getGeneralGuidanceKey>,
) {
    if (key === 'product') {
        return [
            'Tell me about his projects',
            'What is his experience?',
            'How can I contact him?',
        ];
    }

    if (key === 'leadership') {
        return [
            'Tell me about his experience',
            'Show me his Side Quest',
            'How can I contact him?',
        ];
    }

    if (key === 'career') {
        return [
            'Tell me about his education',
            'What projects has he built?',
            'How can I contact him?',
        ];
    }

    if (key === 'engineering') {
        return [
            'What is his tech stack?',
            'Tell me about his projects',
            'How can I contact him?',
        ];
    }

    return [
        'Tell me about his projects',
        'What is his experience?',
        'How can I contact him?',
    ];
}

function getGeneralGuidanceActions(
    key: ReturnType<typeof getGeneralGuidanceKey>,
) {
    const entryIds = getGeneralGuidanceEntryIds(key);
    const [first, second, third] = entryIds;

    return [
        createScrollAction(first),
        createScrollAction(second),
        third === 'contact'
            ? createComposeEmailAction('Contact Cyril')
            : createScrollAction(third),
    ];
}

function buildEntryActions(entry: MatchableKnowledgeEntry) {
    if (entry.kind === 'project-detail' && entry.projectSlug) {
        return [
            createProjectAction(entry.projectSlug),
            createScrollAction('projects-overview', 'See more projects'),
            createComposeEmailAction('Contact Cyril'),
        ];
    }

    if (entry.kind === 'product-link') {
        return [
            entry.projectSlug
                ? createProjectAction(entry.projectSlug, 'Open case study')
                : createScrollAction('about-me-intro', 'View profile'),
            entry.externalHref
                ? createExternalAction(`Visit ${entry.title}`, entry.externalHref)
                : createScrollAction('about-me-intro', 'View profile'),
            createComposeEmailAction('Contact Cyril'),
        ];
    }

    if (entry.kind === 'stack-category' || entry.kind === 'stack-item') {
        return [
            createScrollAction('stack'),
            createScrollAction('projects-overview', 'View projects'),
            createScrollAction('experience', 'View experience'),
        ];
    }

    if (entry.kind === 'education-detail') {
        return [
            createScrollAction('education'),
            createScrollAction('experience', 'View experience'),
            createScrollAction('journey', 'View Side Quest'),
        ];
    }

    if (entry.kind === 'social-link' || entry.kind === 'resource-link') {
        return [
            entry.externalHref
                ? createExternalAction(`Open ${entry.title}`, entry.externalHref)
                : createScrollAction('contact'),
            createScrollAction('contact'),
            createComposeEmailAction('Contact Cyril'),
        ];
    }

    if (entry.kind === 'journey-detail') {
        return [
            createScrollAction('journey', 'View Side Quest'),
            entry.externalHref
                ? createExternalAction(`Open ${entry.title}`, entry.externalHref)
                : createScrollAction('experience', 'View experience'),
            createScrollAction('projects-overview', 'View projects'),
        ];
    }

    if (entry.kind === 'experience-detail') {
        return [
            createScrollAction('experience'),
            entry.externalHref
                ? createExternalAction(`Open ${entry.title}`, entry.externalHref)
                : createScrollAction('projects-overview', 'View projects'),
            createScrollAction('projects-overview', 'View projects'),
        ];
    }

    if (entry.kind === 'hero-stat') {
        return [
            createScrollAction('about-me-intro', 'View profile'),
            createScrollAction('projects-overview', 'View projects'),
            createExternalAction('Open resume', ABOUT_ME_CONTENT.hireMeUrl),
        ];
    }

    if (entry.kind === 'outside-work-detail') {
        return [
            createScrollAction('outside-work'),
            createScrollAction('about-me-intro', 'View profile'),
            createScrollAction('projects-overview', 'View projects'),
        ];
    }

    if (entry.kind === 'hero') {
        return [
            createScrollAction('about-me-intro', 'View profile'),
            createScrollAction('projects-overview', 'View projects'),
            createExternalAction('Open resume', ABOUT_ME_CONTENT.hireMeUrl),
        ];
    }

    if (entry.kind === 'site-credit') {
        return [
            entry.externalHref
                ? createExternalAction('Open portfolio repo', entry.externalHref)
                : createScrollAction('contact'),
            createScrollAction('contact'),
            createScrollAction('projects-overview', 'View projects'),
        ];
    }

    const adjacentSectionId = ADJACENT_SECTION_MAP[entry.id];

    return [
        createScrollAction(entry.id),
        adjacentSectionId ? createScrollAction(adjacentSectionId) : null,
    ].filter(Boolean) as ChatAction[];
}

function getFollowUpsForEntry(entry: MatchableKnowledgeEntry) {
    if (entry.kind === 'project-detail') {
        return [
            `What was Cyril's role on ${entry.title}?`,
            `What stack did he use for ${entry.title}?`,
            'Show me more projects',
        ];
    }

    if (entry.id === 'about-me-intro') {
        return [
            'What is his tech stack?',
            'Tell me about his experience',
            'Tell me about his projects',
        ];
    }

    if (entry.id === 'education') {
        return [
            'Tell me about his experience',
            'What projects has he built?',
            'How can I contact him?',
        ];
    }

    if (entry.id === 'products-worked-on') {
        return [
            'Tell me about Campus Hustle',
            'Tell me about Georim',
            'How can I contact him?',
        ];
    }

    if (entry.id === 'stack') {
        return [
            'Which projects use this stack?',
            'Tell me about his experience',
            'How can I contact him?',
        ];
    }

    if (entry.id === 'experience') {
        return [
            'Tell me about his projects',
            'What is his tech stack?',
            'How can I contact him?',
        ];
    }

    if (entry.id === 'journey') {
        return [
            'Tell me about his experience',
            'Tell me about his projects',
            'How can I contact him?',
        ];
    }

    if (entry.id === 'projects-overview') {
        return [
            'Tell me about Georim',
            'What is his tech stack?',
            'How can I contact him?',
        ];
    }

    if (entry.id === 'outside-work') {
        return [
            'Tell me about his projects',
            'What is his experience?',
            'How can I contact him?',
        ];
    }

    if (entry.kind === 'stack-category' || entry.kind === 'stack-item') {
        return [
            'Which projects use this stack?',
            'Tell me about his experience',
            'How can I contact him?',
        ];
    }

    if (entry.kind === 'education-detail') {
        return [
            'Tell me about his experience',
            'Show me his Side Quest',
            'How can I contact him?',
        ];
    }

    if (entry.kind === 'product-link') {
        return [
            `Tell me more about ${entry.title}`,
            'What is his tech stack?',
            'How can I contact him?',
        ];
    }

    if (entry.kind === 'experience-detail') {
        return [
            'Tell me about his projects',
            'What is his tech stack?',
            'How can I contact him?',
        ];
    }

    if (entry.kind === 'journey-detail') {
        return [
            'Tell me about his experience',
            'Tell me about his projects',
            'How can I contact him?',
        ];
    }

    if (entry.kind === 'social-link' || entry.kind === 'resource-link') {
        return [
            'How can I contact him?',
            'Tell me about his projects',
            'What is his experience?',
        ];
    }

    if (entry.kind === 'outside-work-detail') {
        return [
            'Tell me about his projects',
            'Who is Cyril?',
            'How can I contact him?',
        ];
    }

    if (entry.kind === 'hero') {
        return [
            'Who is Cyril?',
            'Tell me about his projects',
            'How can I contact him?',
        ];
    }

    if (entry.kind === 'hero-stat' || entry.kind === 'site-credit') {
        return [
            'Who is Cyril?',
            'Tell me about his projects',
            'How can I contact him?',
        ];
    }

    return [
        'Tell me about his experience',
        'Tell me about his projects',
        'How can I contact him?',
    ];
}

function getContextIdsForActions(actions: ChatAction[]) {
    return actions.flatMap((action) => {
        if (action.kind === 'open_project' && action.projectSlug) {
            return [`project-${action.projectSlug}`, 'projects-overview'];
        }

        if (action.kind === 'scroll_to_section' && action.sectionId) {
            const sectionHref = `/#${action.sectionId}`;
            const matchedSection = ALL_MATCHABLE_ENTRIES.find(
                (entry) => entry.href === sectionHref && entry.kind === 'section',
            );

            return matchedSection ? [matchedSection.id] : [];
        }

        return [];
    });
}

function buildContactPlan(query: string): PortfolioChatPlan {
    const wantsResume = /\b(resume|cv|hire me)\b/i.test(query);
    const answer = toShortAnswer(
        `The easiest way to reach Cyril is by email at ${GENERAL_INFO.email}.`,
        wantsResume
            ? 'You can also open the contact section or review his hire-me materials from the resume link.'
            : 'I can also take you to the contact section or help draft the email right here.',
    );

    return {
        response: buildChatResponse(
            answer,
            [{ label: 'Contact', href: '/#contact' }],
            [
                createComposeEmailAction(),
                createScrollAction('contact'),
                createExternalAction('Open resume', ABOUT_ME_CONTENT.hireMeUrl),
            ],
            [
                'Tell me about his experience',
                'Tell me about his projects',
                'What is his tech stack?',
            ],
            'portfolio',
        ),
        contextEntries: getEntriesByIds(['contact', 'experience', 'projects-overview']),
        shouldUseModel: false,
    };
}

function buildGreetingPlan(query: string): PortfolioChatPlan {
    const normalizedQuery = normalizeText(query);
    const greeting =
        normalizedQuery.startsWith('good morning')
            ? 'Good morning'
            : normalizedQuery.startsWith('good afternoon')
              ? 'Good afternoon'
              : normalizedQuery.startsWith('good evening')
                ? 'Good evening'
                : 'Hey';

    return {
        response: buildChatResponse(
            `${greeting}! I can help you explore Cyril's background, projects, tech stack, experience, or contact info.`,
            [],
            [
                createScrollAction('about-me-intro', 'View profile'),
                createScrollAction('projects-overview', 'View projects'),
                createComposeEmailAction('Contact Cyril'),
            ],
            [
                'Who is Cyril?',
                'What is his tech stack?',
                'Tell me about his projects',
            ],
            'portfolio',
        ),
        contextEntries: getEntriesByIds([
            'about-me-intro',
            'projects-overview',
            'experience',
        ]),
        shouldUseModel: false,
    };
}

function buildPortfolioEntryPlan(
    query: string,
    entry: MatchableKnowledgeEntry,
): PortfolioChatPlan {
    if (entry.id === 'contact') {
        return buildContactPlan(query);
    }

    const references = getPortfolioReferences(query);
    const answer = getPortfolioAnswerForEntry(entry, query);
    const followUps = getFollowUpsForEntry(entry);
    const actions = buildEntryActions(entry);
    const contextIds = dedupeStrings([
        entry.id,
        ...getContextIdsForActions(actions),
        'contact',
    ]);

    return {
        response: buildChatResponse(answer, references, actions, followUps, 'portfolio'),
        contextEntries: getEntriesByIds(contextIds),
        shouldUseModel: true,
    };
}

function buildGeneralGuidancePlan(query: string): PortfolioChatPlan {
    const key = getGeneralGuidanceKey(query);
    const entryIds = getGeneralGuidanceEntryIds(key);

    return {
        response: buildChatResponse(
            getGeneralGuidanceAnswer(key),
            [],
            getGeneralGuidanceActions(key),
            getGeneralGuidanceFollowUps(key),
            'general',
        ),
        contextEntries: getEntriesByIds(entryIds),
        shouldUseModel: true,
    };
}

function buildRedirectPlan(): PortfolioChatPlan {
    return {
        response: buildChatResponse(
            "I can help with Cyril's background, projects, stack, experience, or ways to get in touch. Try one of the next steps below.",
            [],
            [
                createScrollAction('projects-overview'),
                createScrollAction('experience'),
                createComposeEmailAction('Contact Cyril'),
            ],
            [
                'Who is Cyril?',
                'What is his tech stack?',
                'Tell me about his projects',
            ],
            'portfolio',
        ),
        contextEntries: getEntriesByIds([
            'projects-overview',
            'experience',
            'contact',
        ]),
        shouldUseModel: false,
    };
}

export function getPortfolioChatPlan(query: string): PortfolioChatPlan {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        return buildRedirectPlan();
    }

    if (isGreetingOnly(trimmedQuery)) {
        return buildGreetingPlan(trimmedQuery);
    }

    if (isHireOrContactIntent(trimmedQuery)) {
        return buildContactPlan(trimmedQuery);
    }

    const portfolioEntry = getPortfolioEntryMatch(trimmedQuery);
    if (portfolioEntry) {
        return buildPortfolioEntryPlan(trimmedQuery, portfolioEntry);
    }

    if (looksLikeGeneralGuidanceQuestion(trimmedQuery)) {
        return buildGeneralGuidancePlan(trimmedQuery);
    }

    return buildRedirectPlan();
}

export function getPortfolioFallbackAnswer() {
    return "I couldn't find that information on Cyril's portfolio.";
}

export function getAssistantUnavailableAnswer() {
    return 'The assistant is temporarily unavailable.';
}
