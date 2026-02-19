import Link from "next/link";
import { AdminNavLinkProps } from "../types/admin-nav-link.props";
import { cn } from "@/shared/utils";
import { gtWalsheim } from "@/shared/config";

export const AdminNavLink = ({
    href,
    icon: Icon,
    title,
    isActive,
    loading,
}: AdminNavLinkProps) => {
    if (loading) {
        return (
            <div
                className={cn(
                    "p-0.5 rounded-[4px] border border-[#ECECEC]/50 bg-[#ECECEC]/50",
                    "flex items-center gap-2 animate-pulse",
                )}
            >
                <div className="bg-white/50 rounded-[2px] w-9.5 h-9.5 shrink-0" />
                <div className="h-4 bg-white/50 rounded flex-1 max-w-[120px]" />
            </div>
        );
    }

    return (
        <Link
            href={href}
            className={cn(
                gtWalsheim.className,
                "text-[16px] font-medium leading-[100%] tracking-[0%] transition-all duration-300 ease-in-out",
                "p-0.5 rounded-[4px] border group",
                "hover:text-white hover:border-[#4C4C4C]/20 hover:bg-violet",
                "flex items-center gap-2",
                isActive ? "text-white" : "text-gray",
                isActive ? "cursor-default" : "cursor-pointer",
                isActive
                    ? "border-[#4C4C4C]/20 bg-violet"
                    : "border-[#ECECEC]/50 bg-[#ECECEC]/50",
            )}
        >
            <div className="bg-white rounded-[2px] w-9.5 h-9.5 flex items-center justify-center">
                <Icon
                    width={18}
                    height={18}
                    className={cn(
                        isActive ? "text-violet" : "text-black",
                        "group-hover:text-violet transition-colors duration-300 ease-in-out",
                    )}
                />
            </div>

            <p>{title}</p>
        </Link>
    );
};
