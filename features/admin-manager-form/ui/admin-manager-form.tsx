"use client";

import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
    AdminError,
    AdminFormGroup,
    AdminInput,
    AdminUploadDropzone,
} from "@/shared/admin";
import { ALLOWED_TYPES } from "@/shared/config";
import {
    getManagerControllerGetAllQueryKey,
    getManagerControllerFindByIdQueryKey,
    useManagerControllerCreate,
    useManagerControllerFindById,
    useManagerControllerUpdate,
} from "@/shared/queries";
import type { AdminFormProps } from "@/shared/types";
import type { ManagerDto } from "@/shared/types/server";
import { deleteImage, uploadImage } from "@/shared/utils";
import { AdminFormTemplate } from "@/widgets/admin-form-template";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ManagerFormValues } from "../types/manager-form-values";

export const AdminManagerForm = ({ type, id, loading }: AdminFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [serverError, setServerError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    const managerId = Number(id);
    const isUpdate = type === "update" && Number.isFinite(managerId);

    // ─── Мутации ────────────────────────────────────────────────────
    const { mutateAsync: createManager, isPending: createPending } =
        useManagerControllerCreate();
    const { mutateAsync: updateManager, isPending: updatePending } =
        useManagerControllerUpdate();

    // ─── Загрузка существующего менеджера ────────────────────────────
    const { data: manager, isLoading: managerLoading } =
        useManagerControllerFindById(managerId, {
            query: {
                enabled: isUpdate,
                select: (response): ManagerDto | null => {
                    const maybeDto = response as unknown;
                    if (
                        maybeDto &&
                        typeof maybeDto === "object" &&
                        "id" in maybeDto &&
                        "name" in maybeDto
                    ) {
                        return maybeDto as ManagerDto;
                    }

                    const maybeObjectResponse = response as {
                        data?: ManagerDto;
                    };
                    if (maybeObjectResponse?.data) {
                        return maybeObjectResponse.data;
                    }

                    return null;
                },
            },
        });

    // ─── Форма ──────────────────────────────────────────────────────
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ManagerFormValues>({
        defaultValues: {
            name: "",
            post: "",
            phone: "",
            email: "",
        },
    });

    useEffect(() => {
        if (!manager) return;

        reset({
            name: manager.name,
            post: manager.post,
            phone: manager.phone,
            email: manager.email,
        });
    }, [manager, reset]);

    const isSubmitting =
        loading || createPending || updatePending || isImageUploading;

    // ─── Парсинг ошибок ─────────────────────────────────────────────
    const parseError = (error: unknown): string => {
        let errorMessage = "Произошла неизвестная ошибка";

        if (error instanceof AxiosError) {
            const backendMessage = error.response?.data?.message;

            if (Array.isArray(backendMessage) && backendMessage.length > 0) {
                errorMessage = String(backendMessage[0]);
            } else if (typeof backendMessage === "string") {
                errorMessage = backendMessage;
            } else {
                errorMessage = "Ошибка сервера. Попробуйте позже.";
            }
        } else if (error instanceof Error && error.message) {
            errorMessage = error.message;
        }

        return errorMessage;
    };

    // ─── Отправка формы ─────────────────────────────────────────────
    const onSubmit = async (values: ManagerFormValues) => {
        setServerError(null);

        try {
            const currentPhoto = manager?.photo ?? "";
            let photo = currentPhoto;
            const hasNewImage = !!selectedFile;

            if (hasNewImage && selectedFile) {
                setIsImageUploading(true);
                setUploadProgress(0);

                const uploadResult = await uploadImage(
                    selectedFile,
                    ["managers"],
                    {
                        onProgress: (progress) => {
                            setUploadProgress(progress);
                        },
                    },
                );

                if (!uploadResult.success || !uploadResult.url) {
                    throw new Error(
                        uploadResult.error ??
                            "Не удалось загрузить изображение",
                    );
                }

                photo = uploadResult.url;
            }

            if (!photo) {
                throw new Error("Загрузите фото менеджера");
            }

            const payload = {
                name: values.name.trim(),
                post: values.post.trim(),
                phone: values.phone.trim(),
                email: values.email.trim(),
                photo,
            };

            if (type === "create") {
                await createManager({ data: payload });
            } else {
                if (!isUpdate) {
                    throw new Error("Некорректный ID для редактирования");
                }

                await updateManager({ id: managerId, data: payload });

                if (hasNewImage && currentPhoto && currentPhoto !== photo) {
                    const deleteResult = await deleteImage(currentPhoto);
                    if (!deleteResult.success) {
                        throw new Error(
                            deleteResult.error ??
                                "Данные сохранены, но старое фото не удалено",
                        );
                    }
                }
            }

            await queryClient.invalidateQueries({
                queryKey: getManagerControllerGetAllQueryKey(),
            });

            if (isUpdate) {
                await queryClient.invalidateQueries({
                    queryKey: getManagerControllerFindByIdQueryKey(managerId),
                });
            }

            router.push("/admin/managers");
        } catch (error) {
            setServerError(parseError(error));
        } finally {
            setIsImageUploading(false);
            setUploadProgress(null);
        }
    };

    // ─── Рендер ─────────────────────────────────────────────────────
    return (
        <AdminFormTemplate
            title={
                type === "create"
                    ? "Добавить менеджера"
                    : "Редактировать менеджера"
            }
            onCancel={() => router.push("/admin/managers")}
            onSuccess={handleSubmit(onSubmit)}
            loading={isSubmitting}
            dataLoading={loading || (isUpdate && managerLoading)}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {serverError && <AdminError error={serverError} />}

                <AdminFormGroup
                    title="Информация"
                    childrenClassName="grid grid-cols-1 gap-2"
                >
                    <AdminInput
                        placeholder="Имя менеджера"
                        variant="alternative"
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Введите имя менеджера",
                        })}
                    />

                    <AdminInput
                        placeholder="Должность"
                        variant="alternative"
                        error={errors.post?.message}
                        {...register("post", {
                            required: "Введите должность",
                        })}
                    />

                    <AdminInput
                        placeholder="Телефон"
                        variant="alternative"
                        error={errors.phone?.message}
                        {...register("phone", {
                            required: "Введите телефон",
                        })}
                    />

                    <AdminInput
                        placeholder="Email"
                        variant="alternative"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Введите email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Некорректный формат email",
                            },
                        })}
                    />

                    <AdminUploadDropzone
                        icon={<Camera />}
                        accept={ALLOWED_TYPES.join(",")}
                        initialPreviewUrl={manager?.photo ?? null}
                        initialPreviewAlt={manager?.name ?? "Фото менеджера"}
                        isUploading={isImageUploading}
                        uploadProgress={uploadProgress}
                        disabled={isSubmitting}
                        onFileChange={setSelectedFile}
                    />
                </AdminFormGroup>
            </form>
        </AdminFormTemplate>
    );
};
