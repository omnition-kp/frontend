import type { CalculationTableSection as SectionType } from "../types/calculation-table-data.types";
import { CalculationTableSectionHeader } from "./calculation-table-section-header";
import { CalculationTableSectionBody } from "./calculation-table-section-body";

export type CalculationTableSectionProps = {
    section: SectionType;
    isOpen: boolean;
    onToggle: () => void;
};

export function CalculationTableSection({
    section,
    isOpen,
    onToggle,
}: CalculationTableSectionProps) {
    return (
        <>
            <CalculationTableSectionHeader
                name={section.name}
                total={section.total}
                isOpen={isOpen}
                onToggle={onToggle}
            />
            <CalculationTableSectionBody rows={section.rows} isOpen={isOpen} />
        </>
    );
}
