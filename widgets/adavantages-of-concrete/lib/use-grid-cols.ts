"use client";

import { useSyncExternalStore } from "react";

const MOB = 500;
const LG = 1024;

function getCols(): number {
    if (typeof window === "undefined") return 2;
    const w = window.innerWidth;
    if (w < MOB) return 0;
    if (w < LG) return 2;
    return 3;
}

function subscribe(cb: () => void) {
    const mqMob = window.matchMedia(`(min-width: ${MOB}px)`);
    const mqLg = window.matchMedia(`(min-width: ${LG}px)`);
    const listener = () => cb();
    mqMob.addEventListener("change", listener);
    mqLg.addEventListener("change", listener);
    return () => {
        mqMob.removeEventListener("change", listener);
        mqLg.removeEventListener("change", listener);
    };
}

export function useGridCols(): number {
    return useSyncExternalStore(subscribe, getCols, () => 2);
}
