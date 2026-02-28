import type { CalculationTableData } from "../types/calculation-table-data.types";
import { cn } from "@/shared/utils";
import { COLUMN_WIDTHS } from "../config";
import { MainText } from "@/shared/ui";

export type CalculationTableSummaryProps = {
    data: Pick<CalculationTableData, "totalForFirstSection" | "trNr" | "nds">;
};

export function CalculationTableSummary({
    data,
}: CalculationTableSummaryProps) {
    const { totalForFirstSection, trNr, nds } = data;

    const summaryCell =
        "px-3 py-2 border-r border-[#919191] last:border-r-0 bg-[#D6D6D6] align-middle text-center";

    return (
        <div className="bg-[#D6D6D6]">
            <table className="w-full table-fixed border-collapse min-w-[1440px] lg:min-w-0">
                <tbody>
                    {/* 9 колонок: №, Наименование (подписи во 2-й), Ед., Кол-во, ..., Итого раб., Итого всего */}
                    <tr className="border-b border-[#919191]">
                        <td className={cn(summaryCell, COLUMN_WIDTHS[0])} />
                        <td
                            className={cn(
                                summaryCell,
                                COLUMN_WIDTHS[1],
                                "text-gray-800",
                            )}
                        >
                            <MainText variant="2" className="m-0 text-gray-800">
                                ИТОГО по разделу №1
                            </MainText>
                        </td>
                        <td className={cn(summaryCell, COLUMN_WIDTHS[2])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[3])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[4])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[5])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[6])} />
                        <td
                            className={cn(
                                summaryCell,
                                COLUMN_WIDTHS[7],
                                "text-gray-700",
                            )}
                        >
                            <MainText variant="2" className="m-0 text-gray-700">
                                {totalForFirstSection.totalCostWork}
                            </MainText>
                        </td>
                        <td
                            className={cn(
                                summaryCell,
                                COLUMN_WIDTHS[8],
                                "text-gray-800",
                            )}
                        >
                            <MainText variant="2" className="m-0 text-gray-800">
                                {totalForFirstSection.totalCost}
                            </MainText>
                        </td>
                    </tr>
                    <tr className="border-b border-[#919191]">
                        <td className={cn(summaryCell, COLUMN_WIDTHS[0])} />
                        <td
                            className={cn(
                                summaryCell,
                                COLUMN_WIDTHS[1],
                                "text-gray-800",
                            )}
                        >
                            <MainText variant="2" className="m-0 text-gray-800">
                                TP, HP 10%
                            </MainText>
                        </td>
                        <td className={cn(summaryCell, COLUMN_WIDTHS[2])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[3])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[4])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[5])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[6])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[7])} />
                        <td
                            className={cn(
                                summaryCell,
                                COLUMN_WIDTHS[8],
                                "text-gray-800",
                            )}
                        >
                            <MainText variant="2" className="m-0 text-gray-800">
                                {trNr}
                            </MainText>
                        </td>
                    </tr>
                    <tr>
                        <td className={cn(summaryCell, COLUMN_WIDTHS[0])} />
                        <td
                            className={cn(
                                summaryCell,
                                COLUMN_WIDTHS[1],
                                "text-gray-800",
                            )}
                        >
                            <MainText variant="2" className="m-0 text-gray-800">
                                НДС 22%
                            </MainText>
                        </td>
                        <td className={cn(summaryCell, COLUMN_WIDTHS[2])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[3])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[4])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[5])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[6])} />
                        <td className={cn(summaryCell, COLUMN_WIDTHS[7])} />
                        <td
                            className={cn(
                                summaryCell,
                                COLUMN_WIDTHS[8],
                                "text-gray-800",
                            )}
                        >
                            <MainText variant="2" className="m-0 text-gray-800">
                                {nds}
                            </MainText>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
