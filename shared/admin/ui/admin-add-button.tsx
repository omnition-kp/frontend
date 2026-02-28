"use client";

import { PlusIcon } from "lucide-react";
import { AdminAddButtonProps } from "../types";
import { AdminMainText } from "./admin-main-text";
import { cn } from "@/shared/utils";
import { onest } from "@/shared/config";
import { useRouter } from "next/navigation";

export const AdminAddButton = ({
    children,
    className,
    link,
    typeOfButton = "button",
    onClick,
    ...props
}: AdminAddButtonProps) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (typeOfButton === "link") {
            router.push(`/admin/${link}/create`);
        } else {
            onClick?.(e);
        }
    };

    return (
        <button
            className={cn(
                onest.className,
                "group flex items-center gap-2 cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
                className,
            )}
            onClick={handleClick}
            {...props}
        >
            <AdminMainText variant="2">{children}</AdminMainText>
            <PlusIcon
                width={12}
                height={12}
                className="transition-transform duration-200 ease-out group-hover:rotate-90 group-hover:scale-110"
            />
        </button>
    );
};
