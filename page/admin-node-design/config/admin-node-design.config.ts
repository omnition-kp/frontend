import { AdminTableColumn } from "@/shared/admin/types";

export const ADMIN_NODE_DESIGN_COLUMNS: AdminTableColumn[] = [
    { header: "Номер" },
    { header: "Название вариации" },
    { header: "Фото" },
    { header: "Действия", align: "right" },
];

export const ADMIN_NODE_DESIGN_GRID_CLASS =
    "grid grid-cols-[72px_1fr_120px_88px] gap-4";
