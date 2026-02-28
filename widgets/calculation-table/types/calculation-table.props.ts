import type { CalculationTableData } from "./calculation-table-data.types";

export type CalculationTableProps = {
    id: string | number;
    name: string;
    date: string;
    data?: CalculationTableData;
};
