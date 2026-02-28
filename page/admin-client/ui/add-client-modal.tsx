"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { AdminInput, AdminError, AdminButton } from "@/shared/admin"; // Используем ваши компоненты
import { cn } from "@/shared/utils";
import { onest } from "@/shared/config";
import {
    useClientControllerCreate,
    getClientControllerGetAllQueryKey,
} from "@/shared/queries"; // Предполагаемые хуки

interface AddClientModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CreateClientFormValues {
    name: string;
}

export const AddClientModal = ({ isOpen, onClose }: AddClientModalProps) => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: createClient,
        isPending,
        error: mutationError,
    } = useClientControllerCreate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateClientFormValues>();

    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    // Обработчик отправки
    const onSubmit = async (values: CreateClientFormValues) => {
        try {
            await createClient({
                data: { name: values.name },
            });

            await queryClient.invalidateQueries({
                queryKey: getClientControllerGetAllQueryKey(),
            });

            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
            <div
                className={cn(
                    "relative w-full max-w-[540px] rounded-[12px] bg-white p-10 shadow-xl",
                    onest.className,
                )}
            >
                <h2 className="mb-6 text-center text-[20px] font-medium leading-[120%] text-[#1A1A1A]">
                    Добавить нового клиента
                </h2>

                {mutationError ? (
                    <div className="mb-4">
                        <AdminError
                            error={
                                (
                                    mutationError as {
                                        response?: {
                                            data?: { message?: string };
                                        };
                                    }
                                )?.response?.data?.message ||
                                (mutationError as Error)?.message ||
                                "Ошибка создания"
                            }
                        />
                    </div>
                ) : null}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-8"
                >
                    <div>
                        <AdminInput
                            placeholder="Имя клиента"
                            variant="alternative" // Используем стиль как в поиске
                            error={errors.name?.message}
                            disabled={isPending}
                            {...register("name", {
                                required: "Введите имя клиента",
                            })}
                        />
                    </div>

                    {/* Кнопки */}
                    <div className="grid grid-cols-2 gap-3">
                        <AdminButton
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className={cn(
                                "flex h-12 items-center justify-center rounded-[6px] border border-[#E4E4E4] bg-white text-[16px] font-medium text-[#1A1A1A] transition-colors",
                                "hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50",
                            )}
                        >
                            Отменить
                        </AdminButton>
                        <AdminButton
                            type="submit"
                            disabled={isPending}
                            className={cn(
                                "flex h-12 items-center justify-center rounded-[6px] bg-[#333333] text-[16px] font-medium text-white transition-colors",
                                "hover:bg-black active:scale-[0.99] disabled:opacity-50",
                            )}
                        >
                            {isPending ? "Сохранение..." : "Сохранить"}
                        </AdminButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
