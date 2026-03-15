import * as React from 'react';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ChatInputProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
    ({ className, ...props }, ref) => (
        <Textarea
            autoComplete="off"
            ref={ref}
            name="message"
            className={cn(
                'flex h-16 max-h-28 min-h-12 w-full resize-none items-center rounded-md border-0 bg-background px-4 py-3 text-base shadow-none placeholder:text-muted-foreground focus-visible:ring-0 sm:text-sm',
                className,
            )}
            {...props}
        />
    ),
);
ChatInput.displayName = 'ChatInput';

export { ChatInput };
