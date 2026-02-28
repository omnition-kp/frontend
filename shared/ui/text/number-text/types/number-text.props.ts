import { NumberTextVariant } from "./number-text-variants";

export interface NumberTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    title: string;
    variant?: NumberTextVariant;
}
