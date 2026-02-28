import type { ReactNode } from "react";

export interface AdminFormTemplateProps {
    children: ReactNode;
    title: string;
    onCancel: () => void;
    onSuccess: () => void;
    loading?: boolean;
    dataLoading?: boolean;
}
