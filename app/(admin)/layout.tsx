import type { ReactNode } from "react";
import "@/shared/styles/admin.css";
import { AdminLeftPanel } from "@/widgets/admin-left-panel";
import { Metadata } from "next";
import { QueryProvider } from "@/shared/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Omition | Admin",
};

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <body className="bg-white min-h-screen">
                <QueryProvider>
                    <div className="flex items-start gap-5 px-5 py-8 relative">
                        <AdminLeftPanel />
                        <main className="w-full min-w-0">{children}</main>
                    </div>

                    <Toaster position="bottom-left" richColors />
                </QueryProvider>
            </body>
        </html>
    );
}
