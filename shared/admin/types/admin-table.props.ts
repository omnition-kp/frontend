import type { ReactNode } from "react";

export interface AdminTableColumn {
    header: string;
    align?: "left" | "right";
}

export interface AdminTableProps {
    columns: AdminTableColumn[];
    gridClassName: string;
    isLoading?: boolean;
    itemsCount: number;
    children: ReactNode;
    searchTerm?: string;
    emptyMessage?: string;
    emptySearchMessage?: string;
    minWidth?: string;
}
