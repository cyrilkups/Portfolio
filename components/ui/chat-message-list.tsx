import * as React from 'react';
import { ArrowDown } from 'lucide-react';

import { useAutoScroll } from '@/hooks/use-auto-scroll';
import { Button } from '@/components/ui/button';

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
    smooth?: boolean;
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
    ({ className, children, smooth = false, ...props }, _ref) => {
        const {
            scrollRef,
            isAtBottom,
            scrollToBottom,
            disableAutoScroll,
        } = useAutoScroll({
            smooth,
            content: children,
        });

        const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
            disableAutoScroll();
            event.stopPropagation();
        };

        const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
            disableAutoScroll();
            event.stopPropagation();
        };

        return (
            <div className="relative h-full w-full">
                <div
                    data-lenis-prevent
                    className={`flex h-full w-full flex-col overflow-y-auto overscroll-contain touch-pan-y p-4 ${className ?? ''}`}
                    ref={scrollRef}
                    onWheel={handleWheel}
                    onWheelCapture={handleWheel}
                    onTouchMove={handleTouchMove}
                    onTouchMoveCapture={handleTouchMove}
                    {...props}
                >
                    <div className="flex flex-col gap-4">{children}</div>
                </div>

                {!isAtBottom ? (
                    <Button
                        onClick={scrollToBottom}
                        size="icon"
                        variant="outline"
                        className="absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 rounded-full shadow-md"
                        aria-label="Scroll to bottom"
                    >
                        <ArrowDown className="h-4 w-4" />
                    </Button>
                ) : null}
            </div>
        );
    },
);

ChatMessageList.displayName = 'ChatMessageList';

export { ChatMessageList };
