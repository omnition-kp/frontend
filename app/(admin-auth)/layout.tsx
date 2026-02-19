import type { ReactNode } from "react";
import "@/shared/styles/admin.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Вход в систему",
};

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body className="bg-white min-h-screen">{children}</body>
        </html>
    );
}
