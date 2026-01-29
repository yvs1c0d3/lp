import React, { useState, useEffect } from 'react';
import { FileText, RefreshCcw, ClipboardList } from 'lucide-react';
import { CounterCard } from './components/CounterCard';
import { generateInventoryPDF } from './services/pdfService';
import { InventoryState, ItemType } from './types';

const INITIAL_STATE: InventoryState = {
  [ItemType.MOLD_22]: 0,
  [ItemType.BOTTOM_22]: 0,
  [ItemType.MOLD_26]: 0,
  [ItemType.BOTTOM_26]: 0,
};

export default function App() {
  const [inventory, setInventory] = useState<InventoryState>(() => {
    const saved = localStorage.getItem('bakery_inventory');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('bakery_inventory', JSON.stringify(inventory));
  }, [inventory]);

  const updateCount = (type: ItemType, delta: number) => {
    setInventory(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const handleReset = () => {
    if (window.confirm('Czy na pewno chcesz zresetować wszystkie liczniki?')) {
      setInventory(INITIAL_STATE);
    }
  };

  const handleGeneratePDF = () => {
    generateInventoryPDF(inventory);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 safe-area-top">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <ClipboardList className="text-orange-600" size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Licznik Piekarski</h1>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Resetuj"
          >
            <RefreshCcw size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Date Display */}
        <div className="text-sm text-gray-500 font-medium text-center mb-2 capitalize">
          {new Date().toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CounterCard
            label="Forma 22cm"
            subLabel="Obręcz"
            count={inventory[ItemType.MOLD_22]}
            color="bg-blue-500"
            onIncrement={() => updateCount(ItemType.MOLD_22, 1)}
            onDecrement={() => updateCount(ItemType.MOLD_22, -1)}
          />
          <CounterCard
            label="Dno 22cm"
            subLabel="Podstawa"
            count={inventory[ItemType.BOTTOM_22]}
            color="bg-indigo-500"
            onIncrement={() => updateCount(ItemType.BOTTOM_22, 1)}
            onDecrement={() => updateCount(ItemType.BOTTOM_22, -1)}
          />
          <CounterCard
            label="Forma 26cm"
            subLabel="Obręcz"
            count={inventory[ItemType.MOLD_26]}
            color="bg-orange-500"
            onIncrement={() => updateCount(ItemType.MOLD_26, 1)}
            onDecrement={() => updateCount(ItemType.MOLD_26, -1)}
          />
          <CounterCard
            label="Dno 26cm"
            subLabel="Podstawa"
            count={inventory[ItemType.BOTTOM_26]}
            color="bg-red-500"
            onIncrement={() => updateCount(ItemType.BOTTOM_26, 1)}
            onDecrement={() => updateCount(ItemType.BOTTOM_26, -1)}
          />
        </div>
      </main>

      {/* Floating Action Buttons / Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleGeneratePDF}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl active:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
          >
            <FileText size={20} />
            <span>Pobierz PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}