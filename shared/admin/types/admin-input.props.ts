import { InputHTMLAttributes } from "react";

export interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}
