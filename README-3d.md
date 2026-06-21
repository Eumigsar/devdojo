# 祭 学院 — Academia de Mandarim 3D

Jogo web 3D de ensino de mandarim. Stack: **Vite + TypeScript + Babylon.js**.
Plataforma 3D explorável onde aprender mandarim (rumo ao HSK 3) é a mecânica.

## Rodar

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

Build de produção:

```bash
npm run build    # gera /dist
npm run preview
```

Sobe a pasta `dist/` em qualquer host estático (Netlify, Vercel, GitHub Pages).

## Controles

- **PC**: setas ou WASD para andar · espaço para pular · **E** ou Enter para conversar
- **Celular**: direcional virtual (canto inferior esquerdo) · botão 跳 pular · botão 话 conversar
- Câmera: arraste (mouse/dedo) para girar; roda do mouse para zoom

## Arquitetura

```
src/
  main.ts                  # orquestra engine, cena, loop, missões
  game/
    engine.ts              # Babylon engine + presets de qualidade PC/celular
    input.ts               # entrada unificada (teclado + joystick touch)
    scenes/GameScene.ts    # monta a cena 3D a partir da fase
    player/PlayerController.ts  # cápsula, coyote time, jump buffer, estados
    systems/
      progress.ts          # selos, ranks, SRS (SM-2), localStorage
      audio.ts             # tons sintetizados + TTS zh-CN + ambiente
  content/
    hsk.ts                 # vocabulário HSK 1/2/3 tipado
    dialogue.ts            # diálogos com tags de registro social (mecânica)
    levelTypes.ts          # esquema de fase data-driven
    levels/level-01.json   # primeira fase
  ui/
    ui.ts                  # HUD, missões, painel de diálogo, mapa HSK
    styles.css             # responsivo PC + celular (safe-area, touch)
```

## Mecânica de contexto social

Cada escolha de diálogo carrega `register` (formal/neutro/casual) e
`politeness` (alta/média/baixa). Cada cena define o registro que o **contexto
social espera**. `scoreChoice()` mede a adequação — acertar o tom gera afinidade
e selos. Falar casual com um ancião "destoa" e o NPC reage.

## Próximos passos (roadmap)

1. **Assets reais**: troque as cápsulas/caixas por GLB. O loader já está previsto
   em `levelTypes.glbUrl` e `GameScene` (importe `@babylonjs/loaders`).
2. **Física robusta**: troque o raycast de chão por **Rapier**
   (`@babylonjs/core/Physics/v2` + plugin Havok/Rapier) — a interface do
   `PlayerController` permanece a mesma.
3. **Stroke order 3D**: porte a animação median-clip (da versão single-file) para
   um painel WebGL/Canvas sobre o HUD.
4. **Mais fases**: cada `level-XX.json` reusa o mesmo motor. Adicione objetivos,
   NPCs e tarefas de idioma.
5. **Backend opcional**: troque `localStorage` por Supabase/Postgres para login e
   multi-dispositivo (a classe `Progress` isola a persistência).

## Notas de áudio

A voz usa as vozes chinesas (zh-CN) instaladas no sistema. Sem voz instalada, o
tom sintetizado toca sozinho e o resto funciona. O áudio só inicia após o
primeiro toque/clique (política dos navegadores).
