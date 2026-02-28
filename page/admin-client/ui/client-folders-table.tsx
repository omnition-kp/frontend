import { onest } from "@/shared/config";
import { cn } from "@/shared/utils";
import { ClientFolderRow } from "./client-folder-row";
import { TABLE_HEADERS } from "../config/table-headers";
import { ClientFoldersTableProps } from "../types/client-folders-table.props";

export const ClientFoldersTable = ({
    folders,
    openedFolderId,
    onToggleFolder,
    isLoading,
    searchValue,
}: ClientFoldersTableProps) => {
    const trimmedSearch = searchValue.trim();

    return (
        <div className="mt-6">
            <div
                className={cn(
                    onest.className,
                    "grid grid-cols-[72px_1fr_180px_240px] px-5 pb-2",
                    "text-[14px] leading-[112%] text-gray",
                )}
            >
                {TABLE_HEADERS.map((header) => (
                    <p key={header}>{header}</p>
                ))}
            </div>

            <div className="space-y-2">
                {isLoading
                    ? [...Array(5)].map((_, index) => (
                          <div
                              key={index}
                              className="grid grid-cols-[72px_1fr_180px_240px] items-center px-5 py-4 bg-[#F2F2F2] animate-pulse"
                          >
                              <div className="h-4 w-12 rounded bg-black/10" />
                              <div className="h-4 w-44 rounded bg-black/10" />
                              <div className="h-4 w-16 rounded bg-black/10" />
                              <div className="ml-auto h-4 w-24 rounded bg-black/10" />
                          </div>
                      ))
                    : folders.map((folder) => (
                          <ClientFolderRow
                              key={folder.id}
                              folder={folder}
                              isOpened={openedFolderId === folder.id}
                              onToggle={onToggleFolder}
                              searchValue={searchValue}
                          />
                      ))}
            </div>

            {!isLoading && folders.length === 0 && (
                <p
                    className={cn(
                        onest.className,
                        "py-10 text-center text-[14px] text-gray",
                    )}
                >
                    {trimmedSearch ? "Ничего не найдено" : "Список пуст"}
                </p>
            )}
        </div>
    );
};
