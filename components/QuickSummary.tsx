import React, { useState } from 'react';
import { summarizeText } from '../services/geminiService';

const QuickSummary = () => {
  const [textToSummarize, setTextToSummarize] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!textToSummarize.trim()) return;
    setIsSummarizing(true);
    setSummary('');
    setError('');
    try {
      const result = await summarizeText(textToSummarize);
      setSummary(result);
    } catch (err) {
      setError('Falha ao resumir o texto. Tente novamente.');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="bg-surface rounded-xl shadow-md p-6 sm:p-8 space-y-4 sticky top-8">
      <h3 className="text-xl font-bold text-text-primary">Resumo Rápido com IA</h3>
      <p className="text-sm text-text-secondary">Cole um texto abaixo e deixe a IA criar um resumo conciso para você.</p>
      <textarea 
        value={textToSummarize}
        onChange={(e) => setTextToSummarize(e.target.value)}
        placeholder="Cole aqui o texto que você quer resumir..."
        rows={8}
        className="block w-full px-4 py-3 bg-slate-100 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
      />
      <button 
        onClick={handleSummarize} 
        disabled={isSummarizing || !textToSummarize.trim()}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
      >
        {isSummarizing ? (
            <span className="flex items-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Resumindo...</span>
        ) : 'Resumir Texto'}
      </button>
      
      {error && <div className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}

      {summary && (
        <div className="summary-result pt-4 border-t border-border">
          <h4 className="font-semibold mb-2">Seu Resumo:</h4>
          <pre className="text-sm bg-slate-50 p-4 rounded-lg whitespace-pre-wrap font-sans">{summary}</pre>
        </div>
      )}
    </div>
  );
};

export default QuickSummary;