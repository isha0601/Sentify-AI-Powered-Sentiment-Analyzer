import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnalysisResult {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  confidence: number;
}

interface SentimentDataContextType {
  sentimentData: AnalysisResult[];
  setSentimentData: (data: AnalysisResult[]) => void;
}

const SentimentDataContext = createContext<SentimentDataContextType | undefined>(undefined);

export const SentimentDataProvider = ({ children }: { children: ReactNode }) => {
  const [sentimentData, setSentimentData] = useState<AnalysisResult[]>([]);

  return (
    <SentimentDataContext.Provider value={{ sentimentData, setSentimentData }}>
      {children}
    </SentimentDataContext.Provider>
  );
};

export const useSentimentData = (): SentimentDataContextType => {
  const context = useContext(SentimentDataContext);
  if (!context) {
    throw new Error("useSentimentData must be used within a SentimentDataProvider");
  }
  return context;
};
