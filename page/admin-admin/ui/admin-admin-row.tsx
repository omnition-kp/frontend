import { Trash2Icon } from "lucide-react";
import { onest } from "@/shared/config";
import { cn } from "@/shared/utils";
import {
    AdminHighlightedText,
    AdminRowSelect,
    AdminTableRow,
} from "@/shared/admin";
import { ADMIN_ROLE_OPTIONS } from "../config/admin-role-options";
import { ADMIN_TABLE_GRID_CLASS_NAME } from "../config/admin-table.constants";
import type { AdminRowItem } from "../types/admin-row-item";

interface AdminAdminRowProps {
    item: AdminRowItem;
    searchValue: string;
    onRoleChange: (id: number, role: string | number) => void;
    onDelete: (item: AdminRowItem) => void;
    roleDisabled?: boolean;
    deleteDisabled?: boolean;
}

export const AdminAdminRow = ({
    item,
    searchValue,
    onRoleChange,
    onDelete,
    roleDisabled = false,
    deleteDisabled = false,
}: AdminAdminRowProps) => {
    return (
        <AdminTableRow gridClassName={ADMIN_TABLE_GRID_CLASS_NAME}>
            <p>
                <AdminHighlightedText
                    text={item.numberLabel}
                    highlight={searchValue}
                />
            </p>
            <AdminHighlightedText
                text={item.name}
                highlight={searchValue}
                className="truncate"
            />
            <p className={cn(onest.className, "text-[18px] leading-[112%]")}>
                {item.createdAt}
            </p>

            <div className="w-full max-w-[160px]">
                <AdminRowSelect
                    value={item.role}
                    options={ADMIN_ROLE_OPTIONS}
                    onChange={(nextValue) => onRoleChange(item.id, nextValue)}
                    disabled={roleDisabled}
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => onDelete(item)}
                    disabled={deleteDisabled}
                    className={cn(
                        "w-7 h-7 rounded-[4px] border border-[#E4E4E4]",
                        "text-[#8C8C8C] transition-colors flex items-center justify-center",
                        deleteDisabled
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:text-black hover:border-[#D8D8D8] cursor-pointer",
                    )}
                    aria-label="Удалить администратора"
                >
                    <Trash2Icon width={14} height={14} />
                </button>
            </div>
        </AdminTableRow>
    );
};
