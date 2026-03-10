//Базовые классы для линий
const BASE_LINE_CLASS = "bg-white absolute z-10";
const LINE_CLASS_TYPES: Record<"x" | "y", string> = {
    x: `${BASE_LINE_CLASS} h-0.5 left-10 right-10`,
    y: `${BASE_LINE_CLASS} w-0.5 top-10 bottom-10`,
};

// Классы для линий
export const LINE_CLASS: Record<"left" | "right" | "top" | "bottom", string> = {
    left: `${LINE_CLASS_TYPES.y} left-4`,
    right: `${LINE_CLASS_TYPES.y} right-4`,
    top: `${LINE_CLASS_TYPES.x} top-4`,
    bottom: `${LINE_CLASS_TYPES.x} bottom-4`,
};
