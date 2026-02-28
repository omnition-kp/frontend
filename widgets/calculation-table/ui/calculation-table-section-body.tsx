import { cn } from "@/shared/utils";
import { CalculationTableRow } from "./calculation-table-row";
import type { CalculationTableRow as RowType } from "../types/calculation-table-data.types";

export type CalculationTableSectionBodyProps = {
    rows: RowType[];
    isOpen: boolean;
};

export function CalculationTableSectionBody({
    rows,
    isOpen,
}: CalculationTableSectionBodyProps) {
    return (
        <tr>
            <td
                colSpan={9}
                className="p-0 border-none bg-transparent align-top"
            >
                <div
                    className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                    aria-hidden={!isOpen}
                >
                    <div className="min-h-0 overflow-hidden">
                        <table className="w-full table-fixed border-collapse">
                            <tbody>
                                {rows.map((row) => (
                                    <CalculationTableRow
                                        key={row.id}
                                        row={row}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </td>
        </tr>
    );
}
