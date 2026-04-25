"use client";

// Библиотеки
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    File as FileIcon,
    FileSpreadsheet,
    PlusIcon,
    Trash2,
} from "lucide-react";
import { useIMask } from "react-imask";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Компоненты
import { AdminFormTemplate } from "@/widgets/admin-form-template";
import { ClientLeftPanel } from "@/widgets/admin-client-left-panel";
import {
    AdminFormGroup,
    AdminInput,
    AdminSelect,
    AdminUploadDropzone,
    AdminBigToggle,
    AdminError,
} from "@/shared/admin";
import { DynamicSection } from "./dynamic-section";

// Утилиты
import { cn } from "@/shared/utils";
import type { FactoryOpts } from "imask";

// API
import { useManagerOptions, useNodeDesignOptions } from "../api";
import {
    useKpControllerCreate,
    useKpControllerUpdate,
    useKpControllerFindById,
    useKpControllerUploadEstimate,
    useKpControllerUploadDocuments,
} from "@/shared/queries";

// Конфиги
import {
    ACCEPT_FILES_CONFIG,
    DATE_MASK_CONFIG,
    MAX_ACCEPT_DATA_CONFIG,
    MAX_LENGTH_DYNAMIC_ITEM,
    TOGGLE_OPTIONS,
    TOGGLE_MAPPING,
} from "../config";
import { onest } from "@/shared/config";

// Типы
import type { FileJson, KpDto } from "@/shared/types/server";
import type {
    AdminKpFormProps,
    OptionKey,
    DynamicItem,
    KpFormValues,
    DocItem,
} from "../types";
import { KpFormModel } from "../models/kp-form.model";

