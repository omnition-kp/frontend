import type { ReactNode } from "react";
import "@/shared/styles/admin.css";

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
    return <div className="bg-white min-h-screen">{children}</div>;
}
