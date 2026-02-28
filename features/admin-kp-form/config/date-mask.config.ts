import type { FactoryOpts } from "imask";
import { MaskedRange } from "imask"; // Импортируем для правильной работы range

export const DATE_MASK_CONFIG = {
    mask: "d.m.Y",

    lazy: true, // Скрывать маску без фокуса
    overwrite: true, // ВАЖНО: Режим перезаписи. Не дает ставить "двойные" точки.
    autofix: true, // ВАЖНО: Авто-исправление (1. -> 01.)

    blocks: {
        d: {
            mask: MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
            placeholderChar: "d",
            autofix: "pad", // Добавляет 0, если ввели одну цифру и нажали точку
        },
        m: {
            mask: MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
            placeholderChar: "m",
            autofix: "pad",
        },
        Y: {
            mask: MaskedRange,
            from: 1900,
            to: 2999,
            maxLength: 4,
            placeholderChar: "Y",
        },
    },
} as unknown as FactoryOpts;
