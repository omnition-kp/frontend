"use client";

import { useMemo, useState } from "react";
import {
    AdminAddButton,
    AdminButton,
    AdminConfirmModal,
    AdminHeadline,
    AdminInput,
    AdminMainText,
} from "@/shared/admin";
import { SearchIcon } from "lucide-react";
import { ClientFoldersTable } from "./client-folders-table";
import {
    getClientControllerGetAllQueryKey,
    useClientControllerDelete,
    useClientControllerGetAll,
} from "@/shared/queries";
import { ClientFolder } from "../types/client-folder";
import { AddClientModal } from "./add-client-modal";
import { ClientDto } from "@/shared/types/server";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const AdminClient = () => {
    const queryClient = useQueryClient();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState<ClientFolder | null>(
        null,
    );

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

    const { mutateAsync: deleteClient, isPending: isDeletePending } =
        useClientControllerDelete();

    const clientNameForModal = useMemo(() => {
        if (!folderToDelete) {
            return "";
        }

        const trimmedName = folderToDelete.name.trim();
        const maxLength = 30;

        if (trimmedName.length <= maxLength) {
            return trimmedName;
        }

        return `${trimmedName.slice(0, maxLength)}...`;
    }, [folderToDelete]);

    const handleDeleteFolderConfirm = async () => {
        if (!folderToDelete) {
            return;
        }

        try {
            await deleteClient({ id: Number(folderToDelete.id) });
            await queryClient.invalidateQueries({
                queryKey: getClientControllerGetAllQueryKey(),
            });
            setFolderToDelete(null);
            setOpenedFolderId((prev) =>
                prev === folderToDelete.id ? null : prev,
            );
        } catch (error) {
            let errorMessage = "Ошибка при удалении клиента";

            if (error instanceof AxiosError && error.response?.data?.message) {
                const msg = error.response.data.message;
                errorMessage = Array.isArray(msg) ? msg[0] : msg;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <AdminHeadline title="Клиенты" className="text-[#4C4C4C]" />

                <div className="flex items-center gap-8">
                    {!isEditing && (
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => {
                                setIsEditing(true);
                                setOpenedFolderId(null);
                            }}
                        >
                            <AdminMainText variant="2">
                                Редактирование
                            </AdminMainText>
                        </button>
                    )}
                    {isEditing ? (
                        <AdminButton
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="py-2.5"
                        >
                            Сохранить изменения
                        </AdminButton>
                    ) : (
                        <AdminAddButton
                            typeOfButton="button"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            Добавить клиента
                        </AdminAddButton>
                    )}
                </div>
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
                isEditing={isEditing}
                onDeleteFolder={setFolderToDelete}
            />

            <AddClientModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            <AdminConfirmModal
                isOpen={Boolean(folderToDelete)}
                title="Удалить клиента?"
                description={
                    <>
                        Клиент{" "}
                        <span className="font-semibold">
                            «{clientNameForModal}»
                        </span>{" "}
                        будет удален без возможности восстановления
                    </>
                }
                onCancel={() => setFolderToDelete(null)}
                onConfirm={handleDeleteFolderConfirm}
                isPending={isDeletePending}
            />
        </div>
    );
};
