import type { ReactNode } from "react";

export interface AdminFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    children: ReactNode;
    childrenClassName?: string;
}
