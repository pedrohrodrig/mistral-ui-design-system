#!/bin/bash

echo "🧪 Testando configuração de pre-commit..."

# Criar um arquivo de teste com formatação incorreta
echo "Criando arquivo de teste..."
cat > test-file.ts << 'EOF'
import React from 'react';
import {Button} from './Button';

export const TestComponent=()=>{
return(
<div>
<Button variant="primary" size="md">Teste</Button>
</div>
);
};
EOF

# Adicionar ao staging
echo "Adicionando arquivo ao staging..."
git add test-file.ts

# Executar pre-commit
echo "Executando pre-commit..."
npm run pre-commit

# Verificar se o arquivo foi formatado
echo "Verificando resultado..."
if [ -f test-file.ts ]; then
    echo "✅ Arquivo foi formatado automaticamente!"
    echo "Conteúdo após formatação:"
    cat test-file.ts
else
    echo "❌ Arquivo não foi encontrado"
fi

# Limpar
echo "Limpando arquivo de teste..."
git reset HEAD test-file.ts
rm -f test-file.ts

echo "�� Teste concluído!"
