"use client";

import { useForm } from "react-hook-form";
import { AdminHeadlineForm } from "@/shared/admin";
import { AdminButton } from "@/shared/admin/ui/admin-button";
import { AdminInput } from "@/shared/admin/ui/admin-input";
import { useState } from "react";
import { AdminError } from "@/shared/admin/ui/admin-error";

import type { AuthFormValues } from "../types/auth-form-values";

export const AdminAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: AuthFormValues) => {
        setLoading(true);
        setError(null);
        console.log(data);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <form
                className="p-7.5 bg-[#F9F9F9] rounded-[4px] min-w-[400px]"
                onSubmit={(e) => {
                    e.preventDefault();
                    void handleSubmit(onSubmit)(e);
                }}
            >
                <AdminHeadlineForm
                    title="Войти в систему"
                    className="text-black text-center mb-7"
                />

                {error && <AdminError error={error} />}

                <div className="grid grid-cols-1 gap-3 mb-5">
                    <AdminInput
                        placeholder="Email"
                        autoComplete="email"
                        type="email"
                        {...register("email", {
                            required: "Введите email",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email",
                            },
                        })}
                        error={errors.email?.message}
                    />

                    <AdminInput
                        placeholder="Пароль"
                        type="password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Введите пароль",
                        })}
                        error={errors.password?.message}
                    />
                </div>

                <AdminButton
                    type="submit"
                    className="w-full py-3"
                    loading={loading}
                >
                    Войти
                </AdminButton>
            </form>
        </div>
    );
};
