import type { Quest } from '../types/domain';

export const quests: Quest[] = [
  {
    id: 'daily-first-punch',
    title: 'O Primeiro Punho',
    description: 'Treine 20 socos lentos. Ao final, desbloqueie 拳 quán e 打 dǎ.',
    type: 'physical',
    realm: 1,
    xp: 30,
    coins: 10,
    vocabularyRewards: ['quan', 'da'],
    completionText: 'Seu punho encontrou intenção. 拳 entrou na sua biblioteca.'
  },
  {
    id: 'tones-at-the-gate',
    title: 'Os Tons do Portão',
    description: 'Escolha a saudação correta para entrar na academia.',
    type: 'language',
    realm: 1,
    xp: 25,
    coins: 8,
    vocabularyRewards: ['nihao', 'shifu'],
    completionText: 'O guarda abre o portão. O som correto também é uma chave.'
  },
  {
    id: 'stance-five-minutes',
    title: 'Raiz no Pátio',
    description: 'Mantenha uma postura confortável por 5 minutos, sem forçar joelhos ou lombar.',
    type: 'physical',
    realm: 1,
    xp: 40,
    coins: 12,
    vocabularyRewards: ['jiao', 'qian', 'hou'],
    completionText: 'A base começa nos pés. A mente começa na respiração.'
  },
  {
    id: 'left-right-bamboo',
    title: 'Bambu à Esquerda, Pedra à Direita',
    description: 'Reconheça 左 e 右 no caminho da floresta.',
    type: 'language',
    realm: 1,
    xp: 20,
    coins: 6,
    vocabularyRewards: ['zuo', 'you'],
    completionText: 'Você não traduziu. Você se moveu pelo significado.'
  }
];

export function getDailyQuest(date = new Date()) {
  const index = date.getDate() % quests.length;
  return quests[index];
}
