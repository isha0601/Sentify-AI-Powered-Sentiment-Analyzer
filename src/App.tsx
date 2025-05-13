import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import BulkAnalysis from './pages/BulkAnalysis';
import NotFound from './pages/NotFound';
// Toaster component import removed due to missing file
import { SentimentDataProvider } from "./contexts/SentimentDataContext";

function App() {
  return (
    <SentimentDataProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/bulk-analysis" element={<BulkAnalysis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Toaster component removed due to missing file */}
        </div>
      </Router>
    </SentimentDataProvider>
  );
}

export default App;
