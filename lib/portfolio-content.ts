import { IProject } from '@/types';
import {
    GENERAL_INFO,
    MY_EXPERIENCE,
    MY_STACK,
    PRODUCTS_WORKED_ON,
    PROJECTS,
    SOCIAL_LINKS,
} from '@/lib/data';

export { GENERAL_INFO, MY_EXPERIENCE, MY_STACK, PRODUCTS_WORKED_ON, PROJECTS, SOCIAL_LINKS };

export const ABOUT_ME_CONTENT = {
    heading:
        'I take a user-centered approach to design, making sure each product is thoughtfully crafted around the real needs and experiences of the people who will use it.',
    introLabel: 'This is me.',
    name: "Hi, I'm Cyril.",
    fullName: 'Cyril Ofori Kupualor',
    summary:
        "I'm a software developer and technical product manager focused on building thoughtful, scalable solutions. I combine hands-on engineering with product strategy to turn complex problems into intuitive, high-impact experiences.",
    approach:
        'My approach blends user-centered design, technical execution, and business alignment. By prioritizing performance, accessibility, and clarity, I create solutions that are not only seamless for users, but also meaningful for stakeholders and sustainable for teams.',
    contactLead: "I guess you're already convinced -",
    contactLinkLabel: 'Shoot me an email',
    footer:
        'Still wondering? Take a look through my portfolio and see for yourself below.',
    hireMeUrl:
        'https://drive.google.com/drive/folders/1l4zOKYSkwJYpdMHJ-vSNvVbXOQHtiWYj',
};

export const EDUCATION = {
    school: 'Grambling State University',
    degree: 'B.S. Computer Science',
    minor: 'B.A. Business Management',
    gpa: '3.94 / 4.0',
    location: 'Grambling, Louisiana',
    logo: '/logo/gsu-logo.png',
    campus: '/projects/images/gsu-campus.png',
    coursework: [
        'Data Structures & Algorithms',
        'Database Systems',
        'Operating Systems',
        'Software Engineering',
        'Calculus I & II',
        'Intro to Artificial Intelligence',
    ],
    awards: [
        'Presidential Academic Scholar',
        'TMCF Citi Scholar',
        'Strada Scholar',
        'Innovation Award',
        'Emerging Leaders Award',
    ],
    activities: [
        {
            name: 'National Society of Black Engineers',
            role: 'Chapter Treasurer',
        },
        {
            name: 'National Association of Black Accountants',
            role: 'Director of Corporate Sponsorships',
        },
        { name: 'GSU LS-Lamp Scholar', role: 'Student Researcher' },
        { name: 'ColorStack... and more', role: '' },
    ],
};

export type JourneyTag =
    | 'fellowship'
    | 'scholarship'
    | 'hackathon'
    | 'pitch'
    | 'leadership'
    | 'community';

interface JourneyItem {
    stat: string;
    name: string;
    organization: string;
    tag: JourneyTag;
    description: string;
    imageUrl: string;
    link?: string;
}

