# Correção emergencial do GitHub Pages

O problema era que o GitHub Pages estava abrindo o `index.html` do Vite diretamente, sem buildar o projeto.

Esse `index.html` aponta para arquivos como:

```html
/src/ui/styles.css
/src/main.ts
```

No GitHub Pages, isso pode ficar branco/quebrado se o projeto não foi publicado pela pasta `dist/`.

## Correção imediata aplicada neste ZIP

- `matsuri.html` foi copiado para `index.html`
- o `index.html` original foi salvo como `index-vite-original.html`
- foi adicionada `.nojekyll`
- foi adicionado workflow em `.github/workflows/deploy.yml` para deploy correto no futuro

## Para corrigir AGORA no GitHub

Suba estes arquivos no repositório e espere o GitHub Pages atualizar.

Se preferir corrigir manualmente:

1. Abra `matsuri.html`
2. Copie todo o conteúdo
3. Cole em `index.html`
4. Commit

Isso faz a versão standalone aparecer de novo.

## Correção definitiva depois

Em Settings > Pages, use:

- Source: GitHub Actions

O workflow `deploy.yml` vai rodar:

```bash
npm install
npm run build
```

e publicar a pasta `dist/` corretamente.
