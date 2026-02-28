import { Button, Headline, MainText } from "@/shared/ui";
import { NodeDesignProps } from "../types/node-design.props";
import { cn } from "@/shared/utils";
import { PADDING_X_CLASS } from "@/shared/config";
import Image from "next/image";
import { downloadImage } from "../utils/download-image";

export const NodeDesign = ({ photo }: NodeDesignProps) => {
    return (
        <section className={cn(PADDING_X_CLASS)}>
            <div className="flex items-center justify-between mb-11.5">
                <Headline className="text-gray">
                    Вариация конструкции УЗЛОВ продуктов
                </Headline>

                <div className="flex flex-col items-start gap-5 max-w-[523px]">
                    <MainText variant="2">
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
