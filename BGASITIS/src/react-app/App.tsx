import React, { useState, useEffect } from 'react';
import { UserRole, Language, Verse } from './types';
import { INITIAL_VERSES } from './constants';
import VerseView from './components/VerseView';
import IndexPicker from './components/IndexPicker';
import AdminPanel from './components/AdminPanel';
import ChatBot from './components/ChatBot';

const STORAGE_KEY = 'bhagavad_gita_verses_data';

const App: React.FC = () => {
  const [verses, setVerses] = useState<Verse[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_VERSES;
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [role, setRole] = useState<UserRole>(UserRole.READER);
  const [language, setLanguage] = useState<Language>(Language.NEPALI);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(verses));
  }, [verses]);

  const toggleLanguage = () => setLanguage(l => l === Language.ENGLISH ? Language.NEPALI : Language.ENGLISH);

  const currentVerse = verses[currentIndex];

  const handleNext = () => {
    if (currentIndex < verses.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const onSelectVerse = (chapter: number, verseNum: number) => {
    const idx = verses.findIndex(v => v.chapter === chapter && v.verseNumber === verseNum);
    if (idx !== -1) {
      setCurrentIndex(idx);
    } else {
      alert("Verse not found in database.");
    }
    setIsPickerOpen(false);
    setIsChatOpen(false);
  };

  const handleAddVerse = (v: Verse) => {
    setVerses(prev => [...prev, v]);
    alert("Verse added and saved to device!");
  };

  const handleUpdateVerse = (updatedVerse: Verse) => {
    setVerses(prev => prev.map(v => v.id === updatedVerse.id ? updatedVerse : v));
    alert("Verse updated and saved!");
  };

  const handleDeleteVerse = (id: string) => {
    if (confirm("Are you sure you want to delete this verse?")) {
      setVerses(prev => {
        const filtered = prev.filter(v => v.id !== id);
        if (currentIndex >= filtered.length) setCurrentIndex(Math.max(0, filtered.length - 1));
        return filtered;
      });
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#FDF6E3] safe-area-inset">
      <div className="fixed top-0 right-0 p-4 z-[60] opacity-0 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setRole(role === UserRole.ADMIN ? UserRole.READER : UserRole.ADMIN)}
          className="bg-brown-900/10 p-2 rounded text-[10px] text-brown-900"
        >
          {role === UserRole.ADMIN ? 'Log Out Admin' : 'Admin Login'}
        </button>
      </div>

      <main className="flex-1 overflow-y-auto pt-16">
        {currentVerse ? (
          <VerseView verse={currentVerse} language={language} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 p-10 text-center">
            <p className="mb-4">No verses available on this device.</p>
            {role === UserRole.ADMIN && (
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="bg-brown-700 text-white px-6 py-2 rounded-full font-bold"
              >
                Add Your First Verse
              </button>
            )}
          </div>
        )}
      </main>

      <button 
        onClick={toggleLanguage}
        className="fixed top-6 left-6 z-40 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg text-sm font-bold border border-brown-100 flex items-center gap-2 active:scale-95 transition-all"
      >
        <span className="text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        </span>
        {language === Language.ENGLISH ? 'English' : 'नेपाली'}
      </button>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-28 right-6 w-16 h-16 bg-gradient-to-tr from-orange-600 to-yellow-500 rounded-full shadow-2xl flex items-center justify-center text-white z-40 animate-pulse active:scale-90 transition-all border-4 border-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brown-50 px-6 pt-4 pb-8 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.08)] z-50 rounded-t-[40px] max-w-2xl mx-auto">
        <button onClick={() => setIsPickerOpen(true)} className="p-3 text-brown-400 hover:text-brown-700 active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        {role === UserRole.ADMIN && (
          <button onClick={() => setIsAdminOpen(true)} className="p-3 text-orange-600 bg-orange-50 rounded-full active:scale-90 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}

        <div 
          onClick={() => setIsPickerOpen(true)}
          className="flex items-center gap-2 bg-brown-50 px-5 py-2.5 rounded-full cursor-pointer hover:bg-brown-100 transition-colors border border-brown-100 shadow-inner"
        >
          <span className="font-bold text-brown-800 serif text-lg">{currentVerse?.title || 'Index'}</span>
        </div>

        <div className="flex gap-2">
          <button 
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className={`p-3 rounded-full transition-all active:scale-75 ${currentIndex === 0 ? 'text-gray-200' : 'text-brown-700 bg-brown-50'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            disabled={currentIndex === verses.length - 1}
            onClick={handleNext}
            className={`p-3 rounded-full transition-all active:scale-75 ${currentIndex === verses.length - 1 ? 'text-gray-200' : 'text-brown-700 bg-brown-50'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>

      {isPickerOpen && (
        <IndexPicker 
          currentChapter={currentVerse?.chapter || 1}
          currentVerse={currentVerse?.verseNumber || 1}
          onClose={() => setIsPickerOpen(false)}
          onSelect={onSelectVerse}
        />
      )}

      {isAdminOpen && (
        <AdminPanel 
          verses={verses}
          onAdd={handleAddVerse}
          onUpdate={handleUpdateVerse}
          onDelete={handleDeleteVerse}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {isChatOpen && (
        <ChatBot
          language={language}
          onClose={() => setIsChatOpen(false)}
          onNavigateToVerse={onSelectVerse}
        />
      )}
    </div>
  );
};

export default App;

