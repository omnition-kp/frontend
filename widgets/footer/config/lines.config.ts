const LINES_BASE_CLASS = "absolute z-10 bg-[#B0B0B0]";
const LINES_TYPES: Record<"x" | "x1" | "y", string> = {
    x: `${LINES_BASE_CLASS} h-0.5 left-0 right-3`,
    y: `${LINES_BASE_CLASS} w-0.5 top-0 bottom-3`,
    x1: `${LINES_BASE_CLASS} h-0.5 left-3 right-0`,
};

export const LINES_POSITION: Record<"right" | "bottom" | "bottom1", string> = {
    right: `${LINES_TYPES.y} right-0`,
    bottom: `${LINES_TYPES.x} bottom-0`,
    bottom1: `${LINES_TYPES.x1} bottom-0`,
};
