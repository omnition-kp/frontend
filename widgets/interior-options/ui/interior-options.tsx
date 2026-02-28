import { NotRequiredBlockProps } from "@/shared/types";
import { NotRequiredBlockTemplate } from "@/shared/ui";
import { Headline } from "@/shared/ui/text/headline";
import { ContentSwitchingTemplate, InteriorTemplate } from "../templates";
import { INTERIOR_DATA } from "../config/interior-data";

export const InteriorOptions = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-black mb-10">
                варианты интерьера:
            </Headline>

            <ContentSwitchingTemplate
                firstButtonName="полы из плит"
                secondButtonName="полы для паркинга"
                firstContent={<InteriorTemplate {...INTERIOR_DATA[0]} />}
                secondContent={<InteriorTemplate {...INTERIOR_DATA[1]} />}
            />
        </NotRequiredBlockTemplate>
    );
};
