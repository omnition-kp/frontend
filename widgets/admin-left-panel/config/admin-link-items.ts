import { FilePenIcon, Image, Users } from "lucide-react";
import { AdminNavLinkItem } from "../types/admin-nav-link-item";

export const ADMIN_LINK_ITEMS: AdminNavLinkItem[] = [
    {
        href: "/admin/clients",
        icon: Users,
        title: "Клиенты",
    },
    {
        href: "/admin/managers",
        icon: Users,
        title: "Менеджеры",
    },
    {
        href: "/admin/node-design",
        icon: Image,
        title: "Узлы продуктов",
    },
    {
        href: "/admin/admin",
        icon: FilePenIcon,
        title: "Дотсупы",
        forAdmin: true,
    },
];
