import { ButtonHTMLAttributes } from "react";

export interface AdminAddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    link?: string;
    typeOfButton?: "button" | "link";
}
