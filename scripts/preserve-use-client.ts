import type { Plugin } from 'vite';

const USE_CLIENT =
  /^(\s*(?:\/\/[^\n]*\n\s*|\/\*[\s\S]*?\*\/\s*)*)(['"]use client['"];?)/;

/**
 * O Rollup descarta diretivas de módulo ("use client") ao gerar o bundle. Este
 * plugin registra quais módulos da biblioteca começam com "use client", tira a
 * diretiva do código-fonte (trocando-a por espaços, para não deslocar o source
 * map) e a recoloca no topo do arquivo gerado para cada um deles. O App Router
 * do Next.js exige a diretiva nos componentes de cliente.
 *
 * Depende de `preserveModules`: cada módulo vira um arquivo próprio, então o
 * `facadeModuleId` do chunk identifica o módulo de origem. Sem essa opção,
 * módulos agrupados no mesmo chunk perderiam a diretiva.
 */
export function preserveUseClient(): Plugin {
  const clientModules = new Set<string>();

  return {
    name: 'mistral-ui:preserve-use-client',
    apply: 'build',
    transform(code, id) {
      const match = USE_CLIENT.exec(code);
      if (!match) return null;
      clientModules.add(id);
      const [, prefix, directive] = match;
      const start = prefix.length;
      return {
        code:
          code.slice(0, start) +
          ' '.repeat(directive.length) +
          code.slice(start + directive.length),
        map: null,
      };
    },
    renderChunk(code, chunk) {
      if (chunk.facadeModuleId && clientModules.has(chunk.facadeModuleId)) {
        return { code: `'use client';\n${code}`, map: null };
      }
      return null;
    },
  };
}
