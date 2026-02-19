import { NextResponse } from "next/server";

const COOKIE_NAME = "accessToken";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token || typeof token !== "string") {
            return NextResponse.json(
                { success: false, error: "Token is required" },
                { status: 400 },
            );
        }

        const isProduction = process.env.NODE_ENV === "production";

        const response = NextResponse.json({ success: true });
        response.cookies.set(COOKIE_NAME, token, {
            httpOnly: true,
            secure: isProduction,
            path: "/",
            maxAge: MAX_AGE,
            sameSite: "lax",
        });

        return response;
    } catch {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 },
        );
    }
}
