
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { analyzeSentiment } from "@/lib/sentimentAnalysis";
import SentimentResult from "./SentimentResult";

export default function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    sentiment: "positive" | "negative" | "neutral";
    score: number;
    confidence: number;
  } | null>(null);
  
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // In a real app, this would call an API
      const analysisResult = analyzeSentiment(text);
      setResult(analysisResult);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Enter text to analyze sentiment..."
            className="min-h-32 text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <div className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !text.trim()}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
            </Button>
          </div>

          {result && <SentimentResult result={result} text={text} />}
        </div>
      </CardContent>
    </Card>
  );
}
