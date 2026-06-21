import { getDailyQuest } from '../data/quests';

export function getTodayMission() {
  return getDailyQuest(new Date());
}

export function getDailyResetLabel() {
  return 'A missão muda à meia-noite do horário local.';
}
