import { PADDING_X_CLASS } from "@/shared/config";
import { cn, normalizePhone } from "@/shared/utils";
import { ManagerProps } from "../types";
import { Headline, MainText } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

export const Manager = ({ name, post, phone, email, photo }: ManagerProps) => {
    return (
        <section
            className={cn(
                PADDING_X_CLASS,
                "grid grid-cols-1 xl:grid-cols-2 gap-7.5",
            )}
        >
            <div className="flex flex-col justify-between gap-1 text-gray min-w-0">
                <MainText>
                    Компания OMNITON более 10 лет специализируется на
                    производстве архитектурного бетона (терраццо, микробетон,
                    брекчия), применяемого для внутренней отделки, облицовки
                    цоколей и фасадов, уличного благоустройства и создания
                    МАФов. Наша продукция соответствует высоким стандартам
                    качества и экологичности.
                </MainText>

                <MainText>
                    В продолжение нашего диалога подготовлено коммерческое
                    предложение. Будем рады сотрудничеству и готовы предоставить
                    дополнительную информацию по вашему запросу.
                </MainText>
            </div>

            <div className="flex items-start gap-6 xl:gap-12.5 min-w-0 flex-wrap xl:flex-nowrap">
                <Image
                    src={photo}
                    alt={name}
                    width={271}
                    height={271}
                    sizes="(max-width: 1280px) 200px, 271px"
                    unoptimized
                    className="rounded-full shrink-0 w-[200px] h-[200px] xl:w-[271px] xl:h-[271px] object-cover"
                />

                <div className="flex flex-col justify-between gap-1 h-full min-w-0 flex-1">
                    <div className="flex flex-col gap-3.5">
                        <Headline variant="4" className="text-violet1">
                            {name}
                        </Headline>
                        <Headline variant="4" className="normal-case">
                            {post}
                        </Headline>
                    </div>

                    <div className="flex flex-col gap-5">
                        <Link href={`tel:${normalizePhone(phone)}`}>
                            <Headline variant="4">{phone}</Headline>
                        </Link>

                        <Link
                            href={`mailto:${email}`}
                            className="break-all min-w-0"
                        >
                            <Headline
                                variant="4"
                                className="normal-case break-all"
                            >
                                {email}
                            </Headline>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
