import type { ReactNode } from "react";

export interface AdminSelectOption {
    value: string | number;
    label: ReactNode;
    keywords?: string;
}

export interface AdminSelectProps {
    value: string | number | null;
    onChange: (value: string | number | null) => void;
    options: AdminSelectOption[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    isSearchable?: boolean;
}
