import { PADDING_X_CLASS } from "@/shared/config";
import { cn } from "@/shared/utils";
import { Headline, MainText } from "@/shared/ui";
import { motion } from "framer-motion";
import Image from "next/image";
import { CROSS_POS_RIGHT, GAP_Y, lineDrawTransition } from "../config";

export const Hero = () => {
    return (
        <section className="w-full min-h-screen relative flex flex-col justify-between bg-black overflow-hidden">
            {/* 1. ФОН */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero/background.png"
                    alt="hero background"
                    fill
                    priority
                    className="object-cover opacity-70"
                    draggable={false}
                />
            </div>

            {/* 2. ЛОГОТИП */}
            <div className={cn("w-full relative z-10 pt-8", PADDING_X_CLASS)}>
                <div className="w-full flex justify-center mb-8 mob:mb-0">
                    <div className="w-full max-w-[1440px]">
                        <Image
                            src="/logo.svg"
                            width={1313}
                            height={177}
                            alt="OMNITON"
                            priority
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                <Headline
                    variant="2"
                    className="uppercase text-white leading-none text-[20px] block mob:hidden"
                >
                    ВЫСОКОКАЧЕСТВЕННЫЙ
                    <br />
                    ЭНЕРГОЭФФЕКТИВНЫЙ
                    <br />
                    АРХИТЕКТУРНЫЙ БЕТОН
                </Headline>
            </div>

            {/* 3. НИЖНЯЯ ЧАСТЬ */}
            <div
                className={cn(
                    "w-full relative z-10 mt-auto pb-8",
                    PADDING_X_CLASS,
                )}
            >
                <div className="w-full mx-auto relative">
                    {/* ЗАГОЛОВОК */}
                    <div className="pb-6 md:pb-8 relative z-10 w-fit">
                        <Headline
                            variant="2"
                            className="uppercase text-white leading-none text-[30px] lg:text-[50px] hidden mob:block"
                        >
                            ВЫСОКОКАЧЕСТВЕННЫЙ
                            <br />
                            ЭНЕРГОЭФФЕКТИВНЫЙ
                            <br />
                            АРХИТЕКТУРНЫЙ БЕТОН
                        </Headline>
                    </div>

                    {/* --- ГЛАВНЫЙ КОНТЕЙНЕР СЕТКИ --- */}
                    {/* relative нужен, чтобы линии внутри позиционировались относительно высоты ЭТОГО блока */}
                    <div className="relative w-full">
                        {/* ================= ЛИНИИ ================= */}

                        {/* 1. Горизонтальная ЛЕВАЯ (до разрыва) — прорисовка слева направо */}
                        <div className="absolute left-0 top-0 h-[2px] overflow-hidden right-[calc(10%+12px)] lg:right-[calc(15%+12px)] hidden lg:block">
                            <motion.div
                                className="h-full w-full bg-white origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                    ...lineDrawTransition,
                                    delay: 0.1,
                                }}
                            />
                        </div>

                        {/* 2. Горизонтальная ПРАВАЯ (после разрыва) — прорисовка справа налево */}
                        <div className="absolute right-0 top-0 h-[2px] overflow-hidden w-[calc(10%-12px)] lg:w-[calc(15%-12px)] hidden lg:block">
                            <motion.div
                                className="h-full w-full bg-white origin-right"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                    ...lineDrawTransition,
                                    delay: 0.2,
                                }}
                            />
                        </div>

                        {/* 3. Вертикальная ВЕРХНЯЯ (торчит вверх) — прорисовка снизу вверх */}
                        <div
                            className={cn(
                                "absolute w-[2px] h-32 md:h-56 overflow-hidden hidden lg:block",
                                CROSS_POS_RIGHT,
                            )}
                            style={{ bottom: `calc(100% + ${GAP_Y})` }}
                        >
                            <motion.div
                                className="w-full h-full bg-white origin-bottom"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{
                                    ...lineDrawTransition,
                                    delay: 0.3,
                                }}
                            />
                        </div>

                        {/* 4. Вертикальная НИЖНЯЯ (ВНУТРИ БЛОКА) — прорисовка сверху вниз */}
                        <div
                            className={cn(
                                "absolute w-[2px] bottom-0 overflow-hidden hidden lg:block",
                                CROSS_POS_RIGHT,
                            )}
                            style={{ top: GAP_Y }}
                        >
                            <motion.div
                                className="w-full h-full bg-white origin-top"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{
                                    ...lineDrawTransition,
                                    delay: 0.4,
                                }}
                            />
                        </div>

                        {/* ================= КОНТЕНТ ================= */}
                        {/* pt-6 создает отступ текста от горизонтальной линии сверху */}
                        <div className="flex flex-col mob:flex-row w-full items-stretch pt-6">
                            {/* ЛЕВАЯ КОЛОНКА */}
                            <div className="w-full mob:w-[38%] pr-4">
                                <MainText className="text-white/80 w-full mob:max-w-[380px] text-[14px] lg:text-[22px] mob:text-[16px] border-t border-white py-5 mob:border-none mob:py-0">
                                    115162, г.Москва, Внутренний территориальный
                                    городской муниципальный округ Даниловский,
                                    ул.Шухова, д.17, корп.2
                                </MainText>
                            </div>

                            {/* ЦЕНТРАЛЬНЫЙ РАЗДЕЛИТЕЛЬ — прорисовка сверху вниз */}
                            <motion.div
                                className="w-[2px] bg-white mt-2 origin-top hidden lg:block"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{
                                    ...lineDrawTransition,
                                    delay: 0.5,
                                }}
                            />

                            {/* ПРАВАЯ КОЛОНКА */}
                            <div className="flex-1 pl-0 mob:pl-10">
                                <MainText className="text-white/80 uppercase leading-relaxed text-[14px] lg:text-[22px] mob:text-[20px] border-t border-white py-5 mob:border-none mob:py-0">
                                    ОГРН: 1155075002103
                                    <br />
                                    ИНН/КПП: 5075028348/773101001
                                    <br />
                                    OOO НПП «А-Бетон»
                                </MainText>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
