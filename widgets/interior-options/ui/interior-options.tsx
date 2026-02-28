import { NotRequiredBlockProps } from "@/shared/types";
import { NotRequiredBlockTemplate } from "@/shared/ui";
import { Headline } from "@/shared/ui/text/headline";
import { ContentSwitchingTemplate, InteriorTemplate } from "../templates";
import { INTERIOR_DATA } from "../config/interior-data";

export const InteriorOptions = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-black lg:mb-10 mob:mb-6 mb-5 lg:text-[56px] mob:text-[34px] text-[24px]">
                варианты интерьера:
            </Headline>

            {/* Только на мобиле: все блоки по порядку, без переключателя */}
            <div className="flex flex-col gap-10 mob:hidden">
                {INTERIOR_DATA.map((item) => (
                    <InteriorTemplate key={item.title} {...item} />
                ))}
            </div>

            {/* С планшета (mob) и выше: переключалка */}
            <div className="hidden mob:block">
                <ContentSwitchingTemplate
                    firstButtonName="полы из плит"
                    secondButtonName="полы для паркинга"
                    firstContent={<InteriorTemplate {...INTERIOR_DATA[0]} />}
                    secondContent={<InteriorTemplate {...INTERIOR_DATA[1]} />}
                />
            </div>
        </NotRequiredBlockTemplate>
    );
};
