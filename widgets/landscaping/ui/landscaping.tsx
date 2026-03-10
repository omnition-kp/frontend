import { NotRequiredBlockProps } from "@/shared/types";
import { DotText, MainText, NotRequiredBlockTemplate } from "@/shared/ui";
import { Headline } from "@/shared/ui/text/headline";
import Image from "next/image";
import { LANDSCAPING_DOT_DATA } from "../config/landscaping-dot.data";
import { LINE_CLASS } from "../config/line-class.config";

export const Landscaping = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <div className="pt-4 lg:pt-0">
                <Headline className="text-black lg:mb-10 mob:mb-6 mb-5 lg:text-[56px] mob:text-[34px] text-[24px]">
                    БЛАГОУСТРОЙСТВО
                </Headline>

                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 mob:gap-2.5 gap-1">
                    <div className="relative">
                        <Image
                            src={"/landscaping/photo.png"}
                            alt="landscaping"
                            width={1000}
                            height={1000}
                            className="w-full h-auto"
                            quality={100}
                            draggable={false}
                        />
                        <div className={LINE_CLASS.left} />
                        <div className={LINE_CLASS.right} />
                        <div className={LINE_CLASS.top} />
                        <div className={LINE_CLASS.bottom} />
                    </div>

                    <div className="bg-[#EDEDED] border border-black/15 p-5.5 flex flex-col justify-center">
                        <MainText className="text-black lg:mb-7 mb-4 lg:text-[22px] mob:text-[18px] text-[16px]">
                            Архитектурный бетон в благоустройстве придомовых
                            территорий и городских ландшафтов отличается
                            надежностью и прочностью, позволяет создавать любые
                            формы и при этом может быть экономичнее натуральных
                            материалов.
                        </MainText>

                        <div className="grid grid-cols-1 gap-2">
                            {LANDSCAPING_DOT_DATA.map((item) => (
                                <DotText key={item} title={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </NotRequiredBlockTemplate>
    );
};
