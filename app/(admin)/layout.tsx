import type { ReactNode } from "react";
import "@/shared/styles/admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <div className="bg-white min-h-screen">{children}</div>;
}
