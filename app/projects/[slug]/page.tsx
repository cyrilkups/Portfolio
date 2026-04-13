import { notFound } from 'next/navigation';
import ProjectDetails from './_components/ProjectDetails';
import { PROJECTS } from '@/lib/data';
import { Metadata } from 'next';

const PROJECT_DESCRIPTION_MAX_LENGTH = 160;

function toPlainText(html: string) {
    return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function truncateAtWordBoundary(text: string, maxLength: number) {
    if (text.length <= maxLength) {
        return text;
    }

    const truncated = text.slice(0, maxLength + 1);
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex === -1) {
        return `${text.slice(0, maxLength - 3).trim()}...`;
    }

    return `${truncated.slice(0, lastSpaceIndex).trim()}...`;
}

export const generateStaticParams = async () => {
    return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
    const { slug } = await params;
    const project = PROJECTS.find((project) => project.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found - kups.dev',
            description: 'The requested project could not be found.',
        };
    }

    return {
        title: `${project.title} - ${project.techStack.slice(0, 3).join(', ')}`,
        description: truncateAtWordBoundary(
            toPlainText(project.description),
            PROJECT_DESCRIPTION_MAX_LENGTH,
        ),
        alternates: {
            canonical: `https://me.toinfinite.dev/projects/${project.slug}`,
        },
    };
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const project = PROJECTS.find((project) => project.slug === slug);

    if (!project) {
        return notFound();
    }

    return <ProjectDetails project={project} />;
};

export default Page;
