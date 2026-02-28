"use client";

// Блоки
import { Hero } from "@/widgets/hero";
import { KpProps } from "../types";
import { Manager } from "@/widgets/manager";
import { CommercialProposal } from "@/widgets/commercial-proposal";
import { Documents } from "@/widgets/documents";
import {
    CalculationTable,
    CalculationTableData,
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

// Конфиги\утилиты
import {
    MOCK_CALCULATION_TABLE,
    MOCK_COMMERCIAL_PROPOSAL,
    MOCK_DOCUMENTS,
    MOCK_MANAGER,
    MOCK_NODE_DESIGN,
    MOCK_PAYMENT_AND_TERMS,
    MOCK_PRODUCTION_CONDITIONS,
} from "../config/mock";
import { parseCalculationTableFromFile } from "@/shared/lib";

// Библиотеки
import { useEffect, useState } from "react";

export const Kp = ({ id }: KpProps) => {
    void id; // route param, reserved for future use
    // const [loading, setLoading] = useState(true);
    const [calculationTable, setCalculationTable] =
        useState<CalculationTableData>({
            sections: [],
            totalForFirstSection: {
                totalCostWork: "",
                totalCost: "",
            },
            trNr: "",
            nds: "",
        });

    useEffect(() => {
        const load = async () => {
            const response = await fetch(MOCK_CALCULATION_TABLE.pathFile);

            const buffer = await response.arrayBuffer();

            const parsedSections = parseCalculationTableFromFile(buffer);
            setCalculationTable(parsedSections);
            // setLoading(false);
        };

        load();
    }, []);

    // if (loading) {
    //     return <Loader />
    // }

    return (
        <main className="grid grid-cols-1 gap-37.5">
            <Hero />
            <Manager {...MOCK_MANAGER} />
            <CommercialProposal {...MOCK_COMMERCIAL_PROPOSAL} />
            <div className="grid grid-cols-1 gap-6">
                <CalculationTable
                    {...MOCK_CALCULATION_TABLE}
                    data={calculationTable}
                />
                <Documents documents={MOCK_DOCUMENTS} />
            </div>
            <PaymentAndTerms data={MOCK_PAYMENT_AND_TERMS} />
            <ProductionConditions data={MOCK_PRODUCTION_CONDITIONS} />
            <NodeDesign {...MOCK_NODE_DESIGN} />
            <AnySurface visible={true} />
            <AdavantagesOfConcrete visible={true} />
            <MechanizationOptions
                fillingBlockVisible={true}
                grindingBlockVisible={true}
            />
            <MobileFactory visible={true} />
            <InteriorOptions visible={true} />
            <Stairs visible={true} />
            <Landscaping visible={true} />
            <RepairAndRestoration visible={true} />
            <Footer />
        </main>
    );
};
