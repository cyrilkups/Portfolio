import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface InterestCardProps {
    title: string;
    imageSrc: string;
    footerIcon?: LucideIcon;
    isGif?: boolean;
}

export default function InterestCard({
    title,
    imageSrc,
    footerIcon: FooterIcon,
    isGif = false,
}: InterestCardProps) {
    return (
        <div className="group relative bg-[#1a1a1a] rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image/GIF Section - 60-70% of card height */}
            <div className="h-40 md:h-48 lg:h-56 w-full bg-white flex items-center justify-center overflow-hidden">
                {isGif ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={200}
                        height={140}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Footer Section */}
            <div className="bg-[#0d0d0d] flex items-center px-3 md:px-4 py-2 md:py-3 gap-2 md:gap-3">
                {FooterIcon && (
                    <FooterIcon className="w-4 md:w-5 h-4 md:h-5 text-white flex-shrink-0" />
                )}
                <span className="text-white font-medium text-xs md:text-sm">
                    {title}
                </span>
            </div>
        </div>
    );
}
