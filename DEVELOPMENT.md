# Guia de Desenvolvimento

Este documento descreve as configurações de formatação e linting do projeto.

## 🛠️ Configurações de Código

### EditorConfig

- **Indentação**: 2 espaços
- **Charset**: UTF-8
- **Quebra de linha**: LF (Unix)
- **Final de arquivo**: Nova linha obrigatória

### Prettier

- **Aspas**: Simples (`'`)
- **Indentação**: 2 espaços
- **Largura máxima**: 80 caracteres
- **Ponto e vírgula**: Sempre
- **Vírgula final**: ES5

### ESLint

- **Organização de imports**: Automática
- **Regras React**: Otimizadas
- **Integração**: Compatível com Prettier

### Pre-commit Hook

- **Execução automática**: Antes de cada commit
- **Formatação**: Prettier em arquivos modificados
- **Linting**: ESLint com correções automáticas
- **Bloqueio**: Commit cancelado se houver erros

## 🧱 Primitives (Base UI)

Os componentes do Mistral UI são construídos sobre os primitives headless do
[Base UI](https://base-ui.com/react/overview/quick-start) (`@base-ui/react`).
O Base UI cuida de acessibilidade, teclado e estados; o Mistral UI adiciona
apenas a camada visual (Tailwind) e uma API de variações.

Convenções ao criar ou refatorar um componente:

- Importe o primitive pelo subpath (`@base-ui/react/button`) para manter o
  bundle pequeno.
- Estenda as props do primitive (`BaseButton.Props`) para expor `render`,
  `className` como função do estado e as demais props do Base UI.
- Estilize estados pelos data attributes do Base UI (`data-[disabled]`,
  `data-[pressed]`, `data-[open]`…) em vez de pseudo-classes como `:disabled`.
- Defina variações e combine classes com
  [tailwind-variants](https://www.tailwind-variants.org) (`tv`), que usa o
  tailwind-merge para resolver conflitos. Classes com o prefixo `mui:` são
  resolvidas entre si sem configuração extra (`mui:bg-red-600` substitui
  `mui:bg-blue-600`). Repasse o `className` do consumidor
  (string ou função do estado) para o `tv`, assim ele sobrescreve as classes
  do componente.
- `@base-ui/react` é tratado como dependência externa no build da lib.

## 📝 Scripts Disponíveis

### Formatação

```bash
# Formatar todos os arquivos
npm run format

# Verificar formatação (sem alterar)
npm run format:check
```

### Linting

```bash
# Executar ESLint
npm run lint

# Executar ESLint com correções automáticas
npx eslint . --fix
```

### Pre-commit

```bash
# Executar pre-commit manualmente
npm run pre-commit

# Testar configuração de pre-commit
npm run test:pre-commit
```

## 🔧 Configuração do VS Code

### Extensões Recomendadas

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer

### Configurações Automáticas

- Formatação ao salvar
- Organização de imports ao salvar
- Correção automática do ESLint

## 📁 Arquivos de Configuração

- `.editorconfig` - Configurações globais do editor
- `.prettierrc` - Configurações do Prettier
- `.prettierignore` - Arquivos ignorados pelo Prettier
- `eslint.config.js` - Configurações do ESLint
- `.lintstagedrc` - Configurações do lint-staged
- `.husky/pre-commit` - Hook de pre-commit
- `.vscode/settings.json` - Configurações do VS Code
- `.vscode/extensions.json` - Extensões recomendadas

## 🚀 Fluxo de Trabalho Recomendado

1. **Antes de começar a codificar:**
   - Instale as extensões recomendadas do VS Code
   - Execute `npm install` para instalar dependências

2. **Durante o desenvolvimento:**
   - O VS Code formatará automaticamente ao salvar
   - Os imports serão organizados automaticamente
   - O ESLint mostrará warnings/errors em tempo real

3. **Antes de commitar:**
   - O pre-commit hook executará automaticamente
   - Arquivos serão formatados e corrigidos automaticamente
   - Se houver erros, o commit será bloqueado

4. **Execução manual (se necessário):**
   ```bash
   npm run format
   npm run lint
   npm run pre-commit
   ```

## ⚠️ Troubleshooting

### ESLint não reconhece imports

- Alguns warnings sobre imports não resolvidos são normais
- Para imports internos do projeto, use caminhos relativos

### Prettier não está formatando

- Verifique se a extensão Prettier está instalada
- Certifique-se de que o Prettier é o formatador padrão
- Execute `npm run format` manualmente se necessário

### Conflitos entre ESLint e Prettier

- O `eslint-config-prettier` resolve conflitos automaticamente
- Se houver problemas, execute `npm run format` antes de `npm run lint`

## 🎨 Tailwind CSS

A biblioteca usa Tailwind CSS v4 via `@tailwindcss/vite` (não há `tailwind.config.js` nem PostCSS).

- O ponto de entrada é `lib/styles.css`, usado pelo build e pelo Storybook.
- Todas as classes usam o prefixo `mui:` (ex.: `mui:bg-blue-600`, `mui:hover:bg-blue-700`). Isso isola a biblioteca do Tailwind das aplicações consumidoras.
- As utilitárias da biblioteca ficam na camada CSS `components`. Assim, uma classe do Tailwind da aplicação passada em `className` (camada `utilities`) sempre sobrescreve a do componente, qualquer que seja a ordem de import dos CSS.
- O preflight (reset global) não é incluído. Cada componente deve neutralizar os estilos nativos do navegador de que depende.
