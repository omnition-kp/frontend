import type { FileJson } from "@/shared/types/server";

export type DocItem = {
    id: number;
    file: File | null;
    serverFile?: FileJson;
    name: string;
};
