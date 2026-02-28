import { HeadlineVariant } from "./headline-variants";

export interface HeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    variant?: HeadlineVariant;
}
