const LINE_BASE_CLASS = "absolute z-10 bg-black/30";
const LINE_TYPES: Record<"x" | "y", string> = {
    x: `${LINE_BASE_CLASS} h-0.5 left-3.5 right-3.5`,
    y: `${LINE_BASE_CLASS} w-0.5 top-3.5 bottom-3.5`,
};

export const LINE_POSITION: Record<
    "left" | "right" | "top" | "bottom",
    string
> = {
    left: `${LINE_TYPES.y} left-0`,
    right: `${LINE_TYPES.y} right-0`,
    top: `${LINE_TYPES.x} top-0`,
    bottom: `${LINE_TYPES.x} bottom-0`,
};
