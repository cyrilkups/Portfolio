import { ChatReference, PortfolioKnowledgeEntry } from '@/types';
import {
    ABOUT_ME_CONTENT,
    EDUCATION,
    FEATURED_PROJECTS,
    GENERAL_INFO,
    MY_EXPERIENCE,
    MY_STACK,
    OUTSIDE_WORK_INTERESTS,
    PROJECTS,
    SNAPSHOT_HIGHLIGHTS,
    SOCIAL_LINKS,
} from '@/lib/portfolio-content';

interface MatchableKnowledgeEntry extends PortfolioKnowledgeEntry {
    aliases?: string[];
    kind?: 'section' | 'project-detail' | 'project-overview';
    projectSlug?: string;
}

export interface PortfolioKnowledgeMatch {
    entry: PortfolioKnowledgeEntry;
    score: number;
}

const MODEL_CALL_THRESHOLD = 25;
const REFERENCE_THRESHOLD = 35;
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

export function sanitizePlainText(value: string) {
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

export function normalizeText(value: string) {
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

function snapshotSummary() {
    return SNAPSHOT_HIGHLIGHTS.map(
        (highlight) =>
            `${highlight.name}: ${highlight.title}. ${highlight.description}`,
    ).join(' ');
}

function outsideWorkSummary() {
    return OUTSIDE_WORK_INTERESTS.map((interest) => interest.title).join(', ');
}

function projectOverviewSummary() {
    return PROJECTS.map(
        (project) =>
            `${project.title}: ${sanitizePlainText(project.description)} Tech stack: ${project.techStack.join(', ')}.`,
    ).join(' ');
}

const SECTION_ENTRIES: MatchableKnowledgeEntry[] = [
    {
        id: 'about-me-intro',
        title: 'About Cyril',
        plainText: sanitizePlainText(
            joinIfPresent([
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
        ],
        label: 'This is me',
        href: '/#about-me-intro',
        aliases: ['who is cyril', 'about cyril', 'this is me', 'background'],
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
        id: 'snapshot',
        title: 'Snapshot Highlights',
        plainText: sanitizePlainText(snapshotSummary()),
        keywords: ['snapshot', 'awards', 'leadership', 'highlights'],
        label: 'Cyril in a Snapshot',
        href: '/#snapshot',
        aliases: ['snapshot', 'awards', 'leadership', 'highlights'],
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

export const PORTFOLIO_KNOWLEDGE: PortfolioKnowledgeEntry[] = [
    ...SECTION_ENTRIES,
    ...PROJECT_ENTRIES,
];

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

export function getTopPortfolioMatches(query: string, limit = 3) {
    const entries = [...SECTION_ENTRIES, ...PROJECT_ENTRIES];

    return entries
        .map((entry) => ({
            entry,
            score: scoreEntry(query, entry, entries),
        }))
        .filter((match) => match.score > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, limit);
}

export function shouldCallPortfolioModel(query: string) {
    const bestMatch = getTopPortfolioMatches(query, 1)[0];
    return Boolean(bestMatch && bestMatch.score >= MODEL_CALL_THRESHOLD);
}

export function getPortfolioReferences(query: string): ChatReference[] {
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
        /^(who|what|tell me|how|can you|where|why|which|do you)\b/i.test(
            trimmed,
        ) ||
        trimmed.endsWith('?')
    ) {
        return true;
    }

    const bestMatch = getTopPortfolioMatches(trimmed, 1)[0];
    return Boolean(bestMatch && bestMatch.score >= REFERENCE_THRESHOLD);
}

export function getPortfolioContextEntries(query: string) {
    return getTopPortfolioMatches(query, 3).map((match) => match.entry);
}

export function getPortfolioLocalAnswer(query: string) {
    const [primaryEntry] = getPortfolioContextEntries(query);

    if (!primaryEntry) {
        return getPortfolioFallbackAnswer();
    }

    if (primaryEntry.id === 'about-me-intro') {
        return toShortAnswer(
            ABOUT_ME_CONTENT.summary,
            ABOUT_ME_CONTENT.approach,
        );
    }

    if (primaryEntry.id === 'education') {
        return toShortAnswer(
            `Cyril attends ${EDUCATION.school}, where he is pursuing ${EDUCATION.degree} with a ${EDUCATION.minor}.`,
            `He has a GPA of ${EDUCATION.gpa}, and coursework includes ${EDUCATION.coursework.slice(0, 3).join(', ')}.`,
        );
    }

    if (primaryEntry.id === 'stack') {
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

    if (primaryEntry.id === 'snapshot') {
        const highlights = SNAPSHOT_HIGHLIGHTS.slice(0, 3)
            .map((highlight) => highlight.name)
            .join(', ');

        return toShortAnswer(
            `Highlights from Cyril's portfolio include ${highlights}.`,
            'They reflect leadership, scholarships, student advocacy, and community impact.',
        );
    }

    if (primaryEntry.id === 'projects-overview') {
        const projectNames = FEATURED_PROJECTS.map((project) => project.title).join(
            ', ',
        );

        return toShortAnswer(
            `Featured projects include ${projectNames}.`,
            'They span student marketplaces, AI and fraud detection, developer tooling, event platforms, and accessibility-focused work.',
        );
    }

    if (primaryEntry.id === 'outside-work') {
        const interests = OUTSIDE_WORK_INTERESTS.map((interest) => interest.title)
            .join(', ');

        return toShortAnswer(
            `Outside of work, Cyril enjoys ${interests}.`,
            'Those interests show up across the personality and snapshot sections of the portfolio.',
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

        const description = getSentences(project.description).slice(0, 2).join(' ');

        return toShortAnswer(
            description,
            `The stack includes ${project.techStack.slice(0, 5).join(', ')}.`,
        );
    }

    return (
        getSentences(primaryEntry.plainText).slice(0, 2).join(' ') ||
        getPortfolioFallbackAnswer()
    );
}

export function getPortfolioFallbackAnswer() {
    return "I couldn't find that information on Cyril's portfolio.";
}

export function getAssistantUnavailableAnswer() {
    return 'The assistant is temporarily unavailable.';
}
