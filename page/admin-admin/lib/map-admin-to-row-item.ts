import type { AdminWithoutPasswordDto } from "@/shared/types/server";
import { formatDate } from "@/shared/utils";
import type { AdminRowItem } from "../types/admin-row-item";

const getCreatedAt = (admin: AdminWithoutPasswordDto): string => {
    const rawCreatedAt = (
        admin as AdminWithoutPasswordDto & { createdAt?: unknown }
    ).createdAt;

    if (
        typeof rawCreatedAt !== "string" &&
        typeof rawCreatedAt !== "number" &&
        !(rawCreatedAt instanceof Date)
    ) {
        return "-";
    }

    const parsedDate = new Date(rawCreatedAt);
    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return formatDate(rawCreatedAt);
};

export const mapAdminToRowItem = (
    admin: AdminWithoutPasswordDto,
): AdminRowItem => {
    return {
        id: admin.id,
        numberLabel: `№${admin.id}`,
        name: admin.name,
        createdAt: getCreatedAt(admin),
        role: admin.role,
    };
};