export const JOURNEY_ITEMS: JourneyItem[] = [
    {
        stat: '36 Hr',
        name: 'HackPrinceton',
        organization: 'Princeton University',
        tag: 'hackathon',
        description:
            "Joined Princeton University's global 36-hour hackathon to build fast, solve under pressure, and sharpen ideas with other makers.",
        imageUrl: '/projects/images/my journey/Princeton Hacks.jpg',
    },
    {
        stat: 'Pitch Day',
        name: 'Mastercard Data Challenge',
        organization: 'AUC Data Science Club',
        tag: 'pitch',
        description:
            'Presented a data-driven story live, translating analysis into clear findings people could immediately act on.',
        imageUrl: '/projects/images/my journey/mastercard pitch.jpg',
    },
    {
        stat: 'Founder',
        name: 'ExposeToEmpower Initiative',
        organization: 'STEM Workshop',
        tag: 'community',
        description:
            'For many students, it was their first time ever seeing a mouse cursor move. We introduced computer basics, simple coding, and Arduino activities - opening a door to what technology could be for them.',
        imageUrl: '/projects/images/my journey/teaching kids.JPG',
        link: 'https://www.linkedin.com/posts/cyril-kups_stemeducation-bridgingthedigitaldivide-futureready-activity-7212237297390370816-m9A8/?utm_medium=ios_app&rcm=ACoAADlbc1ABX_Smvfrl1bROAQpVgIhz-kRcZl4&utm_source=social_share_send&utm_campaign=copy_link',
    },
    {
        stat: 'JPMC',
        name: 'Data for Good Hackathon',
        organization: 'JPMorganChase',
        tag: 'hackathon',
        description:
            "Applied data skills to a community-impact challenge through JPMorganChase's Data for Good Hackathon.",
        imageUrl: '/projects/images/my journey/JPMC Hackathon.jpeg',
    },
    {
        stat: '1 of 3',
        name: 'Strada Scholar',
        organization: 'Strada Education Foundation',
        tag: 'fellowship',
        description:
            'Chosen as one of three students campus-wide to participate in a leadership and career advancement fellowship. Worked alongside industry mentors to design community impact initiatives and strengthen access to meaningful career opportunities for students.',
        imageUrl: '/projects/images/my journey/Strada.JPG',
        link: 'https://youtu.be/Bd-e7JvvylQ?si=qLTtDmmn16xI9QPQ',
    },
    {
        stat: '3x',
        name: 'TMCF Scholar',
        organization: 'Thurgood Marshall College Fund',
        tag: 'scholarship',
        description:
            'Selected across three cycles, sharpening my focus on growth, opportunity, and mentoring other students.',
        imageUrl: '/projects/images/my journey/TMCF.PNG',
        link: 'https://tmcf.org/photos/citi-hbcu-immersion-2025/',
    },
    {
        stat: 'Expo',
        name: 'AfroTech Conference',
        organization: 'AfroTech',
        tag: 'leadership',
        description:
            'Showed up to AfroTech to learn from top builders, grow my network, and stay close to where technology and culture meet.',
        imageUrl: '/projects/images/my journey/Afrotech Conference.jpeg',
    },
    {
        stat: 'Milestone',
        name: 'The Thunderbolt',
        organization: 'Personal Challenge',
        tag: 'leadership',
        description: 'Sometimes the challenge is simply saying "okay, go."',
        imageUrl: '/projects/images/my journey/rollercoaster.JPG',
    },
];

type OutsideWorkIconKey =
    | 'trophy'
    | 'waves'
    | 'music'
    | 'cpu'
    | 'coffee'
    | 'plane';

interface OutsideWorkInterest {
    title: string;
    imageSrc: string;
    iconKey: OutsideWorkIconKey;
    isGif?: boolean;
}

export const OUTSIDE_WORK_INTERESTS: OutsideWorkInterest[] = [
    {
        title: 'Volleyball',
        imageSrc: '/projects/gif/volleyball_6450964.gif',
        iconKey: 'trophy',
        isGif: true,
    },
    {
        title: 'Swimming',
        imageSrc: '/projects/gif/swimming_17091781.gif',
        iconKey: 'waves',
        isGif: true,
    },
    {
        title: 'Beatboxing',
        imageSrc: '/projects/gif/singer_9538514.gif',
        iconKey: 'music',
        isGif: true,
    },
    {
        title: 'Robotics',
        imageSrc: '/projects/gif/robot_9066225.gif',
        iconKey: 'cpu',
        isGif: true,
    },
    {
        title: 'Sketching',
        imageSrc: '/projects/gif/drawing_13936733.gif',
        iconKey: 'coffee',
        isGif: true,
    },
    {
        title: 'Traveling',
        imageSrc: '/projects/gif/travel_8112689.gif',
        iconKey: 'plane',
        isGif: true,
    },
];

const FEATURED_PROJECT_SLUGS = [
    'campus-hustle',
    'card-fraud-detect-ai',
    'spec-linter',
    'georim',
    'braille-technology',
] as const;

const HIDDEN_PROJECT_SLUGS = [
    'doc-link',
    'stock-insight-engine',
    'quick-reach',
] as const;

export const FEATURED_PROJECTS = FEATURED_PROJECT_SLUGS.map((slug) =>
    PROJECTS.find((project) => project.slug === slug),
).filter(Boolean) as IProject[];

export const HIDDEN_PROJECTS = HIDDEN_PROJECT_SLUGS.map((slug) =>
    PROJECTS.find((project) => project.slug === slug),
).filter(Boolean) as IProject[];
