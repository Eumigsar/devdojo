import type { PlayerSave } from '../types/domain';

export function calculateMascotStage(save: PlayerSave) {
  const score = save.discoveredVocabulary.length + save.streakDays * 2 + Math.floor(save.xp / 100);
  return Math.min(5, Math.floor(score / 10));
}

export function refreshMascot(save: PlayerSave): PlayerSave {
  return {
    ...save,
    mascot: {
      ...save.mascot,
      stage: calculateMascotStage(save)
    }
  };
}
