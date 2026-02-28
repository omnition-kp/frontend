"use client";

import { AdvantageBlock } from "./advantage-block";
import { getBordersForGrid } from "../lib/get-borders-for-grid";
import { useGridCols } from "../lib/use-grid-cols";
import { AdvantageBlockProps } from "../types/advantage-block.props";
import { cn } from "@/shared/utils";

interface AdvantagesGridProps {
    advantages: AdvantageBlockProps[];
}

export function AdvantagesGrid({ advantages }: AdvantagesGridProps) {
    const cols = useGridCols();
    const isCarousel = cols === 0;

    if (isCarousel) {
        return (
            <div className="flex gap-[6px] overflow-x-auto snap-x snap-mandatory -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {advantages.map((advantage, index) => (
                    <div
                        key={advantage.title}
                        className="shrink-0 w-[85vw] max-w-[400px] snap-center snap-always"
                    >
                        <AdvantageBlock
                            {...advantage}
                            {...getBordersForGrid(index, 0, advantages.length)}
                        />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid",
                cols === 2 && "grid-cols-2",
                cols === 3 && "grid-cols-3",
            )}
        >
            {advantages.map((advantage, index) => (
                <AdvantageBlock
                    key={advantage.title}
                    {...advantage}
                    {...getBordersForGrid(index, cols, advantages.length)}
                />
            ))}
        </div>
    );
}
