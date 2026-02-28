import { AdminSelectOption } from "@/shared/admin/types";
import { useManagerControllerGetAll } from "@/shared/queries";
import { ManagerDto } from "@/shared/types/server";

export const useManagerOptions = () => {
    return useManagerControllerGetAll({
        query: {
            select: (response): AdminSelectOption[] => {
                const rawData = response as unknown;
                let managers: ManagerDto[] = [];

                if (Array.isArray(rawData)) {
                    managers = rawData as ManagerDto[];
                }

                return managers.map((manager) => ({
                    value: manager.id.toString(),
                    label: manager.name,
                }));
            },
        },
    });
};
