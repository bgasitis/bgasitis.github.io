
import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface IndexSearchModalProps {
  onClose: () => void;
  onSearch: (chapter: number, verse: number) => void;
}

const IndexSearchModal: React.FC<IndexSearchModalProps> = ({ onClose, onSearch }) => {
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');

  const handleSearch = () => {
    if (chapter && verse) {
      onSearch(parseInt(chapter), parseInt(verse));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 mb-0 sm:mb-20 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-red-600">
            <X size={24} />
          </button>
          <h2 className="text-xl font-semibold">Go to verse...</h2>
          <div className="w-6" /> {/* Spacer */}
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-3xl font-bold serif text-gray-800">BG</span>
          
          <div className="flex items-center bg-[#E8E4C9]/40 p-2 rounded-xl border border-gray-200">
            <input
              type="number"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="00"
              className="w-16 h-12 text-center text-2xl font-bold bg-[#E1DDA4] rounded-lg outline-none border-b-2 border-transparent focus:border-red-700 transition-colors"
            />
            <span className="px-2 text-2xl font-bold">.</span>
            <input
              type="number"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              placeholder="00"
              className="w-16 h-12 text-center text-2xl font-bold bg-[#E1DDA4] rounded-lg outline-none border-b-2 border-transparent focus:border-red-700 transition-colors"
            />
          </div>

          <button 
            onClick={handleSearch}
            className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 transition-colors shadow-md active:scale-95"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Mock Keypad Hint */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
            <button
              key={num}
              onClick={() => {
                if (num === '.') return;
                if (chapter.length < 2) setChapter(prev => prev + num);
                else setVerse(prev => prev + num);
              }}
              className="h-14 flex items-center justify-center text-xl font-semibold bg-gray-50 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={() => {
              if (verse) setVerse('');
              else setChapter('');
            }}
            className="h-14 flex items-center justify-center text-xl font-semibold bg-gray-50 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors text-red-500"
          >
            Del
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexSearchModal;
