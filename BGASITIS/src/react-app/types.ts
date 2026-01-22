export enum UserRole {
  ADMIN = 'ADMIN',
  READER = 'READER'
}

export enum Language {
  ENGLISH = 'EN',
  NEPALI = 'NP'
}

export interface Verse {
  id: string;
  chapter: number;
  verseNumber: number;
  title: string;
  sanskrit: string;
  transliteration: string;
  synonyms: string;
  translationEn: string;
  translationNp: string;
  purportEn: string;
  purportNp: string;
}

export interface AppState {
  currentVerseId: string;
  role: UserRole;
  language: Language;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

