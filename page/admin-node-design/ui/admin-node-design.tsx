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
    getNodeDesignControllerGetAllQueryKey,
    useNodeDesignControllerDelete,
    useNodeDesignControllerGetAll,
} from "@/shared/queries";
import type { NodeDesignDto } from "@/shared/types/server";
import { deleteImage } from "@/shared/utils";
import { AdminTablePageHeadTemplate } from "@/widgets/admin-table-page-head-template";
import { PencilIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    ADMIN_NODE_DESIGN_COLUMNS,
    ADMIN_NODE_DESIGN_GRID_CLASS,
} from "../config/admin-node-design.config";

export const AdminNodeDesign = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [searchValue, setSearchValue] = useState("");
    const [serverError, setServerError] = useState<string | null>(null);
    const [nodeToDelete, setNodeToDelete] = useState<NodeDesignDto | null>(
        null,
    );

    const { data: nodes = [], isLoading: nodesLoading } =
        useNodeDesignControllerGetAll({
            query: {
                select: (response): NodeDesignDto[] => {
                    const maybeArrayResponse = response as unknown;
                    if (Array.isArray(maybeArrayResponse)) {
                        return maybeArrayResponse as NodeDesignDto[];
                    }

                    const maybeObjectResponse = response as {
                        data?: NodeDesignDto[];
                    };
                    return Array.isArray(maybeObjectResponse?.data)
                        ? maybeObjectResponse.data
                        : [];
                },
            },
        });

    const {
        mutateAsync: deleteNodeDesign,
        isPending: isDeletePending,
        variables: deleteVariables,
    } = useNodeDesignControllerDelete();

    const parseError = (error: unknown) => {
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

    const handleDeleteConfirm = async () => {
        if (!nodeToDelete) {
            return;
        }

        setServerError(null);

        try {
            await deleteNodeDesign({ id: nodeToDelete.id });

            if (nodeToDelete.photo) {
                const deleteResult = await deleteImage(nodeToDelete.photo);
                if (!deleteResult.success) {
                    throw new Error(
                        deleteResult.error ??
                            "Узел удален, но изображение не удалось удалить",
                    );
                }
            }

            await queryClient.invalidateQueries({
                queryKey: getNodeDesignControllerGetAllQueryKey(),
            });

            setNodeToDelete(null);
        } catch (error) {
            setServerError(parseError(error));
        }
    };

    const filteredNodes = useMemo(() => {
        const normalizedSearch = searchValue.trim().toLowerCase();

        if (!normalizedSearch) {
            return nodes;
        }

        return nodes.filter((node) =>
            node.name.toLowerCase().includes(normalizedSearch),
        );
    }, [nodes, searchValue]);

    if (nodesLoading) {
        return <AdminLoading title="Загрузка узлов дизайна..." />;
    }

    return (
        <div className="w-full">
            <AdminTablePageHeadTemplate
                title="Узлы дизайна"
                link="node-design"
            />

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
                columns={ADMIN_NODE_DESIGN_COLUMNS}
                gridClassName={ADMIN_NODE_DESIGN_GRID_CLASS}
                itemsCount={filteredNodes.length}
                minWidth="860px"
                searchTerm={searchValue}
                emptyMessage="Список узлов дизайна пуст"
                emptySearchMessage="Ничего не найдено"
            >
                {filteredNodes.map((node) => (
                    <AdminTableRow
                        key={node.id}
                        gridClassName={ADMIN_NODE_DESIGN_GRID_CLASS}
                    >
                        <p>{`№${node.id}`}</p>
                        <AdminHighlightedText
                            text={node.name}
                            highlight={searchValue}
                            className="truncate"
                        />
                        <div className="w-[48px] h-[48px] rounded-[4px] overflow-hidden bg-[#E9E9E9]">
                            {/* eslint-disable-next-line @next/next/no-img-element -- dynamic photo URL from API */}
                            <img
                                src={node.photo}
                                alt={node.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                type="button"
                                className="w-7 h-7 rounded-[4px] border border-[#E4E4E4] text-[#8C8C8C] transition-colors flex items-center justify-center hover:text-black hover:border-[#D8D8D8] cursor-pointer"
                                aria-label="Редактировать узел дизайна"
                                onClick={() =>
                                    router.push(`/admin/node-design/${node.id}`)
                                }
                            >
                                <PencilIcon width={14} height={14} />
                            </button>
                            <button
                                type="button"
                                className="w-7 h-7 rounded-[4px] border border-[#E4E4E4] text-[#8C8C8C] transition-colors flex items-center justify-center hover:text-black hover:border-[#D8D8D8] cursor-pointer"
                                aria-label="Удалить узел дизайна"
                                disabled={
                                    isDeletePending &&
                                    deleteVariables?.id === node.id
                                }
                                onClick={() => setNodeToDelete(node)}
                            >
                                <Trash2Icon width={14} height={14} />
                            </button>
                        </div>
                    </AdminTableRow>
                ))}
            </AdminTable>

            {nodeToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
                    <div className="w-full max-w-[420px] rounded-[8px] bg-white p-6 text-center">
                        <p className="mb-6 text-[22px] leading-[112%] text-[#4C4C4C]">
                            Вы действительно хотите удалить узел дизайна
                            <br />
                            {`«${nodeToDelete.name}»?`}
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
                                onClick={() => setNodeToDelete(null)}
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
