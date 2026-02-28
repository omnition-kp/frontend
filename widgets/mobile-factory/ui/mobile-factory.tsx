import { NotRequiredBlockProps } from "@/shared/types";
import { Headline, MainText, NotRequiredBlockTemplate } from "@/shared/ui";
import Image from "next/image";

export const MobileFactory = ({ visible }: NotRequiredBlockProps) => {
    return (
        <NotRequiredBlockTemplate visible={visible}>
            <Headline className="text-black mb-10">
                собственный ПЕРЕДВИЖНОЙ ЗАВОД
            </Headline>

            <div className="grid grid-cols-2 gap-2.5">
                <Image
                    src="/mobile-factory/photo.png"
                    alt="mobile factory"
                    height={655}
                    width={400}
                    unoptimized
                    draggable={false}
                    className="w-full h-auto"
                />

                <div className="bg-[#EDEDED] pt-7.5 px-5 flex flex-col gap-3.5">
                    <MainText>
                        Привозим на объект собственный мини-завод
                        производительностью от 300 м3/час архитектурного бетона.
                        Это позволяет добиться скорости заливки и стабильности
                        качества архитектурного бетона на объекте.
                    </MainText>

                    <MainText>
                        Подбираем требуемую фактуру, тестируем её на своём
                        производстве, отдаём на независимые испытания
                        в лабораторию МГСУ и только после этого выходим
                        на строительную площадку. На объект всегда привлекаем
                        независимую лабораторию для гарантии качества смеси.
                    </MainText>

                    <MainText>
                        Выстраиваем процесс производства работ с минимальным
                        блокированием смежных работ на площадке.
                    </MainText>
                </div>
            </div>
        </NotRequiredBlockTemplate>
    );
};
