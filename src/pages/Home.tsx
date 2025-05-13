
import Navbar from "@/components/Navbar";
import SentimentAnalyzer from "@/components/SentimentAnalyzer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Sentify</h1>
          <p className="text-xl text-muted-foreground">
            AI-Powered Sentiment Analysis Tool
          </p>
        </header>
        
        <section className="max-w-3xl mx-auto">
          <SentimentAnalyzer />
        </section>
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Enter your text above to analyze its sentiment in real-time.</p>
        </footer>
      </main>
    </div>
  );
}
