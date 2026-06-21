# TDD — Arquitetura Técnica Recomendada

## Stack mantida

- Vite
- TypeScript
- Babylon.js
- HTML/CSS próprio

Essa é a melhor base agora porque o projeto já tem identidade visual e protótipo 3D.

## Camadas sugeridas

```txt
src/
  main.ts
  game/
  ui/
  content/          # conteúdo legado existente
  data/             # novos bancos estáticos do jogo
  systems/          # regras de progressão e persistência
  types/            # contratos centrais
```

## Quando adicionar backend

Só adicionar backend depois que o MVP local estiver divertido.

Ordem recomendada:

1. `localStorage`
2. Supabase gratuito
3. Backend próprio, se o projeto crescer

## IA

MVP sem IA paga:

- diálogos pré-escritos
- feedback fixo do mestre
- revisão baseada em dados locais

Depois:

- memória do mestre
- correção gramatical
- simulação de conversa
- pronúncia com Whisper/Deepgram ou alternativa

## Deploy gratuito

- GitHub Pages: possível por ser Vite
- Netlify: simples
- Vercel: simples
- Cloudflare Pages: ótimo para estático
