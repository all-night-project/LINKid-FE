import type { QiScoreItem } from "../../types/dashboard";

interface QIScoreChartProps {
    data: QiScoreItem[];
}

const QIScoreChart = ({ data }: QIScoreChartProps) => {
    const maxScore =
        data.length > 0 ? Math.max(...data.map((d) => d.score)) : 100;
    const chartHeight = 130;
    const chartWidth = 290;
    const paddingX = 10;
    const paddingTop = 25;
    const paddingBottom = 20;

    const stepX =
        data.length > 1
            ? (chartWidth - paddingX * 2) / (data.length - 1)
            : 0;

    const points = data.map((d, i) => {
        const x = paddingX + stepX * i;
        // score가 높을수록 위로 가도록 비율 계산
        const ratio = d.score / maxScore;
        const y =
            paddingTop +
            (chartHeight - paddingTop - paddingBottom) * (1 - ratio);
        return { ...d, x, y };
    });

    const polylinePoints = points
        .map((p) => `${p.x},${p.y}`)
        .join(" ");

    return (
        <svg
            width="100%"
            height={chartHeight + 20}
            viewBox={`0 0 ${chartWidth} ${chartHeight + 14}`}
        >
            {/* 점선 가이드 (중앙 수평선만 하나) */}
            <line
                x1={paddingX}
                x2={chartWidth - paddingX}
                y1={chartHeight / 2}
                y2={chartHeight / 2}
                stroke="#C8E6C9"
                strokeDasharray="3 4"
            />

            {/* 라인 */}
            <polyline
                points={polylinePoints}
                fill="none"
                stroke="#FAEFEF"
                strokeWidth={2}
            />

            {/* 점 + 점수 텍스트 */}
            {points.map((p, idx) => (
                <g key={idx}>
                    <circle
                        cx={p.x}
                        cy={p.y}
                        r={4}
                        fill="white"
                        stroke="#F4C2C2"
                        strokeWidth={2}
                    />
                    <text
                        x={p.x}
                        y={p.y - 8}
                        fontSize="10"
                        textAnchor="middle"
                        fill="#5A4A42"
                    >
                        {p.score}
                    </text>
                </g>
            ))}

            {/* X축 날짜 */}
            {points.map((p, idx) => (
                <text
                    key={idx}
                    x={p.x}
                    y={chartHeight + 10}
                    fontSize="13"
                    textAnchor="middle"
                    fill="#9C938D"
                >
                    {p.date}
                </text>
            ))}
        </svg>
    );
};

export default QIScoreChart;