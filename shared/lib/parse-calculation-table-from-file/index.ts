import * as XLSX from "xlsx";
import { isSummaryRow, isChapterRow, isTotalForChapter } from "./utils";
import {
    CalculationTableData,
    CalculationTableRow,
    CalculationTableSection,
} from "@/widgets/calculation-table";

/**
 * Функция для парсинга таблицы из файла
 * @param buffer - буфер файла
 * @returns объект с данными таблицы
 */
export const parseCalculationTableFromFile = (buffer: ArrayBuffer) => {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rowsData: string[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: false,
        defval: "",
        blankrows: false,
        range: 2,
    });

    const table: CalculationTableData = {
        sections: [],
        totalForFirstSection: {
            totalCostWork: "",
            totalCost: "",
        },
        trNr: "",
        nds: "",
    };
    const sections: CalculationTableSection[] = [];

    let currentId: number = 0;
    let currentSubId: number = 1;
    let currentChapter: string = "";
    let currentRows: CalculationTableRow[] = [];
    let currentTotal: string = "0";

    for (const row of rowsData) {
        const summaryText = [row[0] ?? "", row[1] ?? ""]
            .join(" ")
            .trim()
            .toLowerCase();

        // Проверка является ли строка для суммы
        if (isSummaryRow(row)) {
            if (currentId === 1) {
                if (
                    summaryText.includes("итого по") &&
                    summaryText.includes("раздел")
                ) {
                    table.totalForFirstSection = {
                        totalCostWork: (row[7] ?? "").trim(),
                        totalCost: (row[8] ?? "").trim(),
                    };
                } else if (summaryText.includes("нр и тр")) {
                    table.trNr = (row[8] ?? "").trim();
                }
            }
            continue;
        }

        // Проверка является ли строка для суммы всего проекта (Всего по разделу ... С НДС 22%)
        if (isTotalForChapter(row)) {
            if (currentId === 1) {
                table.nds = (row[8] ?? "").trim();
            }
            currentTotal = row[8];
            continue;
        }

        // Проверка является ли строка для раздела
        if (isChapterRow(row)) {
            if (currentRows.length > 0) {
                sections.push({
                    name: currentChapter,
                    total: currentTotal,
                    rows: currentRows,
                });
                currentRows = [];
            }
            currentId++;
            currentSubId = 1;
            currentChapter = row[0];
            continue;
        }

        // Проверка если сумма не равна 0, то нужно начать новый раздел
        if (currentTotal !== "0") {
            currentTotal = "0";
            currentRows = [];
            continue;
        }

        // Добавление строки в текущий раздел
        currentRows.push({
            id: `${currentId}.${currentSubId}`,
            name: row[1],
            unit: row[2],
            quantity: row[3],
            priceMaterials: row[4] ?? "",
            costOfWork: row[5] ?? "",
            totalCostMaterials: row[6] ?? "",
            totalCostWork: row[7] ?? "",
            totalCost: row[8] ?? "",
        });
        currentSubId++;
    }

    // Сохраняем последний раздел (после цикла следующей строки раздела уже не будет)
    if (currentRows.length > 0) {
        sections.push({
            name: currentChapter,
            total: currentTotal,
            rows: currentRows,
        });
    }

    table.sections = sections;
    return table;
};
