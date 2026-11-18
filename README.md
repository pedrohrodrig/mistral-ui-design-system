# Mistral UI Design System

Biblioteca de componentes React do Mistral UI, construída com [Base UI](https://base-ui.com) (comportamento e acessibilidade) e [Tailwind CSS v4](https://tailwindcss.com) (estilos). Funciona em aplicações Next.js (App Router, inclusive em Server Components) e React + Vite.

## Instalação

```bash
npm install @mistral-ui/design-system
```

`react` e `react-dom` (18 ou 19) são `peerDependencies` e precisam estar instalados na aplicação.

## Uso

Importe o CSS da biblioteca uma vez, no ponto de entrada da aplicação, e use os componentes:

```tsx
import '@mistral-ui/design-system/styles.css';
import { Button } from '@mistral-ui/design-system';

export function Exemplo() {
  return <Button variant='primary'>Comprar</Button>;
}
```

### Next.js (App Router)

Importe o CSS no `app/layout.tsx`. Os componentes interativos já trazem a diretiva `"use client"`, então podem ser usados diretamente em Server Components.

```tsx
// app/layout.tsx
import '@mistral-ui/design-system/styles.css';
```

### React + Vite

Importe o CSS no `src/main.tsx`. Nenhuma configuração extra do Vite é necessária.

## Estilos

- O CSS distribuído já vem compilado: a aplicação não precisa ter Tailwind nem configurar nada para a biblioteca funcionar.
- Todas as classes da biblioteca usam o prefixo `mui:` (ex.: `mui:bg-blue-600`), então não colidem com o Tailwind da aplicação.
- Os estilos da biblioteca ficam na camada CSS `components`. Classes da aplicação passadas em `className` vencem as do componente, qualquer que seja a ordem de import dos CSS.
- A biblioteca não aplica reset global (preflight). O reset fica a cargo da aplicação.
- O pacote é somente ESM.

## Desenvolvimento

```bash
npm ci
npm run storybook   # documentação e desenvolvimento dos componentes
npm test            # testes das stories no Chromium (Vitest + Playwright)
npm run build       # gera dist/ (JS, .d.ts e styles.css)
```

Convenções de código, CI e o fluxo de publicação com semantic-release estão em [DEVELOPMENT.md](./DEVELOPMENT.md).
