import type { RealmId } from '../types/domain';

export const realms: Array<{
  id: RealmId;
  name: string;
  mandarin: string[];
  kungFu: string[];
  vocabularyGoal: number;
}> = [
  { id: 1, name: 'Discípulo Iniciante', mandarin: ['Pinyin', 'Tons', 'Saudações', 'Números', 'Família', 'Objetos'], kungFu: ['Posturas básicas', 'Bases', 'Guarda', 'Deslocamentos'], vocabularyGoal: 150 },
  { id: 2, name: 'Refinamento do Corpo', mandarin: ['Frases simples', 'Rotina', 'Perguntas'], kungFu: ['Golpes básicos', 'Combinações', 'Primeiras aplicações'], vocabularyGoal: 500 },
  { id: 3, name: 'Refinamento da Técnica', mandarin: ['Conversação simples', 'Histórias graduadas'], kungFu: ['Primeiros Taolu', 'Aplicações práticas'], vocabularyGoal: 1000 },
  { id: 4, name: 'Fundação Marcial', mandarin: ['Narrativas', 'Diálogos naturais'], kungFu: ['Formas intermediárias', 'Estratégia'], vocabularyGoal: 2000 },
  { id: 5, name: 'Núcleo Dourado', mandarin: ['Leitura avançada'], kungFu: ['Aplicações complexas', 'Didática'], vocabularyGoal: 4000 },
  { id: 6, name: 'Mestre de Clã', mandarin: ['Fluência funcional'], kungFu: ['Domínio técnico'], vocabularyGoal: 6000 }
];
