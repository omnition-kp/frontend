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
    isEditing,
    onDelete,
}: ClientFolderRowProps) => {
    const router = useRouter();
    const canToggle = folder.offers.length > 0;

    return (
        <div className="bg-[#F2F2F2]">
            <div
                className={cn(
                    gtWalsheim.className,
                    "grid grid-cols-[72px_1fr_180px_240px] items-center",
                    "px-5 py-4 text-[18px] leading-[112%]",
                )}
            >
                <button
                    type="button"
                    onClick={() =>
                        !isEditing && canToggle && onToggle(folder.id)
                    }
                    className={cn(
                        "col-span-3 grid grid-cols-[72px_1fr_180px] items-center text-left",
                        !isEditing && canToggle
                            ? "cursor-pointer"
                            : "cursor-default",
                    )}
                    aria-label={
                        isOpened ? "Свернуть папку" : "Развернуть папку"
                    }
                    disabled={isEditing}
                >
                    <p>{folder.numberLabel}</p>
                    <AdminHighlightedText
                        text={folder.name}
                        highlight={searchValue}
                    />
                    <p>{folder.cpCount} КП</p>
                </button>

                <div
                    className={cn(
                        "flex items-center gap-3",
                        isEditing ? "justify-end" : "justify-between",
                    )}
                >
                    {!isEditing && (
                        <button
                            type="button"
                            className="text-[20px] underline underline-offset-2 hover:text-black transition-colors cursor-pointer"
                            onClick={() =>
                                router.push(`/admin/kp/create/${folder.id}`)
                            }
                        >
                            СОЗДАТЬ КП
                        </button>
                    )}

                    {isEditing ? (
                        <button
                            type="button"
                            onClick={() => onDelete(folder)}
                            className="text-[#D00707] transition-opacity hover:opacity-80 cursor-pointer"
                            aria-label={`Удалить клиента ${folder.name}`}
                        >
                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.5207 4.25H2.479"
                                    stroke="#D00707"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M13.3402 6.02075L13.0144 10.9076C12.8891 12.7882 12.8264 13.7285 12.2137 14.3017C11.6009 14.8749 10.6586 14.8749 8.77384 14.8749H8.22605C6.34131 14.8749 5.39894 14.8749 4.78623 14.3017C4.17352 13.7285 4.11083 12.7882 3.98546 10.9076L3.65967 6.02075"
                                    stroke="#D00707"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M6.72925 7.79175L7.08342 11.3334"
                                    stroke="#D00707"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M10.2709 7.79175L9.91675 11.3334"
                                    stroke="#D00707"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M4.60425 4.25C4.64383 4.25 4.66362 4.25 4.68156 4.24955C5.26483 4.23476 5.77939 3.86389 5.97786 3.31523C5.98396 3.29835 5.99022 3.27957 6.00274 3.24202L6.07151 3.03571C6.13022 2.8596 6.15957 2.77153 6.1985 2.69677C6.35384 2.39847 6.64123 2.19133 6.97335 2.13829C7.05659 2.125 7.14941 2.125 7.33506 2.125H9.6651C9.85075 2.125 9.94357 2.125 10.0268 2.13829C10.3589 2.19133 10.6463 2.39847 10.8017 2.69677C10.8406 2.77154 10.8699 2.85959 10.9287 3.03571L10.9974 3.24202C11.0099 3.27952 11.0162 3.29836 11.0223 3.31523C11.2208 3.86389 11.7353 4.23476 12.3186 4.24955C12.3365 4.25 12.3563 4.25 12.3959 4.25"
                                    stroke="#D00707"
                                />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => onToggle(folder.id)}
                            className={cn(
                                "text-[#4C4C4C] transition-colors",
                                !canToggle
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
                    )}
                </div>
            </div>

            {!isEditing && isOpened && folder.offers.length > 0 && (
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
