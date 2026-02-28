import { MainTextVariant } from "../types";

export const mainTextClassNameVariants: Record<MainTextVariant, string> = {
    "1": "text-[22px] leading-[110%]",
    "2": "text-[20px] leading-[100%]",
    "3": "text-[18px] leading-[100%]",
} as const;
