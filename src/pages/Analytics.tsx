import { useMemo } from "react";
import Navbar from "../components/Navbar";
import SentimentChart from "../components/SentimentChart";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useSentimentData } from "../contexts/SentimentDataContext";

interface ChartDataItem {
  category: string;
  count: number;
  color: string;
}

export default function Analytics() {
  const { sentimentData } = useSentimentData();

  // Transform sentimentData into chartData format
  const chartData: ChartDataItem[] = useMemo(() => {
    const counts = {
      Positive: 0,
      Neutral: 0,
      Negative: 0,
    };

    sentimentData.forEach(item => {
      const category = item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1);
      if (counts.hasOwnProperty(category)) {
        counts[category] += 1;
      }
    });

    return [
      { category: "Positive", count: counts.Positive, color: "#22c55e" }, // green-500
      { category: "Neutral", count: counts.Neutral, color: "#6b7280" },   // gray-500
      { category: "Negative", count: counts.Negative, color: "#ef4444" }, // red-500
    ];
  }, [sentimentData]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Analytics Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Visualize sentiment trends and patterns
          </p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Positive</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">
                {chartData.find(d => d.category === "Positive")?.count || 0}
              </p>
              <p className="text-muted-foreground">Total positive mentions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Neutral</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-500">
                {chartData.find(d => d.category === "Neutral")?.count || 0}
              </p>
              <p className="text-muted-foreground">Total neutral mentions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Negative</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">
                {chartData.find(d => d.category === "Negative")?.count || 0}
              </p>
              <p className="text-muted-foreground">Total negative mentions</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentChart data={chartData} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
