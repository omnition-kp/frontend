export interface CalculationTableRow {
    id: string;
    name: string;
    unit: string;
    quantity: string;
    priceMaterials: string;
    costOfWork: string;
    totalCostMaterials: string;
    totalCostWork: string;
    totalCost: string;
}

export interface CalculationTableSection {
    name: string;
    total: string;
    rows: CalculationTableRow[];
}

export interface CalculationTableData {
    sections: CalculationTableSection[];
    totalForFirstSection: {
        totalCostWork: string;
        totalCost: string;
    };
    trNr: string;
    nds: string;
}
