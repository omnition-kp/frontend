import { LucideIcon } from "lucide-react";

export interface AdminNavLinkItem {
    href: string;
    icon: LucideIcon;
    title: string;
    forAdmin?: boolean;
}
