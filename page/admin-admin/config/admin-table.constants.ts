import type { AdminTableColumn } from "@/shared/admin";

export const ADMIN_TABLE_COLUMNS: AdminTableColumn[] = [
    { header: "Номер" },
    { header: "Имя участника" },
    { header: "Дата добавления" },
    { header: "Роль" },
    { header: "Действия", align: "right" },
];

export const ADMIN_TABLE_GRID_CLASS_NAME =
    "grid grid-cols-[72px_1fr_180px_180px_80px] gap-4";
