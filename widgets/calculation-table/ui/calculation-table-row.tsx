import type { CalculationTableRow as RowType } from "../types/calculation-table-data.types";
import { cn } from "@/shared/utils";
import { COLUMN_WIDTHS } from "../config";
import { MainText } from "@/shared/ui";

export type CalculationTableRowProps = {
    row: RowType;
};

const CELL_BASE =
    "px-3 py-2 border-r border-[#919191] last:border-r-0 align-middle";

// id — центр, наименование — слева, единицы — центр, остальные — справа
const CELL_ALIGN = [
    "text-center", // id
    "text-left", // наименование
    "text-center", // единицы
    "text-right", // quantity и далее
    "text-right",
    "text-right",
    "text-right",
    "text-right",
    "text-right",
];

export function CalculationTableRow({ row }: CalculationTableRowProps) {
    const cells = [
        row.id,
        row.name,
        row.unit,
        row.quantity,
        row.priceMaterials,
        row.costOfWork,
        row.totalCostMaterials,
        row.totalCostWork,
        row.totalCost,
    ];
    return (
        <tr className="bg-white border-b border-[#919191]">
            {cells.map((content, i) => (
                <td
                    key={i}
                    className={cn(CELL_BASE, COLUMN_WIDTHS[i], CELL_ALIGN[i])}
                >
                    <MainText variant="2" className="m-0 text-gray-700">
                        {content}
                    </MainText>
                </td>
            ))}
        </tr>
    );
}
