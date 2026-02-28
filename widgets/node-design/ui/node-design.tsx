import { Button, Headline, MainText } from "@/shared/ui";
import { NodeDesignProps } from "../types/node-design.props";
import { cn } from "@/shared/utils";
import { PADDING_X_CLASS } from "@/shared/config";
import Image from "next/image";
import { downloadImage } from "../utils/download-image";

export const NodeDesign = ({ photo }: NodeDesignProps) => {
    return (
        <section className={cn(PADDING_X_CLASS)}>
            <div className="flex lg:flex-row flex-col items-center justify-between lg:mb-11.5 mob:mb-10 mb-6">
                <Headline className="text-gray lg:mb-0 mob:mb-10 mb-6 lg:text-[56px] mob:text-[34px] text-[24px]">
                    Вариация конструкции УЗЛОВ продуктов
                </Headline>

                <div className="flex flex-col items-start lg:gap-5 mob:gap-7 gap-4.5 lg:max-w-[523px]">
                    <MainText
                        variant="2"
                        className="lg:text-[20px] mob:text-[20px] text-[14px]"
                    >
                        Интегрируемся в любые проекты: предложим варианты
                        оптимизации уже спроектированных подпорных стен
                        для снижения издержек при эксплуатации.
                    </MainText>

                    <Button
                        className="uppercase"
                        onClick={() => downloadImage(photo)}
                    >
                        Скачать схему
                    </Button>
                </div>
            </div>

            <div className="flex justify-center w-full">
                <Image
                    src={photo}
                    alt="node design"
                    width={1000}
                    height={634}
                    sizes="1000px 634px"
                    className="max-w-[1009px] w-full h-auto"
                    unoptimized
                    draggable={false}
                />
            </div>
        </section>
    );
};
