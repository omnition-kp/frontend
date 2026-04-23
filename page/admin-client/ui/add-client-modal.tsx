"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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

    const { control, handleSubmit, reset, setError } =
        useForm<CreateClientFormValues>({
            defaultValues: {
                name: "",
            },
        });

    useEffect(() => {
        if (isOpen) {
            reset({ name: "" });
        }
    }, [isOpen, reset]);

    // Обработчик отправки
    const onSubmit = async (values: CreateClientFormValues) => {
        console.log("[AddClientModal] submit values:", values);
        const normalizedName = values.name.trim();
        console.log("[AddClientModal] normalized name:", normalizedName);

        if (!normalizedName) {
            console.warn("[AddClientModal] blocked: empty name after trim");
            setError("name", {
                type: "required",
                message: "Введите имя клиента",
            });
            return;
        }

        try {
            const payload = { name: normalizedName };
            console.log("[AddClientModal] createClient payload:", payload);

            const response = await createClient({
                data: payload,
            });
            console.log("[AddClientModal] createClient response:", response);

            await queryClient.invalidateQueries({
                queryKey: getClientControllerGetAllQueryKey(),
            });

            onClose();
        } catch (e) {
            console.error("[AddClientModal] createClient error:", e);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
            <form
                onSubmit={handleSubmit(onSubmit)}
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

                <div className="flex flex-col gap-8">
                    <div>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Введите имя клиента",
                            }}
                            render={({ field, fieldState }) => (
                                <AdminInput
                                    placeholder="Имя клиента"
                                    variant="alternative"
                                    disabled={isPending}
                                    error={fieldState.error?.message}
                                    value={field.value ?? ""}
                                    onChange={(event) =>
                                        field.onChange(event.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                />
                            )}
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
                </div>
            </form>
        </div>
    );
};
