"use client";

import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
    AdminError,
    AdminHighlightedText,
    AdminInput,
    AdminLoading,
    AdminTable,
    AdminTableRow,
} from "@/shared/admin";
import {
    getManagerControllerGetAllQueryKey,
    useManagerControllerDelete,
    useManagerControllerGetAll,
} from "@/shared/queries";
import type { ManagerDto } from "@/shared/types/server";
import { deleteImage } from "@/shared/utils";
import { AdminTablePageHeadTemplate } from "@/widgets/admin-table-page-head-template";
import { PencilIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    ADMIN_MANAGER_COLUMNS,
    ADMIN_MANAGER_GRID_CLASS,
} from "../config/admin-manager.config";

export const AdminManager = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [searchValue, setSearchValue] = useState("");
    const [serverError, setServerError] = useState<string | null>(null);
    const [managerToDelete, setManagerToDelete] = useState<ManagerDto | null>(
        null,
    );

    // ─── Получение списка ───────────────────────────────────────────
    const { data: managers = [], isLoading: managersLoading } =
        useManagerControllerGetAll({
            query: {
                select: (response): ManagerDto[] => {
                    const maybeArray = response as unknown;
                    if (Array.isArray(maybeArray)) {
                        return maybeArray as ManagerDto[];
                    }

                    const maybeObject = response as { data?: ManagerDto[] };
                    return Array.isArray(maybeObject?.data)
                        ? maybeObject.data
                        : [];
                },
            },
        });

    // ─── Удаление ───────────────────────────────────────────────────
    const {
        mutateAsync: deleteManager,
        isPending: isDeletePending,
        variables: deleteVariables,
    } = useManagerControllerDelete();

    // ─── Утилита для парсинга ошибок ────────────────────────────────
    const parseError = (error: unknown): string => {
        let errorMessage = "Произошла неизвестная ошибка";

        if (error instanceof AxiosError) {
            const backendMessage = error.response?.data?.message;

            if (Array.isArray(backendMessage) && backendMessage.length > 0) {
                errorMessage = String(backendMessage[0]);
            } else if (typeof backendMessage === "string") {
                errorMessage = backendMessage;
            } else {
                errorMessage = "Ошибка сервера. Попробуйте позже.";
            }
        } else if (error instanceof Error && error.message) {
            errorMessage = error.message;
        }

        return errorMessage;
    };

    // ─── Подтверждение удаления ─────────────────────────────────────
    const handleDeleteConfirm = async () => {
        if (!managerToDelete) return;

        setServerError(null);

        try {
            await deleteManager({ id: managerToDelete.id });

            if (managerToDelete.photo) {
                const deleteResult = await deleteImage(managerToDelete.photo);
                if (!deleteResult.success) {
                    throw new Error(
                        deleteResult.error ??
                            "Менеджер удалён, но фото не удалось удалить",
                    );
                }
            }

            await queryClient.invalidateQueries({
                queryKey: getManagerControllerGetAllQueryKey(),
            });

            setManagerToDelete(null);
        } catch (error) {
            setServerError(parseError(error));
        }
    };

    // ─── Фильтрация по поиску ──────────────────────────────────────
    const filteredManagers = useMemo(() => {
        const normalizedSearch = searchValue.trim().toLowerCase();

        if (!normalizedSearch) return managers;

        return managers.filter(
            (manager) =>
                manager.name.toLowerCase().includes(normalizedSearch) ||
                manager.email.toLowerCase().includes(normalizedSearch) ||
                manager.phone.toLowerCase().includes(normalizedSearch),
        );
    }, [managers, searchValue]);

    // ─── Лоадер ─────────────────────────────────────────────────────
    if (managersLoading) {
        return <AdminLoading title="Загрузка менеджеров..." />;
    }

    // ─── Рендер ─────────────────────────────────────────────────────
    return (
        <div className="w-full">
            <AdminTablePageHeadTemplate title="Менеджеры" link="managers" />

            <div className="mb-9">
                <AdminInput
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Поиск"
                    icon={<SearchIcon width={18} height={18} />}
                    variant="alternative"
                />
            </div>

            {serverError && <AdminError error={serverError} />}

            <AdminTable
                columns={ADMIN_MANAGER_COLUMNS}
                gridClassName={ADMIN_MANAGER_GRID_CLASS}
                itemsCount={filteredManagers.length}
                minWidth="860px"
                searchTerm={searchValue}
                emptyMessage="Список менеджеров пуст"
                emptySearchMessage="Ничего не найдено"
            >
                {filteredManagers.map((manager) => (
                    <AdminTableRow
                        key={manager.id}
                        gridClassName={ADMIN_MANAGER_GRID_CLASS}
                    >
                        <p>{`№${manager.id}`}</p>

                        <AdminHighlightedText
                            text={manager.name}
                            highlight={searchValue}
                            className="truncate"
                        />

                        <AdminHighlightedText
                            text={manager.email}
                            highlight={searchValue}
                            className="truncate"
                        />

                        <AdminHighlightedText
                            text={manager.phone}
                            highlight={searchValue}
                            className="truncate"
                        />

                        <div className="flex items-center justify-end gap-2">
                            <button
                                type="button"
                                className="w-7 h-7 rounded-[4px] border border-[#E4E4E4] text-[#8C8C8C] transition-colors flex items-center justify-center hover:text-black hover:border-[#D8D8D8] cursor-pointer"
                                aria-label="Редактировать менеджера"
                                onClick={() =>
                                    router.push(`/admin/managers/${manager.id}`)
                                }
                            >
                                <PencilIcon width={14} height={14} />
                            </button>

                            <button
                                type="button"
                                className="w-7 h-7 rounded-[4px] border border-[#E4E4E4] text-[#8C8C8C] transition-colors flex items-center justify-center hover:text-black hover:border-[#D8D8D8] cursor-pointer"
                                aria-label="Удалить менеджера"
                                disabled={
                                    isDeletePending &&
                                    deleteVariables?.id === manager.id
                                }
                                onClick={() => setManagerToDelete(manager)}
                            >
                                <Trash2Icon width={14} height={14} />
                            </button>
                        </div>
                    </AdminTableRow>
                ))}
            </AdminTable>

            {/* ─── Модалка подтверждения удаления ─────────────────────── */}
            {managerToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
                    <div className="w-full max-w-[420px] rounded-[8px] bg-white p-6 text-center">
                        <p className="mb-6 text-[22px] leading-[112%] text-[#4C4C4C]">
                            Вы действительно хотите удалить менеджера
                            <br />
                            {`«${managerToDelete.name}»?`}
                        </p>

                        <div className="flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                disabled={isDeletePending}
                                className="rounded-[4px] border border-[#4C4C4C] bg-[#4C4C4C] px-8 py-2 text-[16px] leading-[100%] text-white transition-colors hover:bg-[#3E3E3E] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Удалить
                            </button>

                            <button
                                type="button"
                                onClick={() => setManagerToDelete(null)}
                                disabled={isDeletePending}
                                className="rounded-[4px] border border-[#E4E4E4] px-8 py-2 text-[16px] leading-[100%] text-[#4C4C4C] transition-colors hover:bg-[#F7F7F7] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
