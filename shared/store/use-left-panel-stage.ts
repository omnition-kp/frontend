import { create } from "zustand";
import { UseLeftPanelStageStore } from "./types";

export const useLeftPanelStage = create<UseLeftPanelStageStore>((set) => ({
    stage: "full",
    setStage: (stage) => set({ stage }),
}));
