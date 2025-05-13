// This is a simple mock for sentiment analysis
// In a real application, this would use a machine learning model or API

// Simple word lists for demonstration
const positiveWords = [
  "good", "great", "excellent", "awesome", "amazing", "love", "happy", "best", "wonderful",
  "nice", "perfect", "fantastic", "beautiful", "joy", "pleasure", "better", "improved",
  "positive", "impressive", "recommended", "thanks", "thank", "appreciated", "fan"
];

const negativeWords = [
  "bad", "terrible", "awful", "horrible", "hate", "worst", "poor", "disappointing",
  "disappointed", "useless", "annoying", "rubbish", "waste", "sad", "angry", "dislike",
  "failure", "problem", "difficult", "negative", "unfortunately", "regret", "broken",
  // Adding anxiety and fear-related words
  "scared", "afraid", "fear", "worried", "anxious", "nervous", "stress", "stressed",
  "scary", "frightened", "terrified", "dread", "panic", "horror", "concern", "concerned",
  "exam", "test", "assessment" // Often associated with stress in context
];

export function analyzeSentiment(text: string) {
  const words = text.toLowerCase().match(/\b[\w']+\b/g) || [];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveCount++;
    }
    if (negativeWords.includes(word)) {
      negativeCount++;
    }
  });
  
  const totalWords = words.length;
  // Prevent division by zero for empty strings
  const positiveScore = totalWords > 0 ? positiveCount / totalWords : 0;
  const negativeScore = totalWords > 0 ? negativeCount / totalWords : 0;
  
  // Calculate sentiment score between -1 and 1
  const score = positiveScore - negativeScore;
  
  // Adjusted thresholds to be more sensitive to negative emotions
  let sentiment: "positive" | "negative" | "neutral";
  if (score > 0.05) {
    sentiment = "positive";
  } else if (score < -0.02) { // More sensitive threshold for negative sentiment
    sentiment = "negative";
  } else {
    sentiment = "neutral";
  }
  
  // Calculate confidence - higher when the absolute score is further from zero
  const confidence = Math.min(0.95, Math.abs(score) * 5 + 0.5);
  
  return {
    sentiment,
    score,
    confidence,
  };
}

export function generateMockSentimentData() {
  return [
    { category: "Positive", count: Math.floor(Math.random() * 50) + 30, color: "#10b981" },
    { category: "Neutral", count: Math.floor(Math.random() * 40) + 20, color: "#6b7280" },
    { category: "Negative", count: Math.floor(Math.random() * 30) + 10, color: "#ef4444" },
  ];
}
