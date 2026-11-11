# Guia de Desenvolvimento

Este documento descreve as configurações de formatação e linting do projeto.

## 🛠️ Configurações de Código

### EditorConfig

- **Indentação**: 2 espaços
- **Charset**: UTF-8
- **Quebra de linha**: LF (Unix)
- **Final de arquivo**: Nova linha obrigatória

### Node.js

- **Versão**: 26 LTS (fixada em `.nvmrc`, usada também pela CI)
- Use `nvm use` (ou `fnm use`) na raiz do projeto para ativar a versão certa
- O `devEngines` do `package.json` faz o `npm install` falhar em versões abaixo da 26.13.0

### Oxfmt (formatação)

[Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) substitui o Prettier, com saída compatível e
configuração em `.oxfmtrc.json`:

- **Aspas**: Simples (`'`)
- **Indentação**: 2 espaços
- **Largura máxima**: 80 caracteres
- **Ponto e vírgula**: Sempre
- **Vírgula final**: ES5
- **Organização de imports**: feita pelo formatador (`sortImports`), em grupos
  builtin → external → internal → parent → sibling → index, separados por linha em branco

### Oxlint (linting)

[Oxlint](https://oxc.rs/docs/guide/usage/linter.html) substitui o ESLint, com configuração em `.oxlintrc.json`:

- **Base**: categoria `correctness` como erro + regras recomendadas do `typescript-eslint`
- **React**: regras de hooks (`rules-of-hooks`, `exhaustive-deps`) e `only-export-components` (Fast Refresh)
- **Imports**: `import/no-duplicates`

### Pre-commit Hook

- **Execução automática**: Antes de cada commit
- **Formatação**: Oxfmt em arquivos modificados
- **Linting**: Oxlint com correções automáticas
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
# Executar Oxlint
npm run lint

# Executar Oxlint com correções automáticas
npm run lint:fix
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

- Oxc (`oxc.oxc-vscode`): lint e formatação
- Tailwind CSS IntelliSense
- TypeScript Importer

### Configurações Automáticas

- Formatação ao salvar
- Organização de imports ao salvar
- Correção automática do Oxlint

## 📁 Arquivos de Configuração

- `.editorconfig` - Configurações globais do editor
- `.nvmrc` - Versão do Node.js
- `.oxfmtrc.json` - Configurações do Oxfmt (inclui os arquivos ignorados)
- `.oxlintrc.json` - Configurações do Oxlint
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
   - O Oxlint mostrará warnings/errors em tempo real

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

## 🚀 CI e publicação

### CI (`.github/workflows/ci.yml`)

Roda em todo Pull Request, para qualquer branch de destino, com três jobs paralelos:

- **Lint e formatação**: `npm run lint` e `npm run format:check`
- **Testes**: `npm run test:coverage` (o relatório de cobertura fica como artefato do run)
- **Build**: `npm run build`

### Release (`.github/workflows/release.yml`)

Roda a cada push na `master` (ou manualmente via _Run workflow_). Como o repositório segue git flow, a `master` só
recebe merges de branches `release/*` (ou `hotfix/*`), então uma versão só é publicada quando uma release é
fechada, nunca a cada commit:

1. Features entram na `dev` via PR a partir de `feature/*`.
2. Para publicar, crie `release/x.y` a partir da `dev` e abra um PR para a `master`.
3. O merge na `master` dispara a release; depois faça o merge da `master` de volta na `dev`.

O workflow executa a CI completa e, se passar, o
[semantic-release](https://semantic-release.gitbook.io/) calcula a próxima versão a partir das mensagens de
commit, publica o pacote no npm, cria a tag `vX.Y.Z` e a GitHub Release com as notas geradas.

A versão segue [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

| Commit                                                   | Versão                    |
| -------------------------------------------------------- | ------------------------- |
| `fix: ...`                                               | patch (`1.0.0` → `1.0.1`) |
| `feat: ...`                                              | minor (`1.0.0` → `1.1.0`) |
| `feat!: ...` ou rodapé `BREAKING CHANGE:`                | major (`1.0.0` → `2.0.0`) |
| `chore:`, `docs:`, `refactor:`, `test:`, `style:`, `ci:` | sem release               |

A versão publicada vem das tags git, então o `version` do `package.json` fica fixo em `0.0.0-semantic-release`
e nenhum commit de bump é empurrado para a `master` (que é protegida).

**Configuração necessária:** adicionar o secret `NPM_TOKEN` no repositório (Settings → Secrets and variables →
Actions) com um token granular do npm com permissão de escrita no escopo `@mistral-ui`.

## ⚠️ Troubleshooting

### O Oxlint não mostra nada

- Sem problemas encontrados, o `oxlint` termina em silêncio com código 0
- Use `npx oxlint -f stylish` para ver o resumo

### O editor não está formatando

- Verifique se a extensão Oxc está instalada
- Defina a extensão Oxc como formatador padrão do VS Code
- Execute `npm run format` manualmente se necessário

## 🎨 Tailwind CSS

A biblioteca usa Tailwind CSS v4 via `@tailwindcss/vite` (não há `tailwind.config.js` nem PostCSS).

- O ponto de entrada é `lib/styles.css`, usado pelo build e pelo Storybook.
- Todas as classes usam o prefixo `mui:` (ex.: `mui:bg-blue-600`, `mui:hover:bg-blue-700`). Isso evita colisão de classes e de variáveis de tema com o Tailwind das aplicações consumidoras. As variáveis internas do Tailwind (`--tw-*`, como as de ring e sombra) não recebem prefixo e são compartilhadas com o app, o que na prática não causa conflito.
- As utilitárias da biblioteca ficam na camada CSS `components`. Assim, uma classe do Tailwind da aplicação passada em `className` (camada `utilities`) sempre sobrescreve a do componente, qualquer que seja a ordem de import dos CSS.
- O preflight (reset global) não é incluído. Cada componente deve neutralizar os estilos nativos do navegador de que depende.
