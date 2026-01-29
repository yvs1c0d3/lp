import React, { useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';

interface CounterCardProps {
  label: string;
  subLabel: string;
  count: number;
  color: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const CounterCard: React.FC<CounterCardProps> = ({
  label,
  subLabel,
  count,
  color,
  onIncrement,
  onDecrement
}) => {
  
  // Prevent long press selection on mobile
  const preventSelect = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative colored bar */}
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 leading-tight">{label}</h3>
        <p className="text-sm text-gray-500 font-medium">{subLabel}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={onDecrement}
          disabled={count <= 0}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-30 disabled:active:scale-100 ${
            count <= 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Decrease count"
        >
          <Minus size={24} strokeWidth={2.5} />
        </button>

        <span className="text-3xl font-bold text-gray-900 tabular-nums select-none">
          {count}
        </span>

        <button
          onClick={onIncrement}
          // Using onTouchStart/onMouseDown pattern for responsiveness is good, but simple onClick works well with React 18
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all active:scale-95 text-white shadow-md ${color.replace('bg-', 'bg-').replace('500', '600')} hover:opacity-90`}
          style={{ backgroundColor: 'currentColor' }} 
          aria-label="Increase count"
        >
          <div className={`${color} w-full h-full rounded-xl flex items-center justify-center`}>
             <Plus size={24} strokeWidth={2.5} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};