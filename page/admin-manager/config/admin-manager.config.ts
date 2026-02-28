import { AdminTableColumn } from "@/shared/admin/types";

export const ADMIN_MANAGER_COLUMNS: AdminTableColumn[] = [
    { header: "Номер" },
    { header: "Имя" },
    { header: "Email" },
    { header: "Телефон" },
    { header: "Действия", align: "right" },
];

export const ADMIN_MANAGER_GRID_CLASS =
    "grid grid-cols-[72px_1fr_1fr_1fr_88px] gap-4";
