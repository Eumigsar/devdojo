import type { Location } from '../types/domain';

export const locations: Location[] = [
  {
    id: 'main-academy',
    name: 'Academia Principal',
    description: 'Pátio central onde discípulos treinam bases, saudações e disciplina.',
    teaches: ['saudações', 'tons', 'posturas', 'vocabulário marcial']
  },
  {
    id: 'hanzi-library',
    name: 'Biblioteca de Hanzi',
    description: 'Cada palavra descoberta se materializa como um pergaminho vivo.',
    teaches: ['leitura', 'radicais', 'vocabulário vivo'],
    unlockRequirement: 'Descobrir 10 palavras'
  },
  {
    id: 'bamboo-forest',
    name: 'Floresta de Bambu',
    description: 'Local de treino de direções, escuta e movimento.',
    teaches: ['前', '后', '左', '右', 'escuta contextual'],
    unlockRequirement: 'Completar Os Tons do Portão'
  },
  {
    id: 'mountain-temple',
    name: 'Templo da Montanha',
    description: 'Área de cultura, filosofia e histórias graduadas.',
    teaches: ['filosofia', 'histórias', 'cultura chinesa'],
    unlockRequirement: 'Reino 2'
  }
];
