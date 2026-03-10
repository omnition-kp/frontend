import { PADDING_X_CLASS } from "@/shared/config";
import { cn, normalizePhone } from "@/shared/utils";
import { ManagerProps } from "../types";
import { Headline, MainText } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

export const Manager = ({ name, post, phone, email, photo }: ManagerProps) => {
    const [postTitle, ...postRest] = post.split(" ");
    const postDepartment = postRest.join(" ");

    return (
        <section
            className={cn(
                PADDING_X_CLASS,
                "grid grid-cols-1 xl:grid-cols-2 gap-20",
            )}
        >
            <div className="flex flex-col justify-between gap-1 text-gray min-w-0">
                <MainText className="text-[14px] mob:text-[22px]">
                    Компания OMNITON более 10 лет специализируется на
                    производстве архитектурного бетона (терраццо, микробетон,
                    брекчия), применяемого для внутренней отделки, облицовки
                    цоколей и фасадов, уличного благоустройства и создания
                    МАФов. Наша продукция соответствует высоким стандартам
                    качества и экологичности.
                </MainText>

                <MainText className="text-[14px] mob:text-[22px]">
                    В продолжение нашего диалога подготовлено коммерческое
                    предложение. Будем рады сотрудничеству и готовы предоставить
                    дополнительную информацию по вашему запросу.
                </MainText>
            </div>

            <div className="flex flex-col min-w-0">
                {/* Мобила: имя над основным блоком. Таблет: имя внутри среднего блока */}
                <Headline
                    variant="4"
                    className="text-violet1 text-[22px] mb-4 mob:hidden"
                >
                    {name}
                </Headline>

                {/* ПК: фото слева, столбик справа (имя+должность+контакты), выравнивание по центру. Мобила: должность и контакты по верхней границе */}
                <div className="flex items-start xl:items-center gap-4 mob:gap-6 xl:gap-8 min-w-0 flex-wrap mob:flex-nowrap">
                    {/* ПК: справа от фото (order-2). Мобила: должность | фото | контакты */}
                    <div className="order-1 mob:order-2 xl:order-2 flex flex-col gap-1 min-w-0 flex-1">
                        <Headline
                            variant="4"
                            className="text-violet1 text-[30px] hidden mob:block lg:text-[30px]"
                        >
                            {name}
                        </Headline>
                        {postTitle && (
                            <Headline
                                variant="4"
                                className="normal-case text-black text-[14px] mob:text-[22px] lg:text-[22px]"
                            >
                                {postTitle}
                            </Headline>
                        )}
                        {postDepartment && (
                            <Headline
                                variant="4"
                                className="normal-case text-gray-500 text-[14px] mob:text-[22px] lg:text-[22px]"
                            >
                                {postDepartment}
                            </Headline>
                        )}
                        {/* Контакты в одном столбике с именем/должностью на ПК; отступ сверху как на референсе */}
                        <div className="hidden xl:flex flex-col gap-1 xl:mt-5">
                            <Link href={`tel:${normalizePhone(phone)}`}>
                                <Headline
                                    variant="4"
                                    className="text-[14px] mob:text-[22px] lg:text-[22px]"
                                >
                                    {phone}
                                </Headline>
                            </Link>
                            <Link
                                href={`mailto:${email}`}
                                className="break-all min-w-0"
                            >
                                <Headline
                                    variant="4"
                                    className="normal-case break-all text-[14px] mob:text-[22px] lg:text-[22px]"
                                >
                                    {email}
                                </Headline>
                            </Link>
                        </div>
                    </div>

                    {/* ПК: фото слева (order-1). Мобила: фото по центру. Таблет: фото слева */}
                    <Image
                        src={photo}
                        alt={name}
                        width={200}
                        height={200}
                        sizes="(max-width: 768px) 72px, (max-width: 1280px) 140px, 200px"
                        unoptimized
                        className={cn(
                            "order-2 mob:order-1 xl:order-1 shrink-0 rounded-full object-cover",
                            "w-[72px] h-[72px] mob:w-[140px] mob:h-[140px] xl:w-[200px] xl:h-[200px]",
                        )}
                    />

                    {/* Контакты — справа на мобиле/таблет; на ПК показываются в первом столбике */}
                    <div className="order-3 xl:hidden flex flex-col gap-1 min-w-0 flex-1">
                        <Link href={`tel:${normalizePhone(phone)}`}>
                            <Headline
                                variant="4"
                                className="text-[14px] mob:text-[22px] lg:text-[22px]"
                            >
                                {phone}
                            </Headline>
                        </Link>
                        <Link
                            href={`mailto:${email}`}
                            className="break-all min-w-0"
                        >
                            <Headline
                                variant="4"
                                className="normal-case break-all text-[14px] mob:text-[22px] lg:text-[22px]"
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
