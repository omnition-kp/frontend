"use client";

import { AdminHeadline } from "@/shared/admin";
import { AdminClientLeftPanelProps } from "../types/admin-client-left-panel.props";
import { useClientControllerGetAll } from "@/shared/queries";
import type { ClientLeftPanelFolder as ClientLeftPanelFolderType } from "../types/client-left-panel-folder.props";
import { ClientDto } from "@/shared/types/server";
import { ClientLeftPanelFolderSkeleton } from "./client-left-panel-folder-skeleton";
import { ClientLeftPanelFolder } from "./client-left-panel-folder";

export const ClientLeftPanel = ({ kpId }: AdminClientLeftPanelProps) => {
    const { data: clients, isLoading: clientsLoading } =
        useClientControllerGetAll({
            query: {
                select: (response): ClientLeftPanelFolderType[] => {
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

                    if (!clients) return [];

                    return clients.map((client) => {
                        return {
                            id: client.id.toString(),
                            name: client.name,
                            kps:
                                client.kps?.map((kp) => {
                                    return {
                                        id: kp.id.toString(),
                                        name: kp.name,
                                    };
                                }) ?? [],
                        };
                    });
                },
            },
        });

    return (
        <aside className="w-[250px] shrink-0 sticky top-5 h-[700px] bg-[#F9F9F9] border border-black/2 rounded-[4px] flex flex-col overflow-hidden">
            <div className="px-2.5 py-4 mb-2 shrink-0">
                <AdminHeadline title="Клиенты" />
            </div>

            <div className="flex-1 overflow-y-auto px-2.5 pb-4 grid grid-cols-1 gap-3 content-start">
                {clientsLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                          <ClientLeftPanelFolderSkeleton key={index} />
                      ))
                    : clients?.map((client) => (
                          <ClientLeftPanelFolder
                              key={client.id}
                              {...client}
                              activeKpId={kpId}
                          />
                      ))}
            </div>
        </aside>
    );
};
