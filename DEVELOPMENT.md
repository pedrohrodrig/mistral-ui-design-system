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
   ```bash
   npm run format
   npm run lint
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
