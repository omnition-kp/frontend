import type { ReactNode } from "react";

export interface AdminRowSelectOption {
    value: string | number;
    label: ReactNode;
}

export interface AdminRowSelectProps {
    value: string | number;
    options: AdminRowSelectOption[];
    onChange: (value: string | number) => void;
    className?: string;
    disabled?: boolean;
}
