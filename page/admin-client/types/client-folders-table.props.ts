import { ClientFolder } from "./client-folder";

export interface ClientFoldersTableProps {
    folders: ClientFolder[];
    openedFolderId: string | null;
    onToggleFolder: (folderId: string) => void;
    isLoading: boolean;
    searchValue: string;
}
