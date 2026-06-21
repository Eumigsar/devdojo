# Como subir este projeto no GitHub

Depois de extrair o ZIP:

```bash
cd matsuri-academy-3d
git init
git add .
git commit -m "feat: prototipo inicial da Matsuri Academy"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/matsuri-academy-3d.git
git push -u origin main
```

Para rodar localmente:

```bash
npm install
npm run dev
```

URL local padrão:

```txt
http://localhost:5173
```

## O que eu incluí neste pacote

Mantive sua base atual em **Vite + TypeScript + Babylon.js** e adicionei uma camada organizada de produto:

- `docs/` com GDD, TDD, mundo e plano do MVP
- `src/data/` com vocabulário, missões, reinos, NPCs, locais e taolu
- `src/systems/` com sistemas de progressão, vocabulário, missões, mascote e save local
- `src/types/` com tipos centrais do jogo
- `.github/workflows/ci.yml` para validação básica no GitHub Actions

## Importante

Se você já tiver uma pasta `src/` mais completa no seu computador, não substitua tudo cegamente. Copie principalmente:

```txt
src/data/
src/systems/
src/types/
docs/
.github/
```

Esses arquivos foram feitos para complementar seu protótipo 3D atual, não para matar o que já está funcionando.
