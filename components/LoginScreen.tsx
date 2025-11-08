import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { generateMeme } from '../services/geminiService';
import { FocaListLogo } from './icons';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const { login } = useAppContext();
  const [memeUrl, setMemeUrl] = useState('');
  const [isGeneratingMeme, setIsGeneratingMeme] = useState(true);

  useEffect(() => {
    const fetchMeme = async () => {
        setIsGeneratingMeme(true);
        const url = await generateMeme();
        setMemeUrl(url);
        setIsGeneratingMeme(false);
    };
    fetchMeme();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-xl shadow-xl p-8">
            <div className="flex flex-col items-center mb-6">
                <FocaListLogo />
                <h1 className="text-3xl font-bold text-text-primary mt-4">Bem-vindo ao FocaList!</h1>
                <p className="text-text-secondary mt-2">Seu parceiro de estudos inteligente.</p>
            </div>
          
            <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                {isGeneratingMeme ? (
                    <div className="spinner"></div>
                ) : (
                    <img src={memeUrl} alt="Meme de estudante gerado por IA" className="w-full h-full object-cover" />
                )}
            </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Seu nome</label>
              <input 
                id="name"
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?" 
                className="mt-1 block w-full px-4 py-3 bg-slate-100 border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={!name.trim()}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Começar a Focar
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-text-secondary mt-6">Feito para estudantes, por estudantes (e uma IA legal).</p>
      </div>
    </div>
  );
};

export default LoginScreen;