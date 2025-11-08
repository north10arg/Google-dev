import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ShopItem } from '../types';
import { CoinIcon } from './icons';

interface ShopModalProps {
    onClose: () => void;
}

// Dummy data - in a real app this would come from a backend or config
const shopItems: ShopItem[] = [
    { id: 'bg1', name: 'Fundo "Noite Estrelada"', cost: 50, type: 'background', value: 'https://images.unsplash.com/photo-1472552944129-b035e9ea3744' },
    { id: 'bg2', name: 'Fundo "Biblioteca Aconchegante"', cost: 75, type: 'background', value: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da' },
    { id: 'sound1', name: 'Som de Chuva na Janela', cost: 30, type: 'sound', value: '/path/to/rain.mp3' },
    { id: 'sound2', name: 'Som de Lareira', cost: 30, type: 'sound', value: '/path/to/fireplace.mp3' },
];

const ShopModal = ({ onClose }: ShopModalProps) => {
    const { coins, spendCoins } = useAppContext();
    
    const handlePurchase = (item: ShopItem) => {
        if (coins >= item.cost) {
            spendCoins(item.cost);
            alert(`Você comprou ${item.name}!`);
            // In a real app, you would apply the item, e.g.,:
            // if (item.type === 'background') { document.body.style.backgroundImage = `url(${item.value})`; }
        } else {
            alert('Moedas insuficientes!');
        }
    };
    
    return (
        <div 
            className="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div 
                className="modal-content bg-surface rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-text-primary">Loja de Recompensas</h2>
                    <button 
                        onClick={onClose} 
                        className="text-text-secondary hover:text-text-primary text-3xl font-bold leading-none p-1 -mr-2"
                        aria-label="Fechar loja"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="flex justify-between items-center bg-amber-100 p-4 rounded-lg mb-6">
                        <span className="font-semibold text-amber-800">Suas Moedas:</span>
                        <div className="flex items-center gap-2 text-xl font-bold text-amber-900">
                            <CoinIcon className="text-amber-500" />
                            <span>{coins}</span>
                        </div>
                    </div>
                    
                    <ul className="space-y-4">
                        {shopItems.map(item => (
                            <li key={item.id} className="bg-slate-50 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-text-primary">{item.name}</p>
                                    <p className="text-sm text-text-secondary">Custo: {item.cost} moedas</p>
                                </div>
                                <button 
                                  onClick={() => handlePurchase(item)} 
                                  disabled={coins < item.cost}
                                  className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
                                >
                                    <CoinIcon className="text-amber-300" />
                                    <span>Comprar</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="p-6 border-t border-border text-center text-sm text-text-secondary">
                    <p>Continue focando para ganhar mais moedas!</p>
                </div>
            </div>
        </div>
    );
};

export default ShopModal;
