import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { GitFork, Star } from 'lucide-react';
import { Icon } from '@iconify/react';

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

const Footer = async () => {
    const repoStats = await fetch(
        'https://api.github.com/repos/tajmirul/portfolio-2.0',
        {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        },
    );

    const { stargazers_count, forks_count } =
        (await repoStats.json()) as RepoStats;

    return (
        <footer className="text-center pb-5" id="contact">
            <div className="container">
                <p className="text-lg">Have a project in mind?</p>
                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline"
                >
                    {GENERAL_INFO.email}
                </a>

                <div className="flex items-center justify-center gap-6 mb-8">
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-white transition-colors"
                        >
                            <Icon icon={link.icon} className="w-6 h-6" />
                        </a>
                    ))}
                </div>

                <div className="">
                    <a
                        href="https://github.com/Tajmirul/portfolio-2.0"
                        target="_blank"
                        className="leading-none text-muted-foreground hover:underline hover:text-white"
                    >
                        Designed & Built by Cyril Kupualor
                    </a>
                    <p className="text-muted-foreground mt-2">
                        © {new Date().getFullYear()} Cyril Kupualor. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
