import type { StrategyGuide, PracticeLog, PracticeItem } from "../types/challenge";

export function mergePracticeData(
    strategyGuide: StrategyGuide,
    practiceLogs: PracticeLog[],
    targetCount: number
): PracticeItem[] {

    const examples = strategyGuide.examples;

    return Array.from({ length: targetCount }).map((_, idx) => {
        const log = practiceLogs[idx];

        return {
            id: idx + 1,
            label: examples[idx] ?? `실천 항목 ${idx + 1}`,
            completed: !!log,
            createdAt: log?.createdAt ?? null,
            review: log?.memo ?? null
        };
    });
}

export const formatDateString = (str: string) => {
    const [date] = str.split("T");
    const [y, m, d] = date.split("-");

    return `${y}년 ${Number(m)}월 ${Number(d)}일`;
};