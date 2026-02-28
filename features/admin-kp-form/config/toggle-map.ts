import type { OptionKey } from "../types";
import type { KpCreateDto } from "@/shared/types/server";

export const TOGGLE_MAPPING: Record<OptionKey, keyof KpCreateDto> = {
    anySurface: "anySurface",
    archConcreteBenefits: "advantagesOfConcrete",
    mechanizationVariants: "variationsOfTheMechanism",
    grinding: "grinding",
    mobileFactory: "ownMobileFactory",
    interiorVariants: "interiorOptions",
    stairs: "stairs",
    landscaping: "landscaping",
    repairRestoration: "repairAndRestoration",
};
