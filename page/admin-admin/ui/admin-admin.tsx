"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import {
    AdminAddButton,
    AdminHeadline,
    AdminInput,
    AdminLoading,
    AdminSelect,
    AdminTable,
} from "@/shared/admin";
import {
    adminControllerUpdateRole,
    getAdminControllerGetAllQueryKey,
    useAdminControllerDelete,
    useAdminControllerGetAll,
} from "@/shared/queries";
import type { AdminWithoutPasswordDtoRole } from "@/shared/types/server";
import {
    ADMIN_ROLE_LABELS,
    ADMIN_ROLE_OPTIONS,
} from "../config/admin-role-options";
import {
    ADMIN_TABLE_COLUMNS,
    ADMIN_TABLE_GRID_CLASS_NAME,
} from "../config/admin-table.constants";
import { mapAdminToRowItem } from "../lib/map-admin-to-row-item";
import { AdminAdminRow } from "./admin-admin-row";
import type { AdminRowItem } from "../types/admin-row-item";

export const AdminAdmin = () => {
    const queryClient = useQueryClient();
    const [searchValue, setSearchValue] = useState("");
    const [selectedRole, setSelectedRole] =
        useState<AdminWithoutPasswordDtoRole | null>(null);
    const [adminToDelete, setAdminToDelete] = useState<AdminRowItem | null>(
        null,
    );
    const [roleOverrides, setRoleOverrides] = useState<
        Record<number, AdminWithoutPasswordDtoRole>
    >({});

    const { data: admins = [], isLoading } = useAdminControllerGetAll({
        query: {
            select: (response): AdminRowItem[] => {
                const maybeArrayResponse = response as unknown;
                const normalizedAdmins = Array.isArray(maybeArrayResponse)
                    ? maybeArrayResponse
                    : [];

                return normalizedAdmins.map(mapAdminToRowItem);
            },
        },
    });

    const {
        mutateAsync: deleteAdmin,
        isPending: isDeletePending,
        variables: deleteVariables,
    } = useAdminControllerDelete();

    const {
        mutateAsync: updateRole,
        isPending: isRolePending,
        variables: roleVariables,
    } = useMutation({
        mutationFn: ({
            id,
            role,
        }: {
            id: number;
            role: AdminWithoutPasswordDtoRole;
        }) =>
            adminControllerUpdateRole(id, {
                body: JSON.stringify({ role }),
                headers: { "Content-Type": "application/json" },
            }),
    });

    const handleRoleChange = async (id: number, role: string | number) => {
        const nextRole = String(role) as AdminWithoutPasswordDtoRole;

        setRoleOverrides((prev) => ({ ...prev, [id]: nextRole }));

        try {
            await updateRole({ id, role: nextRole });
            await queryClient.invalidateQueries({
                queryKey: getAdminControllerGetAllQueryKey(),
            });
        } finally {
            setRoleOverrides((prev) => {
                const { [id]: _omit, ...rest } = prev;
                void _omit;
                return rest;
            });
        }
    };

    const handleDelete = async (id: number) => {
        await deleteAdmin({ id });
        await queryClient.invalidateQueries({
            queryKey: getAdminControllerGetAllQueryKey(),
        });
    };

    const handleDeleteConfirm = async () => {
        if (!adminToDelete) {
            return;
        }

        await handleDelete(adminToDelete.id);
        setAdminToDelete(null);
    };

    const preparedAdmins = useMemo(() => {
        return admins.map((admin) => ({
            ...admin,
            role: roleOverrides[admin.id] ?? admin.role,
        }));
    }, [admins, roleOverrides]);

    const filteredAdmins = useMemo(() => {
        const normalizedSearch = searchValue.trim().toLowerCase();

        return preparedAdmins.filter((admin) => {
            const byRole = selectedRole ? admin.role === selectedRole : true;

            if (!normalizedSearch) {
                return byRole;
            }

            const roleLabel = ADMIN_ROLE_LABELS[admin.role].toLowerCase();
            const bySearch =
                admin.name.toLowerCase().includes(normalizedSearch) ||
                admin.numberLabel.toLowerCase().includes(normalizedSearch) ||
                roleLabel.includes(normalizedSearch);

            return byRole && bySearch;
        });
    }, [preparedAdmins, searchValue, selectedRole]);

    if (isLoading) {
        return <AdminLoading title="Загрузка администраторов..." />;
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <AdminHeadline title="Доступы" className="text-[#4C4C4C]" />
                <AdminAddButton link="admin">Добавить админа</AdminAddButton>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mb-6">
                <div className="col-span-3">
                    <AdminInput
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        variant="alternative"
                        placeholder="Поиск"
                        icon={<SearchIcon width={18} height={18} />}
                    />
                </div>

                <AdminSelect
                    value={selectedRole}
                    onChange={(nextRole) =>
                        setSelectedRole(
                            nextRole as AdminWithoutPasswordDtoRole | null,
                        )
                    }
                    options={ADMIN_ROLE_OPTIONS}
                    placeholder="Выбрать роль"
                />
            </div>

            <AdminTable
                columns={ADMIN_TABLE_COLUMNS}
                gridClassName={ADMIN_TABLE_GRID_CLASS_NAME}
                itemsCount={filteredAdmins.length}
                minWidth="940px"
                emptyMessage="Список администраторов пуст"
                searchTerm={searchValue}
                emptySearchMessage="Ничего не найдено"
            >
                {filteredAdmins.map((admin) => (
                    <AdminAdminRow
                        key={admin.id}
                        item={admin}
                        searchValue={searchValue}
                        onRoleChange={handleRoleChange}
                        onDelete={setAdminToDelete}
                        roleDisabled={
                            isRolePending && roleVariables?.id === admin.id
                        }
                        deleteDisabled={
                            isDeletePending && deleteVariables?.id === admin.id
                        }
                    />
                ))}
            </AdminTable>

            {adminToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
                    <div className="w-full max-w-[420px] rounded-[8px] bg-white p-6 text-center">
                        <p className="mb-6 text-[22px] leading-[112%] text-[#4C4C4C]">
                            Вы действительно хотите удалить участника
                            <br />
                            {`«${adminToDelete.name}»?`}
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
                                onClick={() => setAdminToDelete(null)}
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
