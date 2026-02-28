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
            <Headline className="text-gray mb-11.5">
                ВАРИАНТЫ МЕХАНИЗАЦИИ:
            </Headline>

            {fillingBlockVisible && (
                <div>
                    <Headline className="text-black mb-11.5">Заливка:</Headline>

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
            )}

            {grindingBlockVisible && (
                <div className="mt-[150px]">
                    <Headline className="text-black mb-11.5">
                        Шлифовка:
                    </Headline>

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
            )}
        </section>
    );
};
