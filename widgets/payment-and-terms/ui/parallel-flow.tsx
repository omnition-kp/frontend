"use client";

import { Title } from "@/shared/ui";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ROW_GAP, SQUARE_PX } from "../config/parallel-flow.config";
import { PARALLEL_ITEMS } from "../config/parallel-items";
import { ParallelFlowAxis } from "./parallel-flow-axis";
import { ParallelItemBar, ParallelItemLabel } from "./parallel-item";

export const ParallelFlow = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref}>
            <Title
                variant="2"
                title="Параллельный поток процесса"
                className="mb-9"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div
                    className="flex flex-col shrink-0"
                    style={{ gap: ROW_GAP }}
                >
                    {PARALLEL_ITEMS.map((item) => (
                        <ParallelItemLabel key={item.title} {...item} />
                    ))}
                </div>

                <div className="relative flex-1 min-w-0 overflow-x-auto lg:overflow-visible -mx-px lg:mx-0">
                    <div className="relative pl-6 pb-6 min-w-[600px] lg:min-w-0">
                        <ParallelFlowAxis isInView={isInView} />

                        <div
                            className="flex flex-col flex-1"
                            style={{ gap: ROW_GAP }}
                        >
                            {PARALLEL_ITEMS.map((item, index) => (
                                <div
                                    key={item.title}
                                    className="flex items-center min-h-[32px] min-w-0"
                                    style={{
                                        marginLeft:
                                            item.startSquares * SQUARE_PX,
                                    }}
                                >
                                    <ParallelItemBar
                                        widthSquares={item.widthSquares}
                                        variant={item.variant}
                                        animationDelay={index}
                                        isInView={isInView}
                                        icon={item.icon}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
