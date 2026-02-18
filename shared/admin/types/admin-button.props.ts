import { ButtonHTMLAttributes, ReactNode } from "react";

export interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    loading?: boolean;
    variant?: "primary" | "secondary";
}
