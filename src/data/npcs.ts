import type { Npc } from '../types/domain';

export const npcs: Npc[] = [
  {
    id: 'sifu-chen',
    name: 'Sifu Chen',
    hanziName: '陈师父',
    role: 'Mestre principal',
    personality: 'Firme, paciente e poético. Corrige sem humilhar.',
    greeting: 'Discípula, hoje treinamos o ouvido, a respiração e o punho.'
  },
  {
    id: 'wen-bo',
    name: 'Wen Bo',
    hanziName: '文博',
    role: 'Bibliotecário',
    personality: 'Erudito confuciano, formal e meticuloso.',
    greeting: 'Uma palavra aprendida sem contexto é uma folha sem raiz.'
  },
  {
    id: 'hua-lan',
    name: 'Hua Lan',
    hanziName: '花岚',
    role: 'Mestra dos tons',
    personality: 'Intensa, elegante e direta.',
    greeting: 'Se o tom cai, a intenção cai junto. De novo.'
  },
  {
    id: 'po-po',
    name: 'Po Po',
    hanziName: '婆婆',
    role: 'Contadora de histórias',
    personality: 'Calorosa, divertida e misteriosa.',
    greeting: 'Toda lenda começa quando alguém escuta com atenção.'
  }
];
