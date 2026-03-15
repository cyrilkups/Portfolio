export type Variant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'no-color';

export interface IProject {
    title: string;
    year: number;
    description: string;
    role: string;
    caseStudy?: string;
    techStack: string[];
    thumbnail: string;
    longThumbnail: string;
    images: string[];
    slug: string;
    liveUrl?: string;
    sourceCode?: string;
}

export interface IExperience {
    title: string;
    company: string;
    duration: string;
    url?: string;
}

export interface ChatReference {
    label: string;
    href: string;
}

export type ChatResponseScope = 'portfolio' | 'general';

export interface ChatAction {
    kind:
        | 'scroll_to_section'
        | 'open_project'
        | 'open_external'
        | 'compose_email';
    label: string;
    href?: string;
    sectionId?: string;
    projectSlug?: string;
}

export interface ChatMessage {
    id: string;
    role: 'assistant' | 'user';
    content: string;
    references?: ChatReference[];
    actions?: ChatAction[];
    followUps?: string[];
    scope?: ChatResponseScope;
    fallbackHref?: string;
    fallbackLabel?: string;
}

export interface PendingAction {
    type: 'compose_email';
}

export interface PortfolioChatResponse {
    answer: string;
    references: ChatReference[];
    actions: ChatAction[];
    followUps: string[];
    scope: ChatResponseScope;
}

export interface PortfolioKnowledgeEntry {
    id: string;
    title: string;
    plainText: string;
    keywords: string[];
    label: string;
    href: string;
}
