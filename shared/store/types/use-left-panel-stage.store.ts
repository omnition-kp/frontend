import { LeftPanelStage } from "./left-panel-stage";

export interface UseLeftPanelStageStore {
    stage: LeftPanelStage;
    setStage: (stage: LeftPanelStage) => void;
}
