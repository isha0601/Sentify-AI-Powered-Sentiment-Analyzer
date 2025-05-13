
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, ThumbsUp, ThumbsDown, Meh } from "lucide-react";

interface SentimentResultProps {
  result: {
    sentiment: "positive" | "negative" | "neutral";
    score: number;
    confidence: number;
  };
  text: string;
}

export default function SentimentResult({ result, text }: SentimentResultProps) {
  const getSentimentIcon = () => {
    switch (result.sentiment) {
      case "positive":
        return <ThumbsUp className="h-8 w-8 text-green-500" />;
      case "negative":
        return <ThumbsDown className="h-8 w-8 text-red-500" />;
      case "neutral":
        return <Meh className="h-8 w-8 text-gray-500" />;
      default:
        return <Heart className="h-8 w-8" />;
    }
  };

  const getSentimentColor = () => {
    switch (result.sentiment) {
      case "positive":
        return "bg-green-50 border-green-200";
      case "negative":
        return "bg-red-50 border-red-200";
      case "neutral":
        return "bg-gray-50 border-gray-200";
      default:
        return "";
    }
  };

  return (
    <Card className={`mt-6 border ${getSentimentColor()}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          {getSentimentIcon()}
          <span className="capitalize">{result.sentiment} Sentiment</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Sentiment Score</p>
              <p className="text-2xl font-bold">{result.score.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Confidence</p>
              <p className="text-2xl font-bold">{(result.confidence * 100).toFixed(0)}%</p>
            </div>
          </div>

          <Alert>
            <AlertDescription className="text-sm italic">
              "{text.length > 100 ? text.substring(0, 100) + "..." : text}"
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
