import { TitleVariant } from "../types";

export const titleClassNameVariants: Record<TitleVariant, string> = {
    "1": "text-[22px] leading-[100%] uppercase",
    "2": "text-[20px] leading-[110%] uppercase",
    "3": "text-[16px] leading-[25px]",
} as const;
