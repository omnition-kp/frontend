import { cn } from "@/shared/utils";
import { AdminProfileProps } from "../types/admin-profile.props";
import Image from "next/image";
import { gtWalsheim } from "@/shared/config";
import { ADMIN_PANEL_TEXT_CLASS } from "../config";

export const AdminProfile = ({ name, role, loading }: AdminProfileProps) => {
    if (loading) {
        return (
            <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-0.5 flex items-center gap-2 w-full mb-9">
                <div className="w-[38px] h-[38px] rounded-[2px] bg-[#E5E5E5] animate-pulse shrink-0" />
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="h-[14px] w-3/4 rounded bg-[#E5E5E5] animate-pulse" />
                    <div className="h-[14px] w-1/2 rounded bg-[#E5E5E5] animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-[#F2F2F2] rounded-[4px] p-0.5 flex items-center gap-2 w-full mb-9">
            <Image
                src="/admin-images/avatar.png"
                alt="profile"
                width={38}
                height={38}
                sizes="38px"
                unoptimized
                className="rounded-[2px]"
            />

            <div>
                <p
                    className={cn(
                        gtWalsheim.className,
                        ADMIN_PANEL_TEXT_CLASS,
                        "text-gray",
                    )}
                >
                    {name}
                </p>

                <p
                    className={cn(
                        gtWalsheim.className,
                        ADMIN_PANEL_TEXT_CLASS,
                        "text-[#ADADAD] text-[14px]!",
                    )}
                >
                    {role}
                </p>
            </div>
        </div>
    );
};
