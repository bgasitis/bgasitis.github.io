import React, { useState } from 'react';
import { Verse, Language } from '../types';

interface Props {
  verses: Verse[];
  onAdd: (verse: Verse) => void;
  onUpdate: (verse: Verse) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<Props> = ({ verses, onAdd, onUpdate, onDelete, onClose }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Verse>>({
    chapter: 1,
    verseNumber: 1,
    sanskrit: '',
    transliteration: '',
    synonyms: '',
    translationEn: '',
    translationNp: '',
    purportEn: '',
    purportNp: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVerse: Verse = {
      ...formData as Verse,
      id: editingId || `bg-${formData.chapter}-${formData.verseNumber}-${Date.now()}`,
      title: `BG ${formData.chapter}.${formData.verseNumber}`
    };

    if (editingId) {
      onUpdate(newVerse);
    } else {
      onAdd(newVerse);
    }
    setEditingId(null);
    setFormData({ chapter: 1, verseNumber: 1 });
  };

  const handleEdit = (v: Verse) => {
    setEditingId(v.id);
    setFormData(v);
  };

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-xl mb-8 space-y-4">
        <h3 className="font-bold text-lg">{editingId ? 'Edit Verse' : 'Add New Verse'}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="number" placeholder="Chapter" 
            className="p-2 border rounded" value={formData.chapter}
            onChange={e => setFormData({...formData, chapter: parseInt(e.target.value)})}
          />
          <input 
            type="number" placeholder="Verse" 
            className="p-2 border rounded" value={formData.verseNumber}
            onChange={e => setFormData({...formData, verseNumber: parseInt(e.target.value)})}
          />
        </div>
        <textarea 
          placeholder="Sanskrit" className="w-full p-2 border rounded"
          value={formData.sanskrit} onChange={e => setFormData({...formData, sanskrit: e.target.value})}
        />
        <textarea 
          placeholder="Transliteration" className="w-full p-2 border rounded"
          value={formData.transliteration} onChange={e => setFormData({...formData, transliteration: e.target.value})}
        />
        <textarea 
          placeholder="Synonyms" className="w-full p-2 border rounded"
          value={formData.synonyms} onChange={e => setFormData({...formData, synonyms: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4">
          <textarea 
            placeholder="Translation (EN)" className="p-2 border rounded"
            value={formData.translationEn} onChange={e => setFormData({...formData, translationEn: e.target.value})}
          />
          <textarea 
            placeholder="Translation (NP)" className="p-2 border rounded"
            value={formData.translationNp} onChange={e => setFormData({...formData, translationNp: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <textarea 
            placeholder="Purport (EN)" className="p-2 border rounded"
            value={formData.purportEn} onChange={e => setFormData({...formData, purportEn: e.target.value})}
          />
          <textarea 
            placeholder="Purport (NP)" className="p-2 border rounded"
            value={formData.purportNp} onChange={e => setFormData({...formData, purportNp: e.target.value})}
          />
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold shadow-lg">
          {editingId ? 'Update Verse' : 'Save Verse'}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Manage Content</h3>
        {verses.map(v => (
          <div key={v.id} className="p-4 border rounded-xl flex justify-between items-center">
            <div>
              <p className="font-bold">{v.title}</p>
              <p className="text-sm text-gray-500 truncate max-w-xs">{v.translationEn}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(v)} className="p-2 text-blue-600">Edit</button>
              <button onClick={() => onDelete(v.id)} className="p-2 text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;

