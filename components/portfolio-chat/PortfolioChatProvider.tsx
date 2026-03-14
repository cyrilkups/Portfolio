'use client';

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    GENERAL_INFO,
} from '@/lib/portfolio-content';
import {
    getAssistantUnavailableAnswer,
    looksLikePortfolioQuestion,
} from '@/lib/portfolio-knowledge';
import { ChatMessage, PendingAction } from '@/types';

interface PortfolioChatContextValue {
    isLoading: boolean;
    isOpen: boolean;
    messages: ChatMessage[];
    pendingAction: PendingAction | null;
    setIsOpen: (isOpen: boolean) => void;
    submitMessage: (content: string) => Promise<void>;
    submitSuggestedPrompt: (content: string) => Promise<void>;
}

const MAX_STORED_MESSAGES = 20;
const MAX_API_MESSAGES = 10;
const MIN_EMAIL_BODY_LENGTH = 5;
const DEFAULT_FALLBACK_LABEL = 'Open draft';

const PortfolioChatContext = createContext<PortfolioChatContextValue | null>(
    null,
);

function createMessage(
    role: ChatMessage['role'],
    content: string,
    extras: Partial<ChatMessage> = {},
) {
    return {
        id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role,
        content,
        ...extras,
    } satisfies ChatMessage;
}

function getWelcomeMessage() {
    return createMessage(
        'assistant',
        "Ask about Cyril's background, projects, stack, or experience.",
    );
}

function clampMessages(messages: ChatMessage[]) {
    return messages.slice(-MAX_STORED_MESSAGES);
}

function isValidReference(reference: unknown) {
    if (!reference || typeof reference !== 'object') {
        return false;
    }

    const candidate = reference as Record<string, unknown>;
    return (
        typeof candidate.label === 'string' && typeof candidate.href === 'string'
    );
}

function trimMessageContent(content: string) {
    return content.trim().slice(0, 1000);
}

function detectEmailIntent(content: string) {
    return /\b(email cyril|send cyril an email|contact cyril|how can i email cyril)\b/i.test(
        content,
    );
}

function isCancellationIntent(content: string) {
    return /^(cancel|never mind|nevermind)$/i.test(content.trim());
}

function getApiConversation(messages: ChatMessage[]) {
    return messages.slice(-MAX_API_MESSAGES).map((message) => ({
        role: message.role,
        content: message.content,
    }));
}

function buildMailtoHref(body: string) {
    const params = new URLSearchParams({
        subject: GENERAL_INFO.emailSubject,
        body,
    });

    return `mailto:${GENERAL_INFO.email}?${params.toString()}`;
}

function appendMessages(previous: ChatMessage[], ...next: ChatMessage[]) {
    return clampMessages([...previous, ...next]);
}

export function PortfolioChatProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage()]);
    const [pendingAction, setPendingAction] = useState<PendingAction | null>(
        null,
    );
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const submitQuestion = useCallback(async (content: string) => {
        const trimmedContent = trimMessageContent(content);
        if (!trimmedContent) {
            return;
        }

        const userMessage = createMessage('user', trimmedContent);
        const optimisticMessages = appendMessages(messages, userMessage);
        setMessages(optimisticMessages);
        setIsLoading(true);

        if (!navigator.onLine) {
            setMessages((previous) =>
                appendMessages(
                    previous,
                    createMessage('assistant', getAssistantUnavailableAnswer()),
                ),
            );
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/portfolio-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: getApiConversation(optimisticMessages),
                }),
            });

            const data = (await response.json()) as Partial<{
                answer: string;
                references: Array<{ label: string; href: string }>;
            }>;

            const answer =
                typeof data.answer === 'string' && data.answer.trim()
                    ? data.answer.trim()
                    : getAssistantUnavailableAnswer();
            const references = Array.isArray(data.references)
                ? data.references.filter(isValidReference)
                : [];

            setMessages((previous) =>
                appendMessages(
                    previous,
                    createMessage('assistant', answer, { references }),
                ),
            );
        } catch {
            setMessages((previous) =>
                appendMessages(
                    previous,
                    createMessage('assistant', getAssistantUnavailableAnswer()),
                ),
            );
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    const submitMessage = useCallback(
        async (content: string) => {
            const trimmedContent = trimMessageContent(content);
            if (!trimmedContent || isLoading) {
                return;
            }

            if (pendingAction?.type === 'compose_email') {
                if (isCancellationIntent(trimmedContent)) {
                    setPendingAction(null);
                    setMessages((previous) =>
                        appendMessages(
                            previous,
                            createMessage('user', trimmedContent),
                            createMessage(
                                'assistant',
                                'Okay, I canceled the email draft.',
                            ),
                        ),
                    );
                    return;
                }

                if (looksLikePortfolioQuestion(trimmedContent)) {
                    setPendingAction(null);
                    await submitQuestion(trimmedContent);
                    return;
                }

                if (
                    trimmedContent.replace(/[^a-z0-9]/gi, '').length <
                    MIN_EMAIL_BODY_LENGTH
                ) {
                    setMessages((previous) =>
                        appendMessages(
                            previous,
                            createMessage('user', trimmedContent),
                            createMessage(
                                'assistant',
                                'Please share a little more detail for the email body.',
                            ),
                        ),
                    );
                    return;
                }

                const userMessage = createMessage('user', trimmedContent);
                const mailtoHref = buildMailtoHref(trimmedContent);

                setPendingAction(null);
                setMessages((previous) =>
                    appendMessages(
                        previous,
                        userMessage,
                        createMessage(
                            'assistant',
                            "I drafted an email to Cyril in your mail app. If it didn't open, use the fallback link below.",
                            {
                                references: [
                                    {
                                        label: 'Contact',
                                        href: '/#contact',
                                    },
                                ],
                                fallbackHref: mailtoHref,
                                fallbackLabel: DEFAULT_FALLBACK_LABEL,
                            },
                        ),
                    ),
                );

                try {
                    window.location.href = mailtoHref;
                } catch {
                    // Keep the fallback link visible in the message.
                }

                return;
            }

            if (detectEmailIntent(trimmedContent)) {
                setPendingAction({ type: 'compose_email' });
                setMessages((previous) =>
                    appendMessages(
                        previous,
                        createMessage('user', trimmedContent),
                        createMessage(
                            'assistant',
                            'Sure. What would you like the email to say?',
                        ),
                    ),
                );
                return;
            }

            await submitQuestion(trimmedContent);
        },
        [isLoading, pendingAction, submitQuestion],
    );

    const value = useMemo(
        () => ({
            isLoading,
            isOpen,
            messages,
            pendingAction,
            setIsOpen,
            submitMessage,
            submitSuggestedPrompt: submitMessage,
        }),
        [isLoading, isOpen, messages, pendingAction, submitMessage],
    );

    return (
        <PortfolioChatContext.Provider value={value}>
            {children}
        </PortfolioChatContext.Provider>
    );
}

export function usePortfolioChat() {
    const context = useContext(PortfolioChatContext);

    if (!context) {
        throw new Error(
            'usePortfolioChat must be used within a PortfolioChatProvider',
        );
    }

    return context;
}
