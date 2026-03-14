'use client';

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Bot, CornerDownLeft } from 'lucide-react';

import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from '@/components/ui/chat-bubble';
import { ChatInput } from '@/components/ui/chat-input';
import { ChatMessageList } from '@/components/ui/chat-message-list';
import {
    ExpandableChat,
    ExpandableChatBody,
    ExpandableChatFooter,
    ExpandableChatHeader,
} from '@/components/ui/expandable-chat';
import { Button } from '@/components/ui/button';
import ChatReferenceLink from '@/components/portfolio-chat/ChatReferenceLink';
import StatusAnnouncer from '@/components/portfolio-chat/StatusAnnouncer';
import { usePortfolioChat } from '@/components/portfolio-chat/PortfolioChatProvider';
import { PRELOADER_DURATION_MS } from '@/components/PreloaderWrapper';
import { cn } from '@/lib/utils';

const SUGGESTED_PROMPTS = [
    'Who is Cyril?',
    'What is his tech stack?',
    'Tell me about his projects',
    'How can I contact him?',
] as const;

function getFocusableElements(container: HTMLElement) {
    return Array.from(
        container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
    ).filter(
        (element) =>
            !element.hasAttribute('disabled') &&
            element.getAttribute('aria-hidden') !== 'true',
    );
}

export default function PortfolioChat() {
    const {
        isLoading,
        isOpen,
        messages,
        pendingAction,
        setIsOpen,
        submitMessage,
        submitSuggestedPrompt,
    } = usePortfolioChat();
    const [input, setInput] = useState('');
    const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);
    const [announcement, setAnnouncement] = useState('');
    const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
    const chatContentRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsPreloaderComplete(true);
        }, PRELOADER_DURATION_MS);

        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 639px)');
        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobileFullscreen(event.matches);
        };

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        } else {
            toggleButtonRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || isMobileFullscreen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent | globalThis.KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMobileFullscreen, isOpen, setIsOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node | null;
            if (!target) {
                return;
            }

            if (
                chatContentRef.current?.contains(target) ||
                toggleButtonRef.current?.contains(target)
            ) {
                return;
            }

            setIsOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [isOpen, setIsOpen]);

    useEffect(() => {
        if (!isOpen || !isMobileFullscreen || !chatContentRef.current) {
            return;
        }

        const container = chatContentRef.current;
        const focusableElements = getFocusableElements(container);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        firstElement?.focus();

        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key !== 'Tab' || focusableElements.length < 2) {
                return;
            }

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement?.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement?.focus();
            }
        };

        container.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMobileFullscreen, isOpen, messages.length]);

    useEffect(() => {
        if (isLoading) {
            setAnnouncement('Assistant is responding.');
            return;
        }

        const latestAssistantMessage = [...messages]
            .reverse()
            .find((message) => message.role === 'assistant');

        if (latestAssistantMessage) {
            setAnnouncement(latestAssistantMessage.content);
        }
    }, [isLoading, messages]);

    const pendingHint = useMemo(() => {
        if (pendingAction?.type === 'compose_email') {
            return 'Compose mode is active. Enter the email message or type cancel.';
        }

        return '';
    }, [pendingAction]);

    const handleSubmit = async (event?: FormEvent) => {
        event?.preventDefault();
        const value = input.trim();
        if (!value || isLoading) {
            return;
        }

        setInput('');
        await submitMessage(value);
    };

    const handleInputKeyDown = async (
        event: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            await handleSubmit();
        }
    };

    if (!isPreloaderComplete) {
        return null;
    }

    return (
        <>
            <StatusAnnouncer message={announcement || pendingHint} />
            <ExpandableChat
                size="lg"
                position="bottom-right"
                icon={<Bot className="h-6 w-6" />}
                open={isOpen}
                onOpenChange={setIsOpen}
                contentRef={chatContentRef}
                toggleRef={toggleButtonRef}
                toggleButtonProps={{
                    'aria-label': isOpen ? 'Close chat' : 'Open chat',
                }}
                closeButtonProps={{
                    'aria-label': 'Close chat',
                }}
            >
                <ExpandableChatHeader className="flex-col items-start gap-2 pr-12 text-left">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            Cyril&apos;s portfolio assistant
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Ask about Cyril&apos;s background, projects, stack, or
                            experience.
                        </p>
                    </div>
                    <div
                        className="flex w-full flex-wrap gap-2"
                        aria-label="Suggested prompts"
                    >
                        {SUGGESTED_PROMPTS.map((prompt) => (
                            <button
                                key={prompt}
                                type="button"
                                onClick={() => submitSuggestedPrompt(prompt)}
                                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                disabled={isLoading}
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </ExpandableChatHeader>

                <ExpandableChatBody>
                    <ChatMessageList smooth>
                        {messages.map((message) => (
                            <div key={message.id}>
                                <ChatBubble
                                    variant={
                                        message.role === 'user'
                                            ? 'sent'
                                            : 'received'
                                    }
                                >
                                    <ChatBubbleAvatar
                                        fallback={
                                            message.role === 'user' ? 'CK' : 'AI'
                                        }
                                    />
                                    <div
                                        className={cn(
                                            'flex flex-col gap-2',
                                            message.role === 'user' &&
                                                'items-end',
                                        )}
                                    >
                                        <ChatBubbleMessage
                                            variant={
                                                message.role === 'user'
                                                    ? 'sent'
                                                    : 'received'
                                            }
                                        >
                                            {message.content}
                                        </ChatBubbleMessage>

                                        {message.references?.length ? (
                                            <div
                                                className={cn(
                                                    'flex flex-wrap gap-2',
                                                    message.role === 'user' &&
                                                        'justify-end',
                                                )}
                                                aria-label="Message references"
                                            >
                                                {message.references.map((reference) => (
                                                    <ChatReferenceLink
                                                        key={`${message.id}-${reference.href}`}
                                                        reference={reference}
                                                    />
                                                ))}
                                            </div>
                                        ) : null}

                                        {message.fallbackHref ? (
                                            <div
                                                className={cn(
                                                    'flex flex-wrap gap-2',
                                                    message.role === 'user' &&
                                                        'justify-end',
                                                )}
                                            >
                                                <a
                                                    href={message.fallbackHref}
                                                    className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                                >
                                                    {message.fallbackLabel ?? 'Open draft'}
                                                </a>
                                            </div>
                                        ) : null}
                                    </div>
                                </ChatBubble>
                            </div>
                        ))}

                        {isLoading ? (
                            <ChatBubble variant="received">
                                <ChatBubbleAvatar fallback="AI" />
                                <ChatBubbleMessage isLoading />
                            </ChatBubble>
                        ) : null}
                    </ChatMessageList>
                </ExpandableChatBody>

                <ExpandableChatFooter>
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-xl border border-border bg-background p-2 focus-within:ring-1 focus-within:ring-ring"
                    >
                        <ChatInput
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={handleInputKeyDown}
                            aria-label="Message input"
                            placeholder={
                                pendingAction?.type === 'compose_email'
                                    ? 'Write the email body...'
                                    : 'Type your message...'
                            }
                            disabled={isLoading}
                        />

                        <div className="flex items-center justify-between px-2 pb-1 pt-2">
                            <p className="text-xs text-muted-foreground">
                                {pendingHint || 'Press Enter to send, Shift + Enter for a new line.'}
                            </p>

                            <Button
                                type="submit"
                                size="sm"
                                className="ml-4 gap-1.5"
                                disabled={isLoading || !input.trim()}
                                aria-label="Send message"
                            >
                                Send
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>
                </ExpandableChatFooter>
            </ExpandableChat>
        </>
    );
}
