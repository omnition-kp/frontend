export interface ClientOffer {
    id: string;
    title: string;
    numberKp: number | string;
}

export interface ClientFolder {
    id: string;
    numberLabel: string;
    name: string;
    cpCount: number;
    offers: ClientOffer[];
}
