import { quests } from '../data/quests';
import type { PlayerSave, Quest } from '../types/domain';
import { discoverVocabulary } from './vocabularySystem';

export function completeQuest(save: PlayerSave, quest: Quest): PlayerSave {
  if (save.completedQuests.includes(quest.id)) return save;

  const withRewards = discoverVocabulary(save, quest.vocabularyRewards);

  return {
    ...withRewards,
    xp: withRewards.xp + quest.xp,
    coins: withRewards.coins + quest.coins,
    completedQuests: [...withRewards.completedQuests, quest.id]
  };
}

export function getAvailableQuests(save: PlayerSave) {
  return quests.filter((quest) => quest.realm <= save.realm && !save.completedQuests.includes(quest.id));
}
