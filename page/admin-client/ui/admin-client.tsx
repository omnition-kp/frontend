"use client";

import { useMemo, useState } from "react";
import { AdminAddButton, AdminHeadline, AdminInput } from "@/shared/admin";
import { SearchIcon } from "lucide-react";
import { ClientFoldersTable } from "./client-folders-table";
import { useClientControllerGetAll } from "@/shared/queries";
import { ClientFolder } from "../types/client-folder";
import { AddClientModal } from "./add-client-modal";
import { ClientDto } from "@/shared/types/server";

export const AdminClient = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data: folders = [], isLoading: foldersLoading } =
        useClientControllerGetAll({
            query: {
                select: (response): ClientFolder[] => {
                    const rawData = response as unknown;
                    let clients: ClientDto[] = [];

                    if (Array.isArray(rawData)) {
                        clients = rawData as ClientDto[];
                    } else if (
                        typeof rawData === "object" &&
                        rawData !== null &&
                        "data" in rawData &&
                        Array.isArray((rawData as { data: unknown }).data)
                    ) {
                        clients = (rawData as { data: ClientDto[] }).data;
                    }

                    return clients.map((folder) => {
                        return {
                            id: folder.id.toString(),
                            numberLabel: `№${folder.id}`,
                            name: folder.name,
                            cpCount: folder.kps?.length ?? 0,
                            offers:
                                folder.kps?.map((kp) => {
                                    return {
                                        id: kp.id.toString(),
                                        title: kp.name,
                                        numberKp: kp.numberKp,
                                    };
                                }) ?? [],
                        };
                    });
                },
            },
        });

    const [searchValue, setSearchValue] = useState("");
    const [openedFolderId, setOpenedFolderId] = useState<string | null>(null);

    const filteredFolders = useMemo(() => {
        const normalizedSearch = searchValue.trim().toLowerCase();

        if (!normalizedSearch) {
            return folders;
        }

        return folders.filter((folder) => {
            const byName = folder.name.toLowerCase().includes(normalizedSearch);
            const byOffers = folder.offers.some((offer) =>
                offer.title.toLowerCase().includes(normalizedSearch),
            );

            return byName || byOffers;
        });
    }, [folders, searchValue]);

    const handleToggleFolder = (folderId: string) => {
        setOpenedFolderId((prev) => (prev === folderId ? null : folderId));
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <AdminHeadline title="Клиенты" className="text-[#4C4C4C]" />

                <AdminAddButton
                    typeOfButton="button"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Добавить клиента
                </AdminAddButton>
            </div>

            <AdminInput
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                variant="alternative"
                placeholder="Поиск"
                icon={<SearchIcon width={18} height={18} />}
            />

            <ClientFoldersTable
                folders={filteredFolders}
                openedFolderId={openedFolderId}
                onToggleFolder={handleToggleFolder}
                isLoading={foldersLoading}
                searchValue={searchValue}
            />

            <AddClientModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
};
