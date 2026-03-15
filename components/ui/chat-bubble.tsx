'use client';

import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageLoading } from '@/components/ui/message-loading';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
    variant?: 'sent' | 'received';
    className?: string;
    children: React.ReactNode;
}

export function ChatBubble({
    variant = 'received',
    className,
    children,
}: ChatBubbleProps) {
    return (
        <div
            className={cn(
                'mb-4 flex items-start gap-2',
                variant === 'sent' && 'flex-row-reverse',
                className,
            )}
        >
            {children}
        </div>
    );
}

interface ChatBubbleMessageProps {
    variant?: 'sent' | 'received';
    isLoading?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function ChatBubbleMessage({
    variant = 'received',
    isLoading,
    className,
    children,
}: ChatBubbleMessageProps) {
    return (
        <div
            className={cn(
                'max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words',
                variant === 'sent'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground',
                className,
            )}
        >
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <MessageLoading />
                </div>
            ) : (
                children
            )}
        </div>
    );
}

interface ChatBubbleAvatarProps {
    src?: string;
    fallback?: string;
    className?: string;
}

export function ChatBubbleAvatar({
    src,
    fallback = 'AI',
    className,
}: ChatBubbleAvatarProps) {
    return (
        <Avatar className={cn('h-8 w-8 shrink-0 border border-border', className)}>
            {src ? <AvatarImage src={src} /> : null}
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}
