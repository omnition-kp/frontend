import { NotRequiredBlockProps } from "@/shared/types";
import { DotText, MainText, NotRequiredBlockTemplate } from "@/shared/ui";
import { Headline } from "@/shared/ui/text/headline";
import Image from "next/image";
import { LANDSCAPING_DOT_DATA } from "../config/landscaping-dot.data";

export const Landscaping = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-black mb-10">БЛАГОУСТРОЙСТВО</Headline>

            <div className="grid grid-cols-2 gap-6">
                <Image
                    src={"/landscaping/photo.png"}
                    alt="landscaping"
                    width={1000}
                    height={1000}
                    className="w-full h-auto"
                    unoptimized
                    draggable={false}
                />

                <div className="bg-[#EDEDED] border border-black/15 p-5.5 flex flex-col justify-center">
                    <MainText className="text-black mb-7">
                        Архитектурный бетон в благоустройстве придомовых
                        территорий и городских ландшафтов отличается надежностью
                        и прочностью, позволяет создавать любые формы и при этом
                        может быть экономичнее натуральных материалов.
                    </MainText>

                    <div className="grid grid-cols-1 gap-2">
                        {LANDSCAPING_DOT_DATA.map((item) => (
                            <DotText key={item} title={item} />
                        ))}
                    </div>
                </div>
            </div>
        </NotRequiredBlockTemplate>
    );
};
