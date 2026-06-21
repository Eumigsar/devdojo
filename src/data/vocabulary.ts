import type { VocabularyTerm } from '../types/domain';

export const vocabulary: VocabularyTerm[] = [
  { id: 'nihao', hanzi: '你好', pinyin: 'nǐ hǎo', portuguese: 'olá', category: 'greeting', realm: 1, hskLevel: 1, discoveredIn: 'Portão da Academia', example: '师父，你好！' },
  { id: 'xiexie', hanzi: '谢谢', pinyin: 'xièxie', portuguese: 'obrigado(a)', category: 'greeting', realm: 1, hskLevel: 1, discoveredIn: 'Primeira conversa', example: '谢谢，师父。' },
  { id: 'shifu', hanzi: '师父', pinyin: 'shīfu', portuguese: 'mestre / sifu', category: 'martial_concept', realm: 1, discoveredIn: 'Salão do Mestre', example: '师父教我功夫。' },
  { id: 'tudi', hanzi: '徒弟', pinyin: 'túdì', portuguese: 'discípulo', category: 'martial_concept', realm: 1, discoveredIn: 'Juramento inicial', example: '我是徒弟。' },
  { id: 'gongfu', hanzi: '功夫', pinyin: 'gōngfu', portuguese: 'kung fu / habilidade cultivada', category: 'martial_concept', realm: 1, discoveredIn: 'Chegada à Academia' },
  { id: 'quan', hanzi: '拳', pinyin: 'quán', portuguese: 'punho', category: 'martial_concept', realm: 1, hskLevel: 3, discoveredIn: 'O Primeiro Punho' },
  { id: 'shou', hanzi: '手', pinyin: 'shǒu', portuguese: 'mão', category: 'body', realm: 1, hskLevel: 1, discoveredIn: 'Primeira Guarda' },
  { id: 'jiao', hanzi: '脚', pinyin: 'jiǎo', portuguese: 'pé', category: 'body', realm: 1, hskLevel: 2, discoveredIn: 'Primeira Base' },
  { id: 'tou', hanzi: '头', pinyin: 'tóu', portuguese: 'cabeça', category: 'body', realm: 1, hskLevel: 2, discoveredIn: 'Treino do Corpo' },
  { id: 'yan', hanzi: '眼', pinyin: 'yǎn', portuguese: 'olho', category: 'body', realm: 1, hskLevel: 2, discoveredIn: 'Treino do Corpo' },
  { id: 'zhou', hanzi: '肘', pinyin: 'zhǒu', portuguese: 'cotovelo', category: 'body', realm: 2, discoveredIn: 'Aplicações curtas' },
  { id: 'xi', hanzi: '膝', pinyin: 'xī', portuguese: 'joelho', category: 'body', realm: 2, discoveredIn: 'Aplicações curtas' },
  { id: 'qian', hanzi: '前', pinyin: 'qián', portuguese: 'frente', category: 'direction', realm: 1, hskLevel: 2, discoveredIn: 'Deslocamento frontal' },
  { id: 'hou', hanzi: '后', pinyin: 'hòu', portuguese: 'trás', category: 'direction', realm: 1, hskLevel: 2, discoveredIn: 'Deslocamento recuado' },
  { id: 'zuo', hanzi: '左', pinyin: 'zuǒ', portuguese: 'esquerda', category: 'direction', realm: 1, hskLevel: 1, discoveredIn: 'Portão esquerdo' },
  { id: 'you', hanzi: '右', pinyin: 'yòu', portuguese: 'direita', category: 'direction', realm: 1, hskLevel: 1, discoveredIn: 'Portão direito' },
  { id: 'shang', hanzi: '上', pinyin: 'shàng', portuguese: 'cima', category: 'direction', realm: 1, hskLevel: 1, discoveredIn: 'Escadaria do templo' },
  { id: 'xia', hanzi: '下', pinyin: 'xià', portuguese: 'baixo', category: 'direction', realm: 1, hskLevel: 1, discoveredIn: 'Escadaria do templo' },
  { id: 'da', hanzi: '打', pinyin: 'dǎ', portuguese: 'golpear', category: 'action', realm: 1, hskLevel: 2, discoveredIn: 'O Primeiro Punho' },
  { id: 'ti', hanzi: '踢', pinyin: 'tī', portuguese: 'chutar', category: 'action', realm: 1, discoveredIn: 'Primeiro chute' },
  { id: 'zhua', hanzi: '抓', pinyin: 'zhuā', portuguese: 'agarrar', category: 'action', realm: 2, discoveredIn: 'Mãos de Garra' },
  { id: 'dang', hanzi: '挡', pinyin: 'dǎng', portuguese: 'bloquear', category: 'action', realm: 1, discoveredIn: 'Defesa básica' },
  { id: 'tui', hanzi: '推', pinyin: 'tuī', portuguese: 'empurrar', category: 'action', realm: 2, discoveredIn: 'Aplicação no pátio' },
  { id: 'shan', hanzi: '闪', pinyin: 'shǎn', portuguese: 'esquivar', category: 'action', realm: 2, discoveredIn: 'Esquiva da Flor' },
  { id: 'zhuan', hanzi: '转', pinyin: 'zhuǎn', portuguese: 'girar', category: 'action', realm: 1, hskLevel: 3, discoveredIn: 'Giro do Pátio' },
  { id: 'tiao', hanzi: '跳', pinyin: 'tiào', portuguese: 'saltar', category: 'action', realm: 1, hskLevel: 2, discoveredIn: 'Botão de salto' }
];

export function findVocabularyById(id: string) {
  return vocabulary.find((term) => term.id === id);
}
