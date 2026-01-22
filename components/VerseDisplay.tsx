
import React from 'react';
import { Verse, Language, UserRole } from '../types';
import { Share2, Star, Edit3 } from 'lucide-react';

interface VerseDisplayProps {
  verse: Verse;
  language: Language;
  role: UserRole;
  onEdit: () => void;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse, language, role, onEdit }) => {
  const content = verse[language];
  const header = `BG ${verse.chapter}.${verse.verse}`;

  return (
    <div className="flex flex-col p-4 pb-24 max-w-2xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold serif tracking-tight text-[#2D2A1E]">{header}</h1>
        <div className="flex gap-4 text-red-700">
          {role === UserRole.ADMIN && (
            <button onClick={onEdit} className="p-1 hover:bg-black/5 rounded-full transition-colors">
              <Edit3 size={24} />
            </button>
          )}
          <button className="p-1 hover:bg-black/5 rounded-full transition-colors">
            <Share2 size={24} />
          </button>
          <button className="p-1 hover:bg-black/5 rounded-full transition-colors">
            <Star size={24} />
          </button>
        </div>
      </div>

      <div className="space-y-8 text-[#2D2A1E]">
        <div className="text-center space-y-4">
          <p className="text-xl font-medium serif leading-relaxed whitespace-pre-wrap">
            {content.sanskrit}
          </p>
          <p className="text-lg italic serif leading-relaxed whitespace-pre-wrap">
            {content.transliteration}
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold serif mb-3">Synonyms</h2>
          <p className="text-lg leading-relaxed">{content.synonyms}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold serif mb-3">Translation</h2>
          <p className="text-lg leading-relaxed font-semibold">{content.translation}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold serif mb-3">Purport</h2>
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{content.purport}</p>
        </section>
      </div>
    </div>
  );
};

export default VerseDisplay;
