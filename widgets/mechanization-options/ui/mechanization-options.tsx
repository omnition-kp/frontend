import { cn } from "@/shared/utils/cn";
import { MechanizationOptionsProps } from "../types/mechanization-options.props";
import { PADDING_X_CLASS } from "@/shared/config/padding-x-class";
import { Headline } from "@/shared/ui/text/headline";
import {
    ContentSwitchingTemplate,
    FillingBlockTemplate,
    GrindingBlockTemplate,
} from "../templates";
import {
    BUTTON_SWITCH_NAMES_FILLING,
    BUTTON_SWITCH_NAMES_GRINDING,
    FILLING_DATA,
    GRINDING_DATA,
} from "../config";

export const MechanizationOptions = ({
    fillingBlockVisible,
    grindingBlockVisible,
}: MechanizationOptionsProps) => {
    if (!fillingBlockVisible && !grindingBlockVisible) return null;

    return (
        <section className={cn(PADDING_X_CLASS)}>
            <Headline className="text-gray lg:mb-11.5 mob:mb-10 mb-6 lg:text-[56px] mob:text-[34px] text-[24px]">
                ВАРИАНТЫ МЕХАНИЗАЦИИ:
            </Headline>

            {fillingBlockVisible && (
                <div>
                    <Headline className="text-black lg:mb-11.5 mob:mb-10 mb-6 lg:text-[56px] mob:text-[34px] text-[24px]">
                        Заливка:
                    </Headline>

                    {/* Только на мобиле: все блоки по порядку, без переключателя */}
                    <div className="flex flex-col gap-10 mob:hidden">
                        {FILLING_DATA.map((item) => (
                            <FillingBlockTemplate key={item.title} {...item} />
                        ))}
                    </div>

                    {/* С планшета (mob) и выше: переключалка */}
                    <div className="hidden mob:block">
                        <ContentSwitchingTemplate
                            {...BUTTON_SWITCH_NAMES_FILLING}
                            firstContent={
                                <FillingBlockTemplate {...FILLING_DATA[0]} />
                            }
                            secondContent={
                                <FillingBlockTemplate {...FILLING_DATA[1]} />
                            }
                            thirdContent={
                                <FillingBlockTemplate {...FILLING_DATA[2]} />
                            }
                        />
                    </div>
                </div>
            )}

            {grindingBlockVisible && (
                <div className="lg:mt-[150px] mob:mt-20 mt-17.5">
                    <Headline className="text-black lg:mb-11.5 mob:mb-10 mb-6 lg:text-[56px] mob:text-[34px] text-[24px]">
                        Шлифовка:
                    </Headline>

                    {/* Только на мобиле: все блоки по порядку, без переключателя */}
                    <div className="flex flex-col gap-10 mob:hidden">
                        {GRINDING_DATA.map((item) => (
                            <GrindingBlockTemplate key={item.title} {...item} />
                        ))}
                    </div>

                    {/* С планшета (mob) и выше: переключалка */}
                    <div className="hidden mob:block">
                        <ContentSwitchingTemplate
                            {...BUTTON_SWITCH_NAMES_GRINDING}
                            firstContent={
                                <GrindingBlockTemplate {...GRINDING_DATA[0]} />
                            }
                            secondContent={
                                <GrindingBlockTemplate {...GRINDING_DATA[1]} />
                            }
                            thirdContent={
                                <GrindingBlockTemplate {...GRINDING_DATA[2]} />
                            }
                        />
                    </div>
                </div>
            )}
        </section>
    );
};
