import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/data';

const BASE_URL = 'https://me.toinfinite.dev';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return [
        {
            url: BASE_URL,
            lastModified,
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...PROJECTS.map((project) => ({
            url: `${BASE_URL}/projects/${project.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ];
}