export const AdminKpForm = ({ type, id, clientId }: AdminKpFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const kpId = String(id);
    const isUpdate = type === "update" && !!id;

    // --- Queries & Mutations ---
    const { data: managersOptions, isLoading: managersLoading } =
        useManagerOptions();
    const { data: nodeDesignOptions, isLoading: nodeDesignLoading } =
        useNodeDesignOptions();

    const { mutateAsync: createKp, isPending: createPending } =
        useKpControllerCreate();
    const { mutateAsync: updateKp, isPending: updatePending } =
        useKpControllerUpdate();

    const { mutateAsync: uploadEstimate, isPending: uploadEstimatePending } =
        useKpControllerUploadEstimate({
            request: {
                headers: {},
            },
        });

    const { mutateAsync: uploadDocuments, isPending: uploadDocsPending } =
        useKpControllerUploadDocuments({
            request: {
                headers: {},
            },
        });

    const { data: existingKp, isLoading: kpLoading } = useKpControllerFindById(
        kpId,
        {
            query: {
                enabled: isUpdate,
                retry: false,
                select: (response: unknown) =>
                    (response as { data?: unknown })?.data ?? response,
            },
        },
    );

    // --- RHF Setup ---
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<KpFormValues>();

    // --- Local States ---
    const [serverError, setServerError] = useState<string | null>(null);
    const [selectedManagerId, setSelectedManagerId] = useState<
        string | number | null
    >(null);
    const [selectedNodeDesignId, setSelectedNodeDesignId] = useState<
        string | number | null
    >(null);
    const [dateKp, setDateKp] = useState("");

    const [estimateFile, setEstimateFile] = useState<File | null>(null);
    const [existingEstimateJson, setExistingEstimateJson] =
        useState<FileJson | null>(null);

    const [docItems, setDocItems] = useState<DocItem[]>([
        { id: 1, file: null, name: "" },
    ]);
    const [nextDocId, setNextDocId] = useState(2);

    const [paymentTerms, setPaymentTerms] = useState<DynamicItem[]>([
        { id: 1, value: "" },
    ]);
    const [productionConditions, setProductionConditions] = useState<
        DynamicItem[]
    >([{ id: 1, value: "" }]);

    const [options, setOptions] = useState<Record<OptionKey, boolean>>({
        anySurface: false,
        archConcreteBenefits: false,
        mechanizationVariants: false,
        grinding: false,
        mobileFactory: false,
        interiorVariants: false,
        stairs: false,
        landscaping: false,
        repairRestoration: false,
    });

    // --- Initialization Effect ---
    useEffect(() => {
        if (existingKp) {
            const kpData = existingKp as KpDto;
            reset({
                name: kpData.name,
                numberKp: kpData.numberKp,
                orderAddress: kpData.orderAddress,
                clientName: kpData.clientName,
                contactPerson: kpData.contactPerson,
                numberOrder: kpData.numberOrder,
                details: kpData.details,
                estimateName: kpData.estimate?.name || "",
            });

            setDateKp(kpData.date || "");

            setSelectedManagerId(kpData.managerId);
            setSelectedNodeDesignId(kpData.nodeDesignId);
            setExistingEstimateJson(kpData.estimate);

            if (kpData.payAndDeadlines?.length) {
                setPaymentTerms(
                    kpData.payAndDeadlines.map((val, idx) => ({
                        id: idx,
                        value: val,
                    })),
                );
            }
            if (kpData.productionConditions?.length) {
                setProductionConditions(
                    kpData.productionConditions.map((val, idx) => ({
                        id: idx,
                        value: val,
                    })),
                );
            }

            const rawDocs =
                kpData.documents ??
                (kpData as { documents?: unknown }).documents ??
                (existingKp as { data?: { documents?: unknown } })?.data
                    ?.documents;
            const serverDocs = Array.isArray(rawDocs) ? rawDocs : [];
            if (serverDocs.length > 0) {
                const loadedDocs: DocItem[] = serverDocs.map(
                    (doc: unknown, idx: number) => {
                        const d =
                            doc && typeof doc === "object"
                                ? (doc as Record<string, unknown>)
                                : {};
                        const filePath = String(d.filePath ?? d.path ?? "");
                        const name = String(
                            d.name ??
                                d.fileName ??
                                (filePath
                                    ? filePath.split(/[/\\]/).pop()
                                    : "") ??
                                "документ",
                        );
                        return {
                            id: idx + 1,
                            file: null,
                            serverFile: { name, filePath },
                            name,
                        };
                    },
                );
                setDocItems(loadedDocs);
                setNextDocId(loadedDocs.length + 1);
            }

            const newOptions = { ...options };
            const kpDataRecord = kpData as unknown as Record<string, unknown>;
            (Object.keys(TOGGLE_MAPPING) as OptionKey[]).forEach((key) => {
                const dtoKey = TOGGLE_MAPPING[key];
                if (kpDataRecord[dtoKey] !== undefined) {
                    newOptions[key] = kpDataRecord[dtoKey] as boolean;
                }
            });
            setOptions(newOptions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existingKp, reset]);

    // --- Handlers ---
    const toggleOption = (key: OptionKey) => {
        setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const addDocumentRow = () => {
        if (docItems.length >= MAX_ACCEPT_DATA_CONFIG.document) return;
        setDocItems((prev) => [
            ...prev,
            { id: nextDocId, file: null, name: "" },
        ]);
        setNextDocId((prev) => prev + 1);
    };

    const removeDocumentRow = (idToRemove: number) => {
        if (docItems.length <= 1) return;
        setDocItems((prev) => prev.filter((item) => item.id !== idToRemove));
    };

    const canAdd = docItems.length < MAX_ACCEPT_DATA_CONFIG.document;
    const canDelete = docItems.length >= 2;

    const handleDocFileChange = (id: number, file: File | null) => {
        setDocItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newName =
                        item.name === "" && file ? file.name : item.name;
                    return { ...item, file, name: newName };
                }
                return item;
            }),
        );
    };

    const handleDocNameChange = (id: number, name: string) => {
        setDocItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, name } : item)),
        );
    };

    const { ref: dateRef } = useIMask<HTMLInputElement>(
        { ...DATE_MASK_CONFIG } as FactoryOpts,
        { onAccept: (value: string) => setDateKp(value) },
    );

    // --- Submit Logic ---
    const onSubmit = async (values: KpFormValues) => {
        setServerError(null);

        const model = new KpFormModel();

        const response = await model.submit({
            values,
            docItems,
            selectedManagerId: String(selectedManagerId ?? ""),
            selectedNodeDesignId: String(selectedNodeDesignId ?? ""),
            dateKp,
            estimateFile,
            existingEstimateJson,
            paymentTerms,
            productionConditions,
            options,
            clientId,
            isUpdate,
            kpId,
            existingKp: (existingKp as KpDto) ?? null,
            createKp,
            updateKp,
            uploadEstimate,
            uploadDocuments,
            queryClient,
        });

        if (!response.ok) {
            setServerError(
                response.message ||
                    "Не удалось сохранить коммерческое предложение",
            );
            return;
        }

        router.push("/admin/clients");
    };
    const existingKpName = (existingKp as KpDto | undefined)?.name?.trim();
    const handleCancelAction = () => {
        if (!isUpdate || !id) {
            router.back();
            return;
        }
        navigator.clipboard.writeText(`${window.location.origin}/${id}`);
        toast.success("Ссылка скопирована в буфер обмена");
    };
    const isGlobalLoading =
        createPending ||
        updatePending ||
        uploadEstimatePending ||
        uploadDocsPending ||
        (isUpdate && kpLoading);

    return (
        <div className="flex items-start gap-1.5 w-full">
            <ClientLeftPanel />

            <AdminFormTemplate
                title={
                    isUpdate
                        ? existingKpName || "Редактирование КП"
                        : "Создание КП"
                }
                onCancel={handleCancelAction}
                cancelButtonText={isUpdate ? "Скопировать ссылку" : "Отмена"}
                onSuccess={handleSubmit(onSubmit)}
                loading={isGlobalLoading}
                dataLoading={isUpdate && kpLoading}
            >
                <form
                    className="grid grid-cols-1 gap-5"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {serverError && <AdminError error={serverError} />}

                    <AdminFormGroup title="Название КП">
                        <AdminInput
                            placeholder="Название КП"
                            variant="alternative"
                            error={errors.name?.message}
                            {...register("name", {
                                required: "Введите название КП",
                            })}
                        />
                    </AdminFormGroup>

                    <AdminFormGroup title="Менеджер отдела продаж">
                        <AdminSelect
                            options={managersOptions ?? []}
                            placeholder="Выберите менеджера"
                            value={selectedManagerId}
                            onChange={setSelectedManagerId}
                            isLoading={managersLoading}
                            isSearchable
                        />
                    </AdminFormGroup>

                    <AdminFormGroup
                        title="Коммерческое предложение"
                        childrenClassName="grid grid-cols-2 gap-2.5"
                    >
                        <div className="grid grid-cols-2 gap-2.5">
                            <AdminInput
                                placeholder="Номер КП"
                                variant="alternative"
                                error={errors.numberKp?.message}
                                {...register("numberKp", {
                                    required: "Введите номер КП",
                                })}
                            />
                            <AdminInput
                                ref={dateRef}
                                placeholder="Дата"
                                variant="alternative"
                                defaultValue={dateKp}
                            />
                        </div>

                        <AdminInput
                            placeholder="Адрес оказания услуг"
                            variant="alternative"
                            error={errors.orderAddress?.message}
                            {...register("orderAddress", {
                                required: "Введите адрес",
                            })}
                        />
                        <AdminInput
                            placeholder="Клиент"
                            variant="alternative"
                            error={errors.clientName?.message}
                            {...register("clientName", {
                                required: "Введите имя клиента",
                            })}
                        />
                        <AdminInput
                            placeholder="Контактное лицо"
                            variant="alternative"
                            error={errors.contactPerson?.message}
                            {...register("contactPerson", {
                                required: "Введите контактное лицо",
                            })}
                        />
                        <AdminInput
                            placeholder="Номер заказа"
                            variant="alternative"
                            error={errors.numberOrder?.message}
                            {...register("numberOrder", {
                                required: "Введите номер заказа",
                            })}
                        />
                        <AdminInput
                            placeholder="Детали заказа"
                            variant="alternative"
                            {...register("details")}
                        />
                    </AdminFormGroup>

                    <AdminFormGroup
                        title="Смета"
                        childrenClassName="grid grid-cols-1 gap-2.5"
                    >
                        <AdminInput
                            placeholder="Название сметы"
                            variant="alternative"
                            {...register("estimateName")}
                        />
                        <AdminUploadDropzone
                            icon={<FileSpreadsheet />}
                            accept={ACCEPT_FILES_CONFIG.estimate.join(",")}
                            topText={
                                estimateFile
                                    ? `Выбран файл: ${estimateFile.name}`
                                    : existingEstimateJson
                                      ? `Текущий файл: ${existingEstimateJson.name}`
                                      : "Перетащите excel-файл сюда"
                            }
                            bottomText="или нажмите, чтобы выбрать файл"
                            onFileChange={(file) => {
                                setEstimateFile(file);
                                if (file && !watch("estimateName")) {
                                    setValue("estimateName", file.name);
                                }
                            }}
                        />
                    </AdminFormGroup>

                    <AdminFormGroup title="Документы">
                        {docItems.map((item) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-1 gap-2.5 not-last-of-type:mb-2.5"
                            >
                                <div className="flex items-center gap-2">
                                    <AdminInput
                                        placeholder="Название документа"
                                        variant="alternative"
                                        className="flex-1"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleDocNameChange(
                                                item.id,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {canDelete && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeDocumentRow(item.id)
                                            }
                                            className={cn(
                                                "shrink-0 flex items-center justify-center",
                                                "w-[46px] h-[46px] rounded-[6px]",
                                                "bg-[#F2F2F2] border border-transparent",
                                                "text-black/40",
                                                "hover:bg-[#EEEEEE] hover:border-black/10 hover:text-black",
                                                "transition-colors cursor-pointer",
                                            )}
                                            title="Удалить документ"
                                        >
                                            <Trash2 width={16} height={16} />
                                        </button>
                                    )}
                                </div>

                                <AdminUploadDropzone
                                    icon={<FileIcon />}
                                    accept={ACCEPT_FILES_CONFIG.documents.join(
                                        ",",
                                    )}
                                    topText={
                                        item.file
                                            ? `Выбран файл: ${item.file.name}`
                                            : item.serverFile?.filePath
                                              ? `Текущий файл: ${item.name || item.serverFile.name || item.serverFile.filePath.split(/[/\\]/).pop() || "документ"}`
                                              : "Перетащите документ сюда"
                                    }
                                    onFileChange={(file) =>
                                        handleDocFileChange(item.id, file)
                                    }
                                />
                            </div>
                        ))}

                        {canAdd && (
                            <div className="w-full flex justify-end pt-2.5">
                                <button
                                    type="button"
                                    onClick={addDocumentRow}
                                    className={cn(
                                        onest.className,
                                        "flex items-center gap-1 text-[14px] leading-[90%] tracking-[0%] text-black cursor-pointer",
                                    )}
                                >
                                    Добавить документ
                                    <PlusIcon width={12} height={12} />
                                </button>
                            </div>
                        )}
                    </AdminFormGroup>

                    {/* --- Динамические блоки --- */}
                    <DynamicSection
                        title="Оплата и сроки работ"
                        items={paymentTerms}
                        setItems={setPaymentTerms}
                        maxLength={MAX_LENGTH_DYNAMIC_ITEM.paymentTerms}
                    />

                    <DynamicSection
                        title="Условия для производства работ"
                        items={productionConditions}
                        setItems={setProductionConditions}
                        maxLength={MAX_LENGTH_DYNAMIC_ITEM.productionConditions}
                    />

                    <AdminFormGroup title="Вариация конструкции узлов продуктов">
                        <AdminSelect
                            options={nodeDesignOptions ?? []}
                            placeholder="Выберите вариацию конструкции узлов продуктов"
                            value={selectedNodeDesignId}
                            onChange={setSelectedNodeDesignId}
                            isLoading={nodeDesignLoading}
                            isSearchable
                        />
                    </AdminFormGroup>

                    {/* Блок с переключателями */}
                    <div className="grid grid-cols-1 gap-2.5 pt-2">
                        {TOGGLE_OPTIONS.map((item) => (
                            <AdminBigToggle
                                key={item.key}
                                label={item.label}
                                value={options[item.key]}
                                onChange={() => toggleOption(item.key)}
                            />
                        ))}
                    </div>
                </form>
            </AdminFormTemplate>
        </div>
    );
};
