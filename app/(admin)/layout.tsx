import type { ReactNode } from "react";
import "@/shared/styles/admin.css";
import { AdminLeftPanel } from "@/widgets/admin-left-panel";
import { Metadata } from "next";
import { QueryProvider } from "@/shared/providers";

export const metadata: Metadata = {
    title: "Omition | Admin",
};

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <body className="bg-white min-h-screen">
                <QueryProvider>
                    <div className=" flex gap-5 px-5 py-8">
                        <AdminLeftPanel />
                        {children}
                    </div>
                </QueryProvider>
            </body>
        </html>
    );
}
