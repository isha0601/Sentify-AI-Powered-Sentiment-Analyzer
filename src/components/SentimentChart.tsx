
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface SentimentChartProps {
  data: {
    category: string;
    count: number;
    color: string;
  }[];
}

export default function SentimentChart({ data }: SentimentChartProps) {
  const config = {
    positive: { color: "#10b981" },
    negative: { color: "#ef4444" },
    neutral: { color: "#6b7280" },
  };

  return (
    <div className="w-full h-64 mt-6">
      <ChartContainer
        config={config}
        className="w-full h-full"
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Bar
                key={index}
                dataKey="count"
                fill={entry.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </Bar>
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
