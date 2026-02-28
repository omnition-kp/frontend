import { MainTextVariant } from "./main-text-variants";

export interface MainTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    variant?: MainTextVariant;
}
