import type { AdminWithoutPasswordDtoRole } from "@/shared/types/server";

export interface AdminRowItem {
    id: number;
    numberLabel: string;
    name: string;
    createdAt: string;
    role: AdminWithoutPasswordDtoRole;
}
