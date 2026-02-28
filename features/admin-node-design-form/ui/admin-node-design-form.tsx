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
    getNodeDesignControllerGetAllQueryKey,
    getNodeDesignControllerFindByIdQueryKey,
    useNodeDesignControllerCreate,
    useNodeDesignControllerFindById,
    useNodeDesignControllerUpdate,
} from "@/shared/queries";
import type { AdminFormProps } from "@/shared/types";
import type { NodeDesignDto } from "@/shared/types/server";
import { deleteImage, uploadImage } from "@/shared/utils";
import { AdminFormTemplate } from "@/widgets/admin-form-template";
import { Image } from "lucide-react";
import { useRouter } from "next/navigation";
import type { NodeDesignFormValues } from "../types/node-design-form-values";

export const AdminNodeDesignForm = ({ type, id, loading }: AdminFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [serverError, setServerError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    const nodeDesignId = Number(id);
    const isUpdate = type === "update" && Number.isFinite(nodeDesignId);

    const { mutateAsync: createNodeDesign, isPending: createPending } =
        useNodeDesignControllerCreate();
    const { mutateAsync: updateNodeDesign, isPending: updatePending } =
        useNodeDesignControllerUpdate();

    const { data: nodeDesign, isLoading: nodeDesignLoading } =
        useNodeDesignControllerFindById(nodeDesignId, {
            query: {
                enabled: isUpdate,
                select: (response): NodeDesignDto | null => {
                    const maybeDto = response as unknown;
                    if (
                        maybeDto &&
                        typeof maybeDto === "object" &&
                        "id" in maybeDto &&
                        "name" in maybeDto &&
                        "photo" in maybeDto
                    ) {
                        return maybeDto as NodeDesignDto;
                    }

                    const maybeObjectResponse = response as {
                        data?: NodeDesignDto;
                    };
                    if (maybeObjectResponse?.data) {
                        return maybeObjectResponse.data;
                    }

                    return null;
                },
            },
        });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NodeDesignFormValues>({
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        if (!nodeDesign) {
            return;
        }

        reset({
            name: nodeDesign.name,
        });
    }, [nodeDesign, reset]);

    const isSubmitting =
        loading || createPending || updatePending || isImageUploading;

    const parseError = (error: unknown) => {
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

    const onSubmit = async (values: NodeDesignFormValues) => {
        setServerError(null);

        try {
            const currentPhoto = nodeDesign?.photo ?? "";
            let photo = currentPhoto;
            const hasNewImage = !!selectedFile;

            if (hasNewImage && selectedFile) {
                setIsImageUploading(true);
                setUploadProgress(0);

                const uploadResult = await uploadImage(
                    selectedFile,
                    ["node-design"],
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
                throw new Error("Загрузите изображение");
            }

            if (type === "create") {
                await createNodeDesign({
                    data: {
                        name: values.name.trim(),
                        photo,
                    },
                });
            } else {
                if (!isUpdate) {
                    throw new Error("Некорректный ID для редактирования");
                }

                await updateNodeDesign({
                    id: nodeDesignId,
                    data: {
                        name: values.name.trim(),
                        photo,
                    },
                });

                if (hasNewImage && currentPhoto && currentPhoto !== photo) {
                    const deleteResult = await deleteImage(currentPhoto);
                    if (!deleteResult.success) {
                        throw new Error(
                            deleteResult.error ??
                                "Данные сохранены, но старое изображение не удалено",
                        );
                    }
                }
            }

            await queryClient.invalidateQueries({
                queryKey: getNodeDesignControllerGetAllQueryKey(),
            });

            if (isUpdate) {
                await queryClient.invalidateQueries({
                    queryKey:
                        getNodeDesignControllerFindByIdQueryKey(nodeDesignId),
                });
            }

            router.push("/admin/node-design");
        } catch (error) {
            setServerError(parseError(error));
        } finally {
            setIsImageUploading(false);
            setUploadProgress(null);
        }
    };

    return (
        <AdminFormTemplate
            title={
                type === "create"
                    ? "Добавить узел дизайна"
                    : "Редактировать узел дизайна"
            }
            onCancel={() => router.push("/admin/node-design")}
            onSuccess={handleSubmit(onSubmit)}
            loading={isSubmitting}
            dataLoading={loading || (isUpdate && nodeDesignLoading)}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {serverError && <AdminError error={serverError} />}

                <AdminFormGroup
                    title="Информация"
                    childrenClassName="grid grid-cols-1 gap-2"
                >
                    <AdminInput
                        placeholder="Название вариации"
                        variant="alternative"
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Введите название",
                        })}
                    />

                    <AdminUploadDropzone
                        icon={
                            // eslint-disable-next-line jsx-a11y/alt-text -- lucide Image is SVG icon
                            <Image aria-hidden />
                        }
                        accept={ALLOWED_TYPES.join(",")}
                        initialPreviewUrl={nodeDesign?.photo ?? null}
                        initialPreviewAlt={
                            nodeDesign?.name ?? "Текущее изображение"
                        }
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
