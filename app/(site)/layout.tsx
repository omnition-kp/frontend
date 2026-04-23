import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { QueryProvider } from "@/shared/providers";

export const metadata: Metadata = {
    title: "OMNITON - производитель архитектурного бетона",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`antialiased`}>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
