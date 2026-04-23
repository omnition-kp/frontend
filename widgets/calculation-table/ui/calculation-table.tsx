"use client";

import { useState, useCallback } from "react";
import { cn } from "@/shared/utils";
import { PADDING_X_CLASS } from "@/shared/config";
import { CalculationTableProps } from "../types/calculation-table.props";
import { Button, Headline } from "@/shared/ui";
import { CalculationTableHeader } from "./calculation-table-header";
import { CalculationTableSection } from "./calculation-table-section";
import { CalculationTableSummary } from "./calculation-table-summary";
import { $api } from "@/shared/utils";
import { getGeneratePdfTableControllerGeneratePdfTableUrl } from "@/shared/queries/generate-pdf-table/generate-pdf-table";

const FIRST_SECTION_OPEN = new Set([0]);

function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
}

export function CalculationTable({ id, name, data }: CalculationTableProps) {
    const [openSections, setOpenSections] =
        useState<Set<number>>(FIRST_SECTION_OPEN);
    const [isDownloading, setIsDownloading] = useState(false);

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

    const handleDownload = useCallback(async () => {
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            const path = getGeneratePdfTableControllerGeneratePdfTableUrl(
                id,
            ).replace(/^\/api/, "");
            const { data: blob } = await $api.get(path, {
                responseType: "blob",
            });
            const filename = `smeta-${name.replace(/\s+/g, "-") || id}.pdf`;
            downloadBlob(blob as Blob, filename);
        } catch {
            // TODO: показать уведомление об ошибке
        } finally {
            setIsDownloading(false);
        }
    }, [id, name, isDownloading]);

    return (
        <section className={cn(PADDING_X_CLASS)}>
            <div className="flex lg:flex-row flex-col items-start justify-between gap-1 lg:mb-13 mob:mb-10 mb-6">
                <Headline className="lg:text-[56px] mob:text-[34px] text-[24px]">
                    <span className="text-[#4C4C4C]">{name.split(" ")[0]}</span>{" "}
                    {name.split(" ").slice(1).join(" ")}
                </Headline>
            </div>

            {data && (
                <div className="border-t border-b border-[#919191] overflow-x-auto lg:overflow-hidden">
                    <table className="w-full table-fixed border-collapse min-w-[1440px] lg:min-w-0">
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
                    <CalculationTableSummary data={data} />
                </div>
            )}

            <div className="flex justify-end lg:mt-6 mob:mt-8 mt-6">
                <Button
                    className="uppercase"
                    onClick={handleDownload}
                    disabled={isDownloading}
                >
                    {isDownloading ? "Загрузка…" : "Скачать смету"}
                </Button>
            </div>
        </section>
    );
}
