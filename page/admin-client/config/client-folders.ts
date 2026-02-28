import type { ClientFolder } from "../types/client-folder";

export const CLIENT_FOLDERS: ClientFolder[] = [
    { id: "1", numberLabel: "№1", name: "Клиент 1", cpCount: 0, offers: [] },
    {
        id: "2",
        numberLabel: "№1",
        name: "Клиент 1",
        cpCount: 2,
        offers: [
            {
                id: "2-1",
                title: "УСТРОЙСТВО МОНОЛИТНЫХ ДЕКОРАТИВНЫХ ПОЛОВ",
                numberKp: "2-1",
            },
            { id: "2-2", title: "ЛЕСТНИЦЫ", numberKp: "2-2" },
        ],
    },
    { id: "3", numberLabel: "№1", name: "Клиент 1", cpCount: 2, offers: [] },
    { id: "4", numberLabel: "№1", name: "Клиент 1", cpCount: 2, offers: [] },
    { id: "5", numberLabel: "№1", name: "Клиент 1", cpCount: 2, offers: [] },
];
