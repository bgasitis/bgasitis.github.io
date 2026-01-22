
import React, { useState, useEffect } from 'react';
import { Verse, Language, VerseContent } from '../types';
import { X, Save } from 'lucide-react';

interface AdminPanelProps {
  verse?: Verse;
  onSave: (verse: Verse) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ verse, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Verse>>({
    chapter: 1,
    verse: 1,
    [Language.ENGLISH]: { sanskrit: '', transliteration: '', synonyms: '', translation: '', purport: '' },
    [Language.NEPALI]: { sanskrit: '', transliteration: '', synonyms: '', translation: '', purport: '' },
  });

  useEffect(() => {
    if (verse) {
      setFormData(verse);
    }
  }, [verse]);

  const updateContent = (lang: Language, field: keyof VerseContent, value: string) => {
    setFormData(prev => ({
      ...prev,
      [lang]: {
        ...(prev[lang] as VerseContent),
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    const newVerse: Verse = {
      ...formData as Verse,
      id: formData.id || `bg-${formData.chapter}-${formData.verse}`,
    };
    onSave(newVerse);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#E8E4C9] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold">{verse ? 'Edit Verse' : 'Add New Verse'}</h2>
        <div className="flex gap-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
          <button 
            onClick={handleSave}
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors"
          >
            <Save size={20} /> Save
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold mb-2">Chapter</label>
            <input 
              type="number" 
              value={formData.chapter} 
              onChange={e => setFormData({...formData, chapter: parseInt(e.target.value)})}
              className="w-full p-3 bg-white border rounded-lg"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-2">Verse</label>
            <input 
              type="number" 
              value={formData.verse} 
              onChange={e => setFormData({...formData, verse: parseInt(e.target.value)})}
              className="w-full p-3 bg-white border rounded-lg"
            />
          </div>
        </div>

        {[Language.ENGLISH, Language.NEPALI].map(lang => (
          <div key={lang} className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-bold text-red-700 uppercase">{lang} CONTENT</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Sanskrit</label>
                <textarea 
                  value={formData[lang]?.sanskrit} 
                  onChange={e => updateContent(lang, 'sanskrit', e.target.value)}
                  className="w-full p-3 bg-white border rounded-lg h-24 font-serif"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Transliteration</label>
                <textarea 
                  value={formData[lang]?.transliteration} 
                  onChange={e => updateContent(lang, 'transliteration', e.target.value)}
                  className="w-full p-3 bg-white border rounded-lg h-24 italic"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Synonyms</label>
                <textarea 
                  value={formData[lang]?.synonyms} 
                  onChange={e => updateContent(lang, 'synonyms', e.target.value)}
                  className="w-full p-3 bg-white border rounded-lg h-32"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Translation</label>
                <textarea 
                  value={formData[lang]?.translation} 
                  onChange={e => updateContent(lang, 'translation', e.target.value)}
                  className="w-full p-3 bg-white border rounded-lg h-32 font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Purport</label>
                <textarea 
                  value={formData[lang]?.purport} 
                  onChange={e => updateContent(lang, 'purport', e.target.value)}
                  className="w-full p-3 bg-white border rounded-lg h-64"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
