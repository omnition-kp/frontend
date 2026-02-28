"use client";

import { useState, useCallback } from "react";
import { cn } from "@/shared/utils";
import { PADDING_X_CLASS } from "@/shared/config";
import { CalculationTableProps } from "../types/calculation-table.props";
import { Button, Headline } from "@/shared/ui";
import { CalculationTableHeader } from "./calculation-table-header";
import { CalculationTableSection } from "./calculation-table-section";
import { CalculationTableSummary } from "./calculation-table-summary";

const FIRST_SECTION_OPEN = new Set([0]);

export function CalculationTable({
    id,
    name,
    date,
    data,
}: CalculationTableProps) {
    const [openSections, setOpenSections] =
        useState<Set<number>>(FIRST_SECTION_OPEN);

    const toggleSection = useCallback((index: number) => {
        setOpenSections((prev) => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    }, []);

    return (
        <section className={cn(PADDING_X_CLASS)}>
            <div className="flex items-start justify-between gap-1 mb-13">
                <Headline>
                    <span className="text-[#4C4C4C]">{name.split(" ")[0]}</span>{" "}
                    {name.split(" ").slice(1).join(" ")}
                </Headline>
                <Headline variant="2" className="text-[#4C4C4C]">
                    №{id} от {date}
                </Headline>
            </div>

            {data && (
                <div className="border-t border-b border-[#919191] overflow-hidden">
                    <table className="w-full table-fixed border-collapse">
                        <CalculationTableHeader />
                        <tbody>
                            {data.sections.map((section, index) => (
                                <CalculationTableSection
                                    key={section.name}
                                    section={section}
                                    isOpen={openSections.has(index)}
                                    onToggle={() => toggleSection(index)}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className="h-3 bg-[#D6D6D6]" aria-hidden />
                    <CalculationTableSummary data={data} />
                    <div className="h-3 bg-[#D6D6D6]" aria-hidden />
                </div>
            )}

            <div className="flex justify-end mt-6">
                <Button>Скачать смету</Button>
            </div>
        </section>
    );
}
