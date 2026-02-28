import { TitleVariant } from "./title-variants";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    title: string;
    variant?: TitleVariant;
}
