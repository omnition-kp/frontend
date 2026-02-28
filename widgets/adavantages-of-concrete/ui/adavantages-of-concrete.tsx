import { NotRequiredBlockProps } from "@/shared/types";
import { Headline, NotRequiredBlockTemplate } from "@/shared/ui";
import { ADVANTAGES } from "../config/advantages";
import { AdvantagesGrid } from "./advantages-grid";

export const AdavantagesOfConcrete = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-gray lg:mb-11.5 mob:mb-10 mb-6 lg:text-[56px] mob:text-[34px] text-[24px]">
                ПРЕИМУЩЕСТВА АХИТЕКТУРНОГО БЕТОНА
            </Headline>

            <AdvantagesGrid advantages={ADVANTAGES} />
        </NotRequiredBlockTemplate>
    );
};
