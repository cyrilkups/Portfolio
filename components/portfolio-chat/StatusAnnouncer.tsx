'use client';

interface StatusAnnouncerProps {
    message: string;
}

export default function StatusAnnouncer({
    message,
}: StatusAnnouncerProps) {
    return (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
            {message}
        </div>
    );
}
