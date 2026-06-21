import { findVocabularyById, vocabulary } from '../data/vocabulary';
import type { PlayerSave } from '../types/domain';

export function discoverVocabulary(save: PlayerSave, ids: string[]): PlayerSave {
  const validIds = ids.filter((id) => findVocabularyById(id));
  const discoveredVocabulary = Array.from(new Set([...save.discoveredVocabulary, ...validIds]));
  return { ...save, discoveredVocabulary };
}

export function getDiscoveredTerms(save: PlayerSave) {
  return vocabulary.filter((term) => save.discoveredVocabulary.includes(term.id));
}

export function getVocabularyProgress(save: PlayerSave) {
  return {
    discovered: save.discoveredVocabulary.length,
    totalAvailable: vocabulary.length,
    percentage: Math.round((save.discoveredVocabulary.length / vocabulary.length) * 100)
  };
}
