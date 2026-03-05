import type { Metadata } from "next";
import "@/shared/styles/globals.css";

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
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
