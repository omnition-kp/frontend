import { NotRequiredBlockProps } from "@/shared/types";
import { DotText, MainText, NotRequiredBlockTemplate } from "@/shared/ui";
import { Headline } from "@/shared/ui/text/headline";
import Image from "next/image";
import { REPAIR_AND_RESTORATION_DATA } from "../config/repair-and-restoration.data";

export const RepairAndRestoration = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-black mb-10">
                РЕМОНТ И ВОССТАНОВЛЕНИЕ
            </Headline>

            <Image
                src={"/repair-and-restoration/photo.png"}
                alt="repair and restoration"
                width={1000}
                height={1000}
                className="w-full h-auto mb-4"
                unoptimized
                draggable={false}
            />

            <div className="bg-[#EDEDED] border border-black/15 p-7.5">
                <MainText className="mb-7.5">
                    Способы ремонта бетонных полов:{" "}
                </MainText>

                <div className="grid grid-cols-2 gap-x-11.5 gap-y-4">
                    {REPAIR_AND_RESTORATION_DATA.map((item) => (
                        <DotText key={item} title={item} />
                    ))}
                </div>
            </div>
        </NotRequiredBlockTemplate>
    );
};
