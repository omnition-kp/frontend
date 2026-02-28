import { AdminSelectOption } from "@/shared/admin/types";
import { useNodeDesignControllerGetAll } from "@/shared/queries";
import { NodeDesignDto } from "@/shared/types/server";

export const useNodeDesignOptions = () => {
    return useNodeDesignControllerGetAll({
        query: {
            select: (response): AdminSelectOption[] => {
                const rawData = response as unknown;
                let nodeDesigns: NodeDesignDto[] = [];

                if (Array.isArray(rawData)) {
                    nodeDesigns = rawData as NodeDesignDto[];
                }

                return nodeDesigns.map((nodeDesign) => ({
                    value: nodeDesign.id.toString(),
                    label: nodeDesign.name,
                }));
            },
        },
    });
};
