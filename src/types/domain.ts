export type RealmId = 1 | 2 | 3 | 4 | 5 | 6;

export type VocabularyCategory =
  | 'body'
  | 'direction'
  | 'action'
  | 'martial_concept'
  | 'greeting'
  | 'number'
  | 'object'
  | 'culture';

export type VocabularyTerm = {
  id: string;
  hanzi: string;
  pinyin: string;
  portuguese: string;
  category: VocabularyCategory;
  realm: RealmId;
  hskLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  discoveredIn: string;
  example?: string;
};

export type QuestType = 'language' | 'physical' | 'culture' | 'taolu' | 'story';

export type Quest = {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  realm: RealmId;
  xp: number;
  coins: number;
  vocabularyRewards: string[];
  completionText: string;
};

export type PlayerSave = {
  version: number;
  realm: RealmId;
  xp: number;
  coins: number;
  streakDays: number;
  discoveredVocabulary: string[];
  completedQuests: string[];
  mascot: {
    family: string;
    stage: number;
    name: string;
  };
  updatedAt: string;
};

export type Npc = {
  id: string;
  name: string;
  hanziName?: string;
  role: string;
  personality: string;
  greeting: string;
};

export type Location = {
  id: string;
  name: string;
  description: string;
  teaches: string[];
  unlockRequirement?: string;
};
