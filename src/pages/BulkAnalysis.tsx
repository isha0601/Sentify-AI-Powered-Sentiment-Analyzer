import { useState } from "react";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../hooks/use-toast";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
import { analyzeSentiment } from "../lib/sentimentAnalysis";
import { ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import { useSentimentData } from "../contexts/SentimentDataContext";

interface AnalysisResult {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  confidence: number;
}

export default function BulkAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { sentimentData, setSentimentData } = useSentimentData();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Simple CSV parser to extract text from each row (assuming one column per row)
  const parseCSV = (text: string): string[] => {
    // Split by new lines, trim spaces, filter out empty lines
    return text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        try {
          const texts = parseCSV(text);
          if (texts.length === 0) {
            toast({
              title: "Empty CSV",
              description: "The uploaded CSV file contains no text entries.",
              variant: "destructive",
            });
            setIsAnalyzing(false);
            return;
          }
          const newResults = texts.map(text => {
            const analysis = analyzeSentiment(text);
            return {
              text,
              ...analysis
            };
          });
          setSentimentData(newResults);
          toast({
            title: "Analysis complete",
            description: `Analyzed ${newResults.length} entries successfully.`,
          });
        } catch (error) {
          toast({
            title: "Error parsing CSV",
            description: "There was an error processing the CSV file.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "File read error",
          description: "Could not read the uploaded file.",
          variant: "destructive",
        });
      }
      setIsAnalyzing(false);
    };
    reader.readAsText(file);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      case "neutral":
        return <Meh className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Bulk Analysis</h1>
          <p className="text-xl text-muted-foreground">
            Analyze multiple texts at once by uploading a CSV file
          </p>
        </header>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !file}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze File"}
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>File should be a CSV with one text entry per row.</p>
                <p>Maximum file size: 5MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {sentimentData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Text</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentimentData.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-xs truncate">
                        {result.text}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getSentimentIcon(result.sentiment)}
                          <span className="capitalize">{result.sentiment}</span>
                        </div>
                      </TableCell>
                      <TableCell>{result.score.toFixed(2)}</TableCell>
                      <TableCell>{(result.confidence * 100).toFixed(0)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
