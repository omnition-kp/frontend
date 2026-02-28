import { NotRequiredBlockProps } from "@/shared/types";
import { Headline, NotRequiredBlockTemplate } from "@/shared/ui";
import { ADVANTAGES } from "../config/advantages";
import { AdvantageBlock } from "./advantage-block";

export const AdavantagesOfConcrete = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-gray mb-11.5">
                ПРЕИМУЩЕСТВА АХИТЕКТУРНОГО БЕТОНА
            </Headline>

            <div className="grid grid-cols-3">
                {ADVANTAGES.map((advantage) => (
                    <AdvantageBlock key={advantage.title} {...advantage} />
                ))}
            </div>
        </NotRequiredBlockTemplate>
    );
};
