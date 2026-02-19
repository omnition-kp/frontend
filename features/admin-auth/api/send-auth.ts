import { $apiAdmin } from "@/shared/utils";
import type { AuthFormValues } from "../types/auth-form-values";

type LoginResponse = {
    access_token?: string;
    accessToken?: string;
    token?: string;
};

export const sendAuth = async (authData: AuthFormValues) => {
    const { data } = await $apiAdmin.post<LoginResponse>("/login", authData);
    return data;
};

export const getTokenFromResponse = (
    response: LoginResponse,
): string | null => {
    return (
        response?.access_token ??
        response?.accessToken ??
        response?.token ??
        null
    );
};
