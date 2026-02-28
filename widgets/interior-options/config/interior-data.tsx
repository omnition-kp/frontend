import { MainText } from "@/shared/ui";
import { InteriorTemplateProps } from "../templates/interior-template/types/interior-template.props";

export const INTERIOR_DATA: InteriorTemplateProps[] = [
    {
        photo: "/interior-options/1.png",
        title: "полы из плит",
        children: (
            <div className="flex flex-col gap-3">
                <MainText className="text-white lg:text-[22px] mob:text-[18px] text-[16px]">
                    Плиты для пола подойдут при неподходящем основании
                    или невозможности укладки монолитного пола.
                    Швы между плитами могут маскироваться, создавая эффект
                    бесшовного пола.
                </MainText>
                <MainText className="text-white lg:text-[22px] mob:text-[18px] text-[16px]">
                    Мы производим плиты и слебы в собственном цеху методом
                    заливки, что позволяет создавать изделия разных размеров
                    и форм.
                </MainText>
                <MainText className="text-white lg:text-[22px] mob:text-[18px] text-[16px]">
                    В составе OMNITON используются натуральные камни (мрамор,
                    кварц, галька, гранит, габбро), придающие слебам свойства
                    и вес, близкие к натуральному камню.
                </MainText>
            </div>
        ),
    },
    {
        photo: "/interior-options/2.png",
        title: "полы для паркинга",
        children: (
            <MainText className="text-white lg:text-[22px] mob:text-[18px] text-[16px]">
                Для паркингов OMNITON предлагает долговечные полы на основе
                самоуплотняющейся бетонной смеси. Материал решает проблемы
                трещин, влаги, грязи и стёртости разметки, обеспечивая
                сохранение покрытия без ремонта и перекраски более
                10 лет при разумном бюджете.
            </MainText>
        ),
    },
];
