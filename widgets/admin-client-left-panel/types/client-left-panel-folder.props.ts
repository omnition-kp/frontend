export interface ClientLeftPanelFolder {
    id: string | number;
    name: string;
    kps?: {
        id: string;
        name: string;
    }[];
}

export interface ClientLeftPanelFolderProps extends ClientLeftPanelFolder {
    activeKpId?: string | number;
}
