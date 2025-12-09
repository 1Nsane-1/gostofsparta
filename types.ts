export interface Weapon {
  id: string;
  name: string;
  description: string;
  element: 'ice' | 'fire' | 'wind';
  image: string;
}

export interface Realm {
  id: string;
  name: string;
  description: string;
  runeChar: string;
}

export enum Section {
  HERO = 'hero',
  LORE = 'lore',
  WEAPONS = 'weapons',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}