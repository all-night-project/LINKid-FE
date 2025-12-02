import type { PiNdiItem } from "../../types/dashboard";

interface PINDIChartProps {
    data: PiNdiItem[];
}

const MAX_SLOTS = 5;

const PINDIChart = ({ data }: PINDIChartProps) => {
    // ---- (1) 데이터 슬롯 채우기: 중앙 정렬 ---- //
    const fillSlots = (items: PiNdiItem[]) => {
        const result = Array(MAX_SLOTS).fill(null) as (PiNdiItem | null)[];
        const offset = Math.floor((MAX_SLOTS - items.length) / 2);

        items.forEach((item, i) => {
            result[offset + i] = item;
        });

        return result;
    };

    const filledData = fillSlots(data);

    // ---- (2) chart basic values ---- //
    const maxValue = Math.max(
        ...data.map((d) => Math.max(d.pi, d.ndi)),
        10
    );

    const chartHeight = 130;
    const chartWidth = 290;
    const paddingX = 20;
    const paddingTop = 10;
    const paddingBottom = 15;

    const groupWidth = (chartWidth - paddingX * 2) / (MAX_SLOTS - 1);
    const barWidth = groupWidth * 0.25;
    const gapBetweenBars = groupWidth * 0.1;

    return (
        <svg
            width="100%"
            height={chartHeight + 20}
            viewBox={`0 0 ${chartWidth} ${chartHeight + 14}`}
        >
            {filledData.map((item, index) => {
                const baseX = paddingX + groupWidth * index;

                if (!item) {
                    return (
                        <g key={index}>
                            <text
                                x={baseX}
                                y={chartHeight + 10}
                                fontSize="13"
                                textAnchor="middle"
                                fill="#9C938D"
                            >
                                {/* 빈 칸은 label 없음 */}
                            </text>
                        </g>
                    );
                }

                const usableHeight =
                    chartHeight - paddingTop - paddingBottom;

                const piHeight = (usableHeight * item.pi) / maxValue;
                const ndiHeight = (usableHeight * item.ndi) / maxValue;

                const offset = barWidth / 2 + gapBetweenBars / 2;

                const piCenterX = baseX - offset;
                const ndiCenterX = baseX + offset;

                const piX = piCenterX - barWidth / 2;
                const ndiX = ndiCenterX - barWidth / 2;

                const piY = chartHeight - paddingBottom - piHeight;
                const ndiY = chartHeight - paddingBottom - ndiHeight;

                return (
                    <g key={index}>
                        {/* PI bar */}
                        <rect
                            x={piX}
                            y={piY}
                            width={barWidth}
                            height={piHeight}
                            rx={6}
                            fill="#C8E6C9"
                        />

                        {/* NDI bar */}
                        <rect
                            x={ndiX}
                            y={ndiY}
                            width={barWidth}
                            height={ndiHeight}
                            rx={6}
                            fill="#F4C2C2"
                        />

                        {/* Date label */}
                        <text
                            x={baseX}
                            y={chartHeight + 10}
                            fontSize="13"
                            textAnchor="middle"
                            fill="#9C938D"
                        >
                            {item.date}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default PINDIChart;