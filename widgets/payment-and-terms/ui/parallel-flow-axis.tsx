"use client";

import { motion } from "framer-motion";
import {
    AXIS_CLASS,
    AXIS_LINE_PX,
    CORNER_SQ_PX,
    OFFSET_PX,
    PARALLEL_FLOW_ANIMATION,
} from "../config/parallel-flow.config";

const { lineDraw } = PARALLEL_FLOW_ANIMATION;
const lineTransition = { duration: lineDraw.duration, ease: lineDraw.ease };

export const ParallelFlowAxis = ({ isInView }: { isInView: boolean }) => {
    return (
        <>
            {/* Верхний левый угол — прорисовка */}
            <div
                className="absolute overflow-hidden"
                style={{
                    left: -OFFSET_PX,
                    top: -OFFSET_PX,
                    width: CORNER_SQ_PX,
                    height: CORNER_SQ_PX,
                }}
                aria-hidden
            >
                <motion.div
                    className={`w-full h-full ${AXIS_CLASS}`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ ...lineTransition, delay: 0 }}
                    style={{ transformOrigin: "top left" }}
                />
            </div>

            {/* Нижний левый угол */}
            <div
                className="absolute bottom-0 overflow-hidden"
                style={{
                    left: -OFFSET_PX,
                    bottom: -OFFSET_PX,
                    width: CORNER_SQ_PX,
                    height: CORNER_SQ_PX,
                }}
                aria-hidden
            >
                <motion.div
                    className={`w-full h-full ${AXIS_CLASS}`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ ...lineTransition, delay: 0.1 }}
                    style={{ transformOrigin: "bottom left" }}
                />
            </div>

            {/* Нижний правый угол */}
            <div
                className="absolute right-0 bottom-0 overflow-hidden"
                style={{
                    right: 0,
                    bottom: -OFFSET_PX,
                    width: CORNER_SQ_PX,
                    height: CORNER_SQ_PX,
                }}
                aria-hidden
            >
                <motion.div
                    className={`w-full h-full ${AXIS_CLASS}`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ ...lineTransition, delay: 0.2 }}
                    style={{ transformOrigin: "bottom right" }}
                />
            </div>

            {/* Левая вертикальная линия — прорисовка сверху вниз */}
            <div
                className="absolute left-0 overflow-hidden"
                style={{
                    top: CORNER_SQ_PX - OFFSET_PX,
                    bottom: 0,
                    width: AXIS_LINE_PX,
                }}
                aria-hidden
            >
                <motion.div
                    className={`w-full h-full ${AXIS_CLASS}`}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ ...lineTransition, delay: 0.05 }}
                    style={{ transformOrigin: "top" }}
                />
            </div>

            {/* Нижняя горизонтальная линия — прорисовка слева направо */}
            <div
                className="absolute bottom-0 overflow-hidden"
                style={{
                    left: OFFSET_PX,
                    right: CORNER_SQ_PX,
                    height: AXIS_LINE_PX,
                }}
                aria-hidden
            >
                <motion.div
                    className={`w-full h-full ${AXIS_CLASS}`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ ...lineTransition, delay: 0.15 }}
                    style={{ transformOrigin: "left" }}
                />
            </div>
        </>
    );
};
