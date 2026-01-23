
export enum UserRole {
  READER = 'READER',
  ADMIN = 'ADMIN'
}

export enum Language {
  ENGLISH = 'ENGLISH',
  NEPALI = 'NEPALI'
}

export interface VerseContent {
  sanskrit: string;
  transliteration: string;
  synonyms: string;
  translation: string;
  purport: string;
}

export interface Verse {
  id: string;
  canto?: number; // Optional for Bhagavad Gita, usually for SB
  chapter: number;
  verse: number;
  [Language.ENGLISH]: VerseContent;
  [Language.NEPALI]: VerseContent;
}

export interface AppState {
  currentVerseIndex: number;
  role: UserRole;
  language: Language;
}
