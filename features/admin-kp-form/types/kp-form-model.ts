import type { QueryClient } from "@tanstack/react-query";
import type {
    FileJson,
    KpControllerUploadDocumentsBody,
    KpControllerUploadEstimateBody,
    KpCreateDto,
    KpDto,
    KpUpdateDto,
} from "@/shared/types/server";
import type { DocItem, DynamicItem, KpFormValues, OptionKey } from "./index";

export type MutationFn<TArgs = unknown, TResult = unknown> = (
    args: TArgs,
) => Promise<TResult>;

export interface KpFormSubmitContext {
    values: KpFormValues;
    docItems: DocItem[];
    selectedManagerId: string;
    selectedNodeDesignId: string;
    dateKp: string;
    estimateFile: File | null;
    existingEstimateJson: FileJson | null;
    paymentTerms: DynamicItem[];
    productionConditions: DynamicItem[];
    options: Record<OptionKey, boolean>;
    clientId: string | number | null | undefined;
    isUpdate: boolean;
    kpId: string;
    existingKp: KpDto | null;
    createKp: MutationFn<{ data: KpCreateDto }>;
    updateKp: MutationFn<{ id: string; data: KpUpdateDto }>;
    uploadEstimate: MutationFn<{ data: KpControllerUploadEstimateBody }>;
    uploadDocuments: MutationFn<{ data: KpControllerUploadDocumentsBody }>;
    queryClient: QueryClient;
}
