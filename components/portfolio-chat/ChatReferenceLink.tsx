'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

import { ChatReference } from '@/types';
import { cn } from '@/lib/utils';

interface ChatReferenceLinkProps {
    reference: ChatReference;
    className?: string;
}

export default function ChatReferenceLink({
    reference,
    className,
}: ChatReferenceLinkProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const isHomepageAnchor = reference.href.startsWith('/#');
        if (!isHomepageAnchor) {
            return;
        }

        const hash = reference.href.slice(2);

        if (pathname === '/') {
            event.preventDefault();

            const element = document.getElementById(hash);
            if (!element) {
                return;
            }

            window.history.replaceState(null, '', reference.href);
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        event.preventDefault();
        router.push(reference.href);
    };

    return (
        <Link
            href={reference.href}
            onClick={handleClick}
            className={cn(
                'inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                className,
            )}
        >
            Learn more: {reference.label}
        </Link>
    );
}
