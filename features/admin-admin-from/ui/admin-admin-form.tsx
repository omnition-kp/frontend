"use client";

import { AxiosError } from "axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
    AdminError,
    AdminFormGroup,
    AdminInput,
    AdminSelect,
} from "@/shared/admin";
import {
    getAdminControllerGetAllQueryKey,
    useAdminControllerCreate,
} from "@/shared/queries";
import type { AdminCreateDtoRole } from "@/shared/types/server";
import { AdminFormTemplate } from "@/widgets/admin-form-template";
import { adminRoleOptions } from "../config/admin-role-options";

interface CreateAdminFormValues {
    name: string;
    role: AdminCreateDtoRole | null;
    email: string;
    password: string;
}

export const AdminAdminForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [serverError, setServerError] = useState<string | null>(null);
    const { mutateAsync: createAdmin, isPending } = useAdminControllerCreate();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateAdminFormValues>({
        defaultValues: {
            name: "",
            role: null,
            email: "",
            password: "",
        },
    });

    const handleCancel = () => {
        router.push("/admin/admin");
    };

    const onSubmit = async (values: CreateAdminFormValues) => {
        if (!values.role) {
            return;
        }

        setServerError(null);

        try {
            await createAdmin({
                data: {
                    name: values.name.trim(),
                    role: values.role,
                    email: values.email.trim(),
                    password: values.password,
                },
            });

            await queryClient.invalidateQueries({
                queryKey: getAdminControllerGetAllQueryKey(),
            });

            router.push("/admin/admin");
        } catch (error) {
            let errorMessage = "Произошла неизвестная ошибка";

            if (error instanceof AxiosError) {
                const backendMessage = error.response?.data?.message;

                if (
                    Array.isArray(backendMessage) &&
                    backendMessage.length > 0
                ) {
                    errorMessage = String(backendMessage[0]);
                } else if (typeof backendMessage === "string") {
                    errorMessage = backendMessage;
                } else {
                    errorMessage = "Ошибка сервера. Попробуйте позже.";
                }
            } else if (error instanceof Error && error.message) {
                errorMessage = error.message;
            }

            setServerError(errorMessage);
        }
    };

    return (
        <AdminFormTemplate
            title="Добавить участника"
            onCancel={handleCancel}
            onSuccess={handleSubmit(onSubmit)}
            loading={isPending}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {serverError && <AdminError error={serverError} />}

                <AdminFormGroup
                    title="Информация"
                    childrenClassName="grid grid-cols-1 gap-2"
                >
                    <AdminInput
                        placeholder="Имя участника"
                        variant="alternative"
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Введите имя",
                        })}
                    />

                    <Controller
                        control={control}
                        name="role"
                        rules={{
                            required: "Выберите роль",
                        }}
                        render={({ field }) => (
                            <AdminSelect
                                options={adminRoleOptions}
                                placeholder="Выберите роль"
                                value={field.value}
                                onChange={(value) =>
                                    field.onChange(
                                        (value as AdminCreateDtoRole | null) ??
                                            null,
                                    )
                                }
                            />
                        )}
                    />

                    <AdminInput
                        placeholder="Email"
                        variant="alternative"
                        type="email"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Введите email",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Некорректный email",
                            },
                        })}
                    />

                    <AdminInput
                        placeholder="Пароль"
                        variant="alternative"
                        type="password"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "Введите пароль",
                            minLength: {
                                value: 6,
                                message: "Минимум 6 символов",
                            },
                        })}
                    />

                    {errors.role?.message && (
                        <p className="text-[13px] leading-[120%] text-red-500">
                            {errors.role.message}
                        </p>
                    )}
                </AdminFormGroup>
            </form>
        </AdminFormTemplate>
    );
};
