"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { AdminHeadlineForm } from "@/shared/admin";
import { AdminButton } from "@/shared/admin/ui/admin-button";
import { AdminInput } from "@/shared/admin/ui/admin-input";
import { useState } from "react";
import { AdminError } from "@/shared/admin/ui/admin-error";
import { sendAuth, getTokenFromResponse } from "../api/send-auth";
import { setAuthCookie } from "../actions/auth.actions";

import type { AuthFormValues } from "../types/auth-form-values";

export const AdminAuth = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
        setError(null);
        try {
            const response = await sendAuth(data);
            const token = getTokenFromResponse(response);

            if (!token) {
                throw new Error("Токен не получен от сервера");
            }

            const cookieResult = await setAuthCookie(token);

            if (!cookieResult?.success) {
                setError(cookieResult?.error ?? "Ошибка сохранения сессии");
                throw new Error(
                    cookieResult?.error ?? "Ошибка сохранения сессии",
                );
            }

            router.push("/admin");
        } catch (err) {
            let errorMessage = "Произошла неизвестная ошибка";

            if (err instanceof AxiosError) {
                const backendMessage = err.response?.data?.message;
                if (Array.isArray(backendMessage)) {
                    errorMessage = backendMessage[0];
                } else if (typeof backendMessage === "string") {
                    errorMessage = backendMessage;
                } else {
                    errorMessage =
                        err.response?.status === 401
                            ? "Неверный email или пароль"
                            : "Ошибка сервера. Попробуйте позже.";
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <form
                className="p-7.5 bg-[#F9F9F9] rounded-[4px] w-[400px]"
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        {...register("password", {
                            required: "Введите пароль",
                        })}
                        error={errors.password?.message}
                    />
                </div>

                <AdminButton
                    type="submit"
                    className="w-full py-3"
                    loading={isSubmitting}
                >
                    Войти
                </AdminButton>
            </form>
        </div>
    );
};
