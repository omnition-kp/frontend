import { NumberTextVariant } from "../types";

export const numberTextClassNameVariants: Record<NumberTextVariant, string> = {
    "1": "text-[80px] leading-[100%]",
    "2": "text-[18px] leading-[112%] font-light",
} as const;
