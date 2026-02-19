"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/shared/config";

const COOKIE_NAME = "accessToken";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function setAuthCookie(token: string) {
    if (!token || typeof token !== "string") {
        return { success: false, error: "Token is required" };
    }

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: isProduction,
        path: "/",
        maxAge: MAX_AGE,
        sameSite: "lax",
    });

    return { success: true };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect(LOGIN_ROUTE);
}
