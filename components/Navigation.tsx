
import React from 'react';
import { Menu, Settings, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

interface NavigationProps {
  currentRef: string;
  onPrev: () => void;
  onNext: () => void;
  onOpenIndex: () => void;
  onOpenSettings: () => void;
  onOpenMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentRef, 
  onPrev, 
  onNext, 
  onOpenIndex, 
  onOpenSettings, 
  onOpenMenu 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-6">
        <button onClick={onOpenMenu} className="text-gray-600 hover:text-black transition-colors">
          <Menu size={24} />
        </button>
        <button onClick={onOpenSettings} className="text-gray-600 hover:text-black transition-colors">
          <Settings size={24} />
        </button>
      </div>

      <button 
        onClick={onOpenIndex}
        className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 active:scale-95 transition-all"
      >
        <LayoutGrid size={20} className="text-red-700" />
        <span className="font-bold text-lg text-[#2D2A1E]">{currentRef}</span>
      </button>

      <div className="flex items-center gap-4">
        <button 
          onClick={onPrev}
          className="p-2 text-red-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={onNext}
          className="p-2 text-red-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
