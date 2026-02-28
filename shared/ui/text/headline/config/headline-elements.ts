import { HeadlineVariant } from "../types/headline-variants";

export const headlineElements: Record<HeadlineVariant, string> = {
    "1": "h1",
    "2": "h2",
    "3": "h3",
    "4": "h4",
    "5": "h5",
} as const;
