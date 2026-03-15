'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ChatPosition = 'bottom-right' | 'bottom-left';
type ChatSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const chatConfig = {
    dimensions: {
        sm: 'sm:max-w-sm sm:max-h-[500px]',
        md: 'sm:max-w-md sm:max-h-[600px]',
        lg: 'sm:max-w-lg sm:max-h-[700px]',
        xl: 'sm:max-w-xl sm:max-h-[800px]',
        full: 'sm:w-full sm:h-full',
    },
    positions: {
        'bottom-right': 'bottom-5 right-5',
        'bottom-left': 'bottom-5 left-5',
    },
    chatPositions: {
        'bottom-right': 'sm:bottom-[calc(100%+10px)] sm:right-0',
        'bottom-left': 'sm:bottom-[calc(100%+10px)] sm:left-0',
    },
    states: {
        open: 'pointer-events-auto visible translate-y-0 scale-100 opacity-100',
        closed:
            'pointer-events-none invisible opacity-0 sm:translate-y-5 scale-100',
    },
};

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
    if (!ref) return;

    if (typeof ref === 'function') {
        ref(value);
    } else {
        (ref as React.MutableRefObject<T>).current = value;
    }
}

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: ChatPosition;
    size?: ChatSize;
    icon?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    contentClassName?: string;
    contentRef?: React.Ref<HTMLDivElement>;
    toggleRef?: React.Ref<HTMLButtonElement>;
    toggleButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    closeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
    className,
    position = 'bottom-right',
    size = 'md',
    icon,
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    contentClassName,
    contentRef,
    toggleRef,
    toggleButtonProps,
    closeButtonProps,
    ...props
}) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = open ?? internalOpen;

    const setOpen = (nextOpen: boolean) => {
        if (open === undefined) {
            setInternalOpen(nextOpen);
        }

        onOpenChange?.(nextOpen);
    };

    return (
        <div
            data-native-cursor="true"
            className={cn(`fixed ${chatConfig.positions[position]} z-[60]`, className)}
            {...props}
        >
            <div
                ref={(node) => {
                    setRef(contentRef, node);
                }}
                className={cn(
                    'fixed inset-0 flex h-[100dvh] w-screen flex-col overflow-hidden border border-border bg-background shadow-2xl transition-all duration-200 ease-out sm:absolute sm:inset-auto sm:h-[80vh] sm:w-[90vw] sm:rounded-2xl',
                    chatConfig.chatPositions[position],
                    chatConfig.dimensions[size],
                    isOpen ? chatConfig.states.open : chatConfig.states.closed,
                    contentClassName,
                )}
            >
                {children}
                <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute right-2 top-2 sm:hidden"
                    onClick={() => setOpen(false)}
                    {...closeButtonProps}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <ExpandableChatToggle
                icon={icon}
                isOpen={isOpen}
                toggleChat={() => setOpen(!isOpen)}
                buttonRef={toggleRef}
                {...toggleButtonProps}
            />
        </div>
    );
};

ExpandableChat.displayName = 'ExpandableChat';

const ExpandableChatHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => (
    <div
        className={cn(
            'flex items-center justify-between border-b border-border p-4',
            className,
        )}
        {...props}
    />
);

ExpandableChatHeader.displayName = 'ExpandableChatHeader';

const ExpandableChatBody = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex-grow overflow-y-auto', className)}
        {...props}
    />
));

ExpandableChatBody.displayName = 'ExpandableChatBody';

const ExpandableChatFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => (
    <div className={cn('border-t border-border p-4', className)} {...props} />
);

ExpandableChatFooter.displayName = 'ExpandableChatFooter';

interface ExpandableChatToggleProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    isOpen: boolean;
    toggleChat: () => void;
    buttonRef?: React.Ref<HTMLButtonElement>;
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
    className,
    icon,
    isOpen,
    toggleChat,
    buttonRef,
    ...props
}) => (
    <Button
        variant="default"
        type="button"
        onClick={toggleChat}
        ref={buttonRef}
        className={cn(
            'h-14 w-14 rounded-full shadow-lg shadow-black/30 transition-all duration-300 hover:shadow-xl',
            className,
        )}
        {...props}
    >
        {isOpen ? <X className="h-6 w-6" /> : icon || <MessageCircle className="h-6 w-6" />}
    </Button>
);

ExpandableChatToggle.displayName = 'ExpandableChatToggle';

export {
    ExpandableChat,
    ExpandableChatBody,
    ExpandableChatFooter,
    ExpandableChatHeader,
};
