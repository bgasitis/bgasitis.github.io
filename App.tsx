
import React, { useState, useEffect, useMemo } from 'react';
import { Verse, UserRole, Language } from './types';
import { INITIAL_VERSES } from './data/initialData';
import VerseDisplay from './components/VerseDisplay';
import Navigation from './components/Navigation';
import IndexSearchModal from './components/IndexSearchModal';
import AdminPanel from './components/AdminPanel';
import { Settings, LogIn, LogOut, Languages, Plus } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [verses, setVerses] = useState<Verse[]>(() => {
    const saved = localStorage.getItem('bg_verses');
    return saved ? JSON.parse(saved) : INITIAL_VERSES;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [role, setRole] = useState<UserRole>(UserRole.READER);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingVerse, setEditingVerse] = useState<Verse | undefined>(undefined);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('bg_verses', JSON.stringify(verses));
  }, [verses]);

  const currentVerse = verses[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % verses.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + verses.length) % verses.length);

  const handleSearch = (chapter: number, verseNum: number) => {
    const index = verses.findIndex(v => v.chapter === chapter && v.verse === verseNum);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      alert(`Verse ${chapter}.${verseNum} not found in the database.`);
    }
  };

  const handleSaveVerse = (newVerse: Verse) => {
    setVerses(prev => {
      const existingIndex = prev.findIndex(v => v.id === newVerse.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = newVerse;
        return updated;
      }
      return [...prev, newVerse].sort((a, b) => 
        a.chapter !== b.chapter ? a.chapter - b.chapter : a.verse - b.verse
      );
    });
    setIsAdminPanelOpen(false);
    setEditingVerse(undefined);
  };

  return (
    <div className="min-h-screen bg-[#E8E4C9] text-[#2D2A1E]">
      {/* Main Content Area */}
      {verses.length > 0 ? (
        <VerseDisplay 
          verse={currentVerse} 
          language={language} 
          role={role}
          onEdit={() => {
            setEditingVerse(currentVerse);
            setIsAdminPanelOpen(true);
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl serif">No verses found. Add some content as admin.</p>
        </div>
      )}

      {/* Navigation */}
      <Navigation 
        currentRef={`BG ${currentVerse?.chapter || '?'}.${currentVerse?.verse || '?'}`}
        onNext={handleNext}
        onPrev={handlePrev}
        onOpenIndex={() => setIsIndexOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenMenu={() => setIsSettingsOpen(true)}
      />

      {/* Search Modal */}
      {isIndexOpen && (
        <IndexSearchModal 
          onClose={() => setIsIndexOpen(false)} 
          onSearch={handleSearch}
        />
      )}

      {/* Admin Panel (CRUD) */}
      {isAdminPanelOpen && (
        <AdminPanel 
          verse={editingVerse}
          onSave={handleSaveVerse}
          onClose={() => {
            setIsAdminPanelOpen(false);
            setEditingVerse(undefined);
          }}
        />
      )}

      {/* Settings Panel (Role & Language Switching) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Settings className="text-red-700" /> Settings
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-black">
                Close
              </button>
            </div>

            <div className="space-y-6">
              {/* Language Switcher */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                  <Languages size={16} /> LANGUAGE
                </p>
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                  <button 
                    onClick={() => setLanguage(Language.ENGLISH)}
                    className={`flex-1 py-2 rounded-md transition-all font-medium ${language === Language.ENGLISH ? 'bg-white shadow-sm text-red-700' : 'text-gray-600'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => setLanguage(Language.NEPALI)}
                    className={`flex-1 py-2 rounded-md transition-all font-medium ${language === Language.NEPALI ? 'bg-white shadow-sm text-red-700' : 'text-gray-600'}`}
                  >
                    Nepali (नेपाली)
                  </button>
                </div>
              </div>

              {/* Role Switcher */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                  <LogIn size={16} /> APP ROLE
                </p>
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                  <button 
                    onClick={() => setRole(UserRole.READER)}
                    className={`flex-1 py-2 rounded-md transition-all font-medium ${role === UserRole.READER ? 'bg-white shadow-sm text-red-700' : 'text-gray-600'}`}
                  >
                    Reader
                  </button>
                  <button 
                    onClick={() => setRole(UserRole.ADMIN)}
                    className={`flex-1 py-2 rounded-md transition-all font-medium ${role === UserRole.ADMIN ? 'bg-white shadow-sm text-red-700' : 'text-gray-600'}`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {role === UserRole.ADMIN && (
                <button 
                  onClick={() => {
                    setIsAdminPanelOpen(true);
                    setIsSettingsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 transition-colors"
                >
                  <Plus size={20} /> Add New Verse
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
