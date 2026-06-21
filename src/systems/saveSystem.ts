import type { PlayerSave } from '../types/domain';

const SAVE_KEY = 'matsuri-academy-save-v1';

export const defaultSave: PlayerSave = {
  version: 1,
  realm: 1,
  xp: 0,
  coins: 0,
  streakDays: 0,
  discoveredVocabulary: [],
  completedQuests: [],
  mascot: {
    family: 'jade-fox',
    stage: 0,
    name: 'Guardião'
  },
  updatedAt: new Date().toISOString()
};

export function loadSave(): PlayerSave {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return defaultSave;

  try {
    return { ...defaultSave, ...JSON.parse(raw) };
  } catch {
    return defaultSave;
  }
}

export function saveGame(save: PlayerSave) {
  const next = { ...save, updatedAt: new Date().toISOString() };
  localStorage.setItem(SAVE_KEY, JSON.stringify(next));
  return next;
}

export function resetSave() {
  localStorage.removeItem(SAVE_KEY);
  return defaultSave;
}
