import type { AdminSelectOption } from "@/shared/admin";
import {
    AdminWithoutPasswordDtoRole,
    type AdminWithoutPasswordDtoRole as AdminRole,
} from "@/shared/types/server";

export const ADMIN_ROLE_OPTIONS: AdminSelectOption[] = [
    {
        value: AdminWithoutPasswordDtoRole.MODERATOR,
        label: "Менеджер",
        keywords: "менеджер moderator",
    },
    {
        value: AdminWithoutPasswordDtoRole.ADMIN,
        label: "Суперадмин",
        keywords: "суперадмин admin",
    },
];

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
    [AdminWithoutPasswordDtoRole.MODERATOR]: "Менеджер",
    [AdminWithoutPasswordDtoRole.ADMIN]: "Суперадмин",
};
