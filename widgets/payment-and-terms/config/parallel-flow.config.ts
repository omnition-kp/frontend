export const SQUARE_PX = 32;
export const ROW_GAP = 16;
export const AXIS_CLASS = "bg-blue";
export const AXIS_LINE_PX = 2;
export const CORNER_SQ_PX = 8;
export const OFFSET_PX = 3;

export const PARALLEL_FLOW_ANIMATION = {
    lineDraw: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    barStagger: 0.06,
    barDelay: 0.15,
} as const;
