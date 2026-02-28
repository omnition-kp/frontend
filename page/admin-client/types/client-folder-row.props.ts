import { ClientFolder } from "./client-folder";

export interface ClientFolderRowProps {
    folder: ClientFolder;
    isOpened: boolean;
    onToggle: (folderId: string) => void;
    searchValue: string;
}
