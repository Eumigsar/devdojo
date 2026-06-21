# Se aparecer texto sem gráfico, é deploy cru sem build

A tela com apenas textos como `Missão ativa`, `0XP`, `Biblioteca viva` significa que o GitHub Pages está servindo o código fonte direto, sem rodar Vite/Phaser.

Este projeto PRECISA publicar a pasta `dist/` gerada pelo build.

## Correção

1. Suba todos os arquivos deste ZIP, incluindo `.github/workflows/deploy.yml`.
2. Vá em **Settings → Pages**.
3. Em **Source**, escolha **GitHub Actions**.
4. Vá em **Actions**.
5. Rode ou aguarde **Deploy Isometric RPG to GitHub Pages**.
6. Só abra o site depois que ficar verde.

## Conferência

Se o navegador abrir o arquivo da raiz sem build, vai quebrar.
O deploy correto publica `dist/index.html`, não o `index.html` da raiz.

## Se quiser publicar manualmente sem Actions

No computador local:

```bash
npm install
npm run build
```

Depois publique o conteúdo da pasta:

```txt
dist/
```
