import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOGIN_ROUTE, ADMIN_ONLY_PATHS } from "@/shared/config";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("accessToken")?.value;

    const normalizedPath = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;

    const isLoginPage = normalizedPath === LOGIN_ROUTE;
    const isAdminSection = normalizedPath.startsWith("/admin");

    // С токеном на странице входа — редирект в админку
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Защита админки: без токена или с невалидным токеном — на логин или 404
    if (isAdminSection && !isLoginPage) {
        if (!token) {
            return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
        }

        try {
            const apiHost =
                process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3000";
            const cleanHost = apiHost.replace(/\/$/, "");
            const url = `${cleanHost}/admin/me`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Auth failed");
            }

            const profile = (await response.json()) as { role: string };

            // Маршруты только для админов: модераторам — редирект в админку
            const isAdminOnlyRoute = ADMIN_ONLY_PATHS.some((path) =>
                normalizedPath.startsWith(path),
            );
            if (isAdminOnlyRoute && profile.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/admin", request.url));
            }

            return NextResponse.next();
        } catch {
            const response = NextResponse.redirect(
                new URL(LOGIN_ROUTE, request.url),
            );
            response.cookies.delete("accessToken");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*"],
};
