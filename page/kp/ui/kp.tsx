"use client";

// Блоки
import { Loader } from "@/widgets/loader";
import { Hero } from "@/widgets/hero";
import { KpProps } from "../types";
import { Manager } from "@/widgets/manager";
import { CommercialProposal } from "@/widgets/commercial-proposal";
import { Documents } from "@/widgets/documents";
import {
    CalculationTable,
    type CalculationTableData,
} from "@/widgets/calculation-table";
import { ProductionConditions } from "@/widgets/production-conditions";
import { PaymentAndTerms } from "@/widgets/payment-and-terms";
import { NodeDesign } from "@/widgets/node-design";
import { AnySurface } from "@/widgets/any-surface";
import { AdavantagesOfConcrete } from "@/widgets/adavantages-of-concrete";
import { MechanizationOptions } from "@/widgets/mechanization-options";
import { MobileFactory } from "@/widgets/mobile-factory";
import { InteriorOptions } from "@/widgets/interior-options";
import { Stairs } from "@/widgets/stairs";
import { Landscaping } from "@/widgets/landscaping";
import { RepairAndRestoration } from "@/widgets/repair-and-restoration";
import { Footer } from "@/widgets/footer";

// Запросы
import type { KpDto } from "@/shared/types/server";
import {
    useGetKpControllerGetKp,
    useGetTableDataControllerGetTableData,
} from "@/shared/queries";

// Библиотеки
import { notFound } from "next/navigation";

export const Kp = ({ id }: KpProps) => {
    const { data: kpData, isLoading: loadingKpData } = useGetKpControllerGetKp(
        id,
        {
            query: {
                select: (response: unknown) =>
                    (response as { data?: KpDto })?.data ?? (response as KpDto),
            },
        },
    );
    const { data: calculationTable, isLoading: loadingCalculationTable } =
        useGetTableDataControllerGetTableData(id, {
            query: {
                select: (response: unknown) =>
                    (response as { data?: CalculationTableData })?.data ??
                    (response as CalculationTableData),
            },
        });

    if (loadingKpData || loadingCalculationTable) {
        return <Loader />;
    }

    if (!kpData || !calculationTable) {
        return notFound();
    }

    return (
        <main className="grid grid-cols-1 gap-15 lg:gap-37.5 mob:gap-20">
            <Hero />
            <Manager {...kpData.manager} />
            <CommercialProposal
                id={kpData.numberKp}
                date={kpData.date}
                adress={kpData.orderAddress}
                client={kpData.clientName}
                contactPerson={kpData.contactPerson}
                numberOrder={kpData.numberOrder}
                details={kpData.details}
            />
            <div className="grid grid-cols-1 gap-6">
                <CalculationTable
                    id={kpData.id}
                    name={kpData.estimate.name}
                    date={kpData.date}
                    data={calculationTable}
                />
                <Documents
                    documents={kpData.documents.map((document) => ({
                        path: document.filePath,
                        name: document.name,
                    }))}
                />
            </div>
            <PaymentAndTerms data={kpData.payAndDeadlines} />
            <ProductionConditions data={kpData.productionConditions} />
            <NodeDesign {...kpData.nodeDesign} />
            <AnySurface visible={kpData.anySurface} />
            <AdavantagesOfConcrete visible={kpData.advantagesOfConcrete} />
            <MechanizationOptions
                fillingBlockVisible={kpData.variationsOfTheMechanism}
                grindingBlockVisible={kpData.grinding}
            />
            <MobileFactory visible={kpData.ownMobileFactory} />
            <InteriorOptions visible={kpData.interiorOptions} />
            <Stairs visible={kpData.stairs} />
            <div className="mt-5 lg:mt-0">
                <Landscaping visible={kpData.landscaping} />
            </div>
            <RepairAndRestoration visible={kpData.repairAndRestoration} />
            <Footer />
        </main>
    );
};
