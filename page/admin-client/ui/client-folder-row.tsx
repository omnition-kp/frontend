"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { gtWalsheim } from "@/shared/config";
import { cn } from "@/shared/utils";
import { AdminHighlightedText } from "@/shared/admin";
import { ClientOfferRow } from "./client-offer-row";
import type { ClientFolderRowProps } from "../types/client-folder-row.props";
import { useRouter } from "next/navigation";

export const ClientFolderRow = ({
    folder,
    isOpened,
    onToggle,
    searchValue,
}: ClientFolderRowProps) => {
    const router = useRouter();

    return (
        <div className="bg-[#F2F2F2]">
            <div
                className={cn(
                    gtWalsheim.className,
                    "grid grid-cols-[72px_1fr_180px_240px] items-center",
                    "px-5 py-4 text-[18px] leading-[112%]",
                )}
            >
                <p>{folder.numberLabel}</p>
                <AdminHighlightedText
                    text={folder.name}
                    highlight={searchValue}
                />
                <p>{folder.cpCount} КП</p>

                <div className="flex items-center justify-between gap-3">
                    <button
                        type="button"
                        className="text-[20px] underline underline-offset-2 hover:text-black transition-colors cursor-pointer"
                        onClick={() =>
                            router.push(`/admin/kp/create/${folder.id}`)
                        }
                    >
                        СОЗДАТЬ КП
                    </button>

                    <button
                        type="button"
                        onClick={() => onToggle(folder.id)}
                        className={cn(
                            "text-[#4C4C4C] transition-colors",
                            folder.offers.length === 0
                                ? "cursor-default opacity-0 pointer-events-none"
                                : "hover:text-black cursor-pointer",
                        )}
                        aria-label={
                            isOpened ? "Свернуть папку" : "Развернуть папку"
                        }
                    >
                        {isOpened ? (
                            <ChevronUpIcon width={20} height={20} />
                        ) : (
                            <ChevronDownIcon width={20} height={20} />
                        )}
                    </button>
                </div>
            </div>

            {isOpened && folder.offers.length > 0 && (
                <div className="border-t border-[#E4E4E4] bg-[#F2F2F2]">
                    {folder.offers.map((offer) => (
                        <ClientOfferRow
                            key={offer.id}
                            title={offer.title}
                            searchValue={searchValue}
                            numberKp={offer.numberKp.toString()}
                            id={offer.id}
                            clientId={folder.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
