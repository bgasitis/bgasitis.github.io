import React from 'react';
import { Verse, Language } from '../types';

interface Props {
  verse: Verse;
  language: Language;
}

const VerseView: React.FC<Props> = ({ verse, language }) => {
  return (
    <div className="p-6 pb-24 overflow-y-auto max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brown-900 serif">{verse.title}</h1>
        <div className="flex gap-4">
           <button className="text-red-500 hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="text-red-500 hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-8 text-center bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-100">
        <pre className="whitespace-pre-wrap text-xl font-semibold serif mb-4 text-brown-800 leading-relaxed">
          {verse.sanskrit}
        </pre>
        <p className="italic text-gray-700 italic serif leading-relaxed">
          {verse.transliteration}
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 border-b border-brown-200 pb-1">Synonyms</h2>
        <p className="text-gray-800 leading-relaxed text-lg">
          {verse.synonyms}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 border-b border-brown-200 pb-1">Translation</h2>
        <p className="text-gray-900 leading-relaxed text-xl serif">
          {language === Language.ENGLISH ? verse.translationEn : verse.translationNp}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 border-b border-brown-200 pb-1">Purport</h2>
        <p className="text-gray-800 leading-relaxed text-lg">
          {language === Language.ENGLISH ? verse.purportEn : verse.purportNp}
        </p>
      </section>
    </div>
  );
};

export default VerseView;

