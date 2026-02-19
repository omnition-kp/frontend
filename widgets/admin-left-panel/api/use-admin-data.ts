import { AdminDataResponse } from "@/shared/types";
import { $apiAdmin } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useAdminData = () => {
    return useQuery({
        queryKey: ["admin-data"],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<AdminDataResponse>("/me");
            return data;
        },
    });
};
