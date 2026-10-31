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

## 🚀 CI e publicação

### CI (`.github/workflows/ci.yml`)

Roda em todo Pull Request, para qualquer branch de destino, com três jobs paralelos:

- **Lint e formatação**: `npm run lint` e `npm run format:check`
- **Testes**: `npm run test:coverage` (o relatório de cobertura fica como artefato do run)
- **Build**: `npm run build`

### Release (`.github/workflows/release.yml`)

Roda a cada push na `master` (ou manualmente via _Run workflow_). Executa a CI completa e, se passar, o
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
Actions) com um token granular do npm com permissão de escrita para o pacote.

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
