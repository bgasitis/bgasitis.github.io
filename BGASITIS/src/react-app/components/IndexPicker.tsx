import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  onSelect: (chapter: number, verse: number) => void;
  currentChapter: number;
  currentVerse: number;
}

const IndexPicker: React.FC<Props> = ({ onClose, onSelect, currentChapter, currentVerse }) => {
  const [chapter, setChapter] = useState(currentChapter.toString());
  const [verse, setVerse] = useState(currentVerse.toString());
  const [activeField, setActiveField] = useState<'ch' | 'vs'>('ch');

  const handleKeypad = (val: string) => {
    if (activeField === 'ch') {
      setChapter(prev => prev === '0' ? val : prev + val);
    } else {
      setVerse(prev => prev === '0' ? val : prev + val);
    }
  };

  const handleClear = () => {
    if (activeField === 'ch') setChapter('');
    else setVerse('');
  };

  const handleGo = () => {
    onSelect(parseInt(chapter) || 1, parseInt(verse) || 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end animate-fade-in">
      <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
           <button onClick={onClose} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-lg font-semibold text-gray-700">Go to verse...</span>
          <div className="w-6"></div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-3xl font-bold text-gray-400">BG</span>
          <div 
            onClick={() => setActiveField('ch')}
            className={`w-20 h-16 rounded-xl flex items-center justify-center text-3xl font-bold border-4 transition-all ${activeField === 'ch' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100'}`}
          >
            {chapter || '0'}
          </div>
          <span className="text-4xl font-bold text-gray-400">.</span>
          <div 
             onClick={() => setActiveField('vs')}
            className={`w-20 h-16 rounded-xl flex items-center justify-center text-3xl font-bold border-4 transition-all ${activeField === 'vs' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100'}`}
          >
            {verse || '0'}
          </div>
          <button 
            onClick={handleGo}
            className="ml-4 w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 pb-6">
          {[1,2,3,4,5,6,7,8,9,0].map(num => (
            <button 
              key={num} 
              onClick={() => handleKeypad(num.toString())}
              className="h-16 bg-gray-100 rounded-xl text-2xl font-bold text-gray-700 hover:bg-gray-200 active:scale-95 transition-all shadow-sm"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={handleClear}
            className="h-16 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexPicker;

