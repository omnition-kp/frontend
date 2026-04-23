import { AxiosError } from "axios";
import type { OptionKey, SubmitResponse, KpFormSubmitContext } from "../types";
import type { FileJson, KpCreateDto, KpDto } from "@/shared/types/server";
import { TOGGLE_MAPPING } from "../config";
import {
    getClientControllerGetAllQueryKey,
    getKpControllerGetAllQueryKey,
} from "@/shared/queries";

export class KpFormModel {
    public async submit({
        values,
        docItems,
        selectedManagerId,
        selectedNodeDesignId,
        dateKp,
        estimateFile,
        existingEstimateJson,
        paymentTerms,
        productionConditions,
        options,
        clientId,
        isUpdate,
        kpId,
        existingKp,
        createKp,
        updateKp,
        uploadEstimate,
        uploadDocuments,
        queryClient,
    }: KpFormSubmitContext): Promise<SubmitResponse> {
        if (!selectedManagerId) return this.returnError("Выберите менеджера");
        if (!selectedNodeDesignId)
            return this.returnError("Выберите вариацию конструкции");
        if (!dateKp) return this.returnError("Укажите дату КП");
        if (!estimateFile && !existingEstimateJson)
            return this.returnError("Загрузите файл сметы");

        try {
            // 1. Upload Estimate
            let finalEstimate: FileJson | null = existingEstimateJson;

            if (estimateFile) {
                const res = await uploadEstimate({
                    data: { file: estimateFile },
                });
                const resRecord = res as {
                    filePath?: string;
                    data?: FileJson;
                };
                const uploadedData = resRecord.filePath ? res : resRecord.data;

                if (uploadedData && (uploadedData as FileJson).filePath) {
                    finalEstimate = uploadedData as FileJson;
                    if (values.estimateName)
                        finalEstimate.name = values.estimateName;
                }
            } else if (finalEstimate && values.estimateName) {
                finalEstimate.name = values.estimateName;
            }

            if (!finalEstimate) throw new Error("Не удалось сохранить смету");

            // 2. Upload Documents
            const finalDocuments: FileJson[] = [];
            const newFilesToUpload: File[] = [];
            const newFilesIndices: number[] = [];

            docItems.forEach((item, index) => {
                if (item.file) {
                    newFilesToUpload.push(item.file);
                    newFilesIndices.push(index);
                } else if (item.serverFile) {
                    const sf = item.serverFile as FileJson & { path?: string };
                    const filePath = sf.filePath ?? sf.path ?? "";
                    const name =
                        item.name ||
                        sf.name ||
                        filePath.split(/[/\\]/).pop() ||
                        "документ";
                    if (filePath) finalDocuments.push({ name, filePath });
                }
            });

            if (newFilesToUpload.length > 0) {
                const res = await uploadDocuments({
                    data: { files: newFilesToUpload },
                });
                const raw = (res as { data?: FileJson[] })?.data ?? res;
                const uploadedDocs = Array.isArray(raw) ? raw : [];
                if (uploadedDocs.length !== newFilesToUpload.length) {
                    throw new Error("Не удалось загрузить документы");
                }

                uploadedDocs.forEach((uploadedFile, idx) => {
                    const originalIndex = newFilesIndices[idx];
                    const originalItem = docItems[originalIndex];
                    const filePath =
                        (uploadedFile as FileJson).filePath ??
                        (uploadedFile as { path?: string }).path ??
                        "";
                    const name =
                        originalItem?.name ||
                        (uploadedFile as FileJson).name ||
                        filePath.split(/[/\\]/).pop() ||
                        "документ";
                    finalDocuments.push({ name, filePath });
                });
            }

            // 3. Map Options
            const mappedOptions: Partial<KpCreateDto> = {};
            (Object.keys(options) as OptionKey[]).forEach((key) => {
                const dtoKey = TOGGLE_MAPPING[key];
                (mappedOptions as Record<string, boolean>)[dtoKey] =
                    options[key];
            });

            // 4. Payload
            const payload: KpCreateDto = {
                name: values.name,
                numberKp: values.numberKp,
                date: dateKp,
                clientName: values.clientName,
                numberOrder: values.numberOrder,
                orderAddress: values.orderAddress,
                contactPerson: values.contactPerson,
                details: values.details || "",

                estimate: finalEstimate,
                documents: finalDocuments,

                payAndDeadlines: paymentTerms
                    .map((p) => p.value)
                    .filter(Boolean),
                productionConditions: productionConditions
                    .map((p) => p.value)
                    .filter(Boolean),

                managerId: Number(selectedManagerId),
                nodeDesignId: Number(selectedNodeDesignId),
                clientId:
                    Number(clientId) || (existingKp as KpDto)?.clientId || 0,

                ...(mappedOptions as Partial<KpCreateDto>),

                anySurface: options.anySurface,
                advantagesOfConcrete: options.archConcreteBenefits,
                variationsOfTheMechanism: options.mechanizationVariants,
                grinding: options.grinding,
                ownMobileFactory: options.mobileFactory,
                interiorOptions: options.interiorVariants,
                stairs: options.stairs,
                landscaping: options.landscaping,
                repairAndRestoration: options.repairRestoration,
            };

            if (isUpdate) {
                await updateKp({
                    id: kpId,
                    data: { ...payload, documents: finalDocuments },
                });
            } else {
                await createKp({ data: payload });
            }

            // Инвалидация кеша
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: getKpControllerGetAllQueryKey(),
                }),
                queryClient.invalidateQueries({
                    queryKey: getClientControllerGetAllQueryKey(),
                }),
            ]);

            return { ok: true };
        } catch (error) {
            return {
                ok: false,
                message: this.parseError(error),
            };
        }
    }

    private parseError(error: unknown): string {
        if (error instanceof AxiosError) {
            const msg = error.response?.data?.message;
            return Array.isArray(msg) ? msg[0] : msg || "Ошибка сервера";
        }
        if (error instanceof Error) {
            return error.message;
        }
        return "Произошла неизвестная ошибка";
    }

    private returnError(message: string): SubmitResponse {
        return {
            ok: false,
            message,
        };
    }
}
