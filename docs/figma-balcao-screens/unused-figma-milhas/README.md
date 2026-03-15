# Figma Milhas — Export via Console MCP

Export do arquivo **Milhas** do Figma para o repositório, via **Figma Console MCP** (não o MCP padrão Figma).

- **Figma:** [Milhas](https://www.figma.com/design/WRUTH077tmWjsCqs3ZwTVS/Milhas)
- **Última extração:** 2026-03-15
- **File key:** `WRUTH077tmWjsCqs3ZwTVS`

## Conteúdo desta pasta

| Ficheiro | Descrição |
|----------|-----------|
| `README.md` | Este ficheiro |
| `DESIGN_SPEC.md` | Cores, tipografia, grid e componentes extraídos (para dev) |
| `file-structure-summary.md` | Resumo das páginas e nós principais |
| `figma-file-data.json` | Árvore completa do documento (verbosity full, depth 3) |

## Nota sobre o node 114:242

O link partilhado aponta para a página **Teste** (`node-id=114-242`). Essa página está **vazia** no arquivo. O conteúdo do design está nas páginas **Concept** e **Prototype**. A exportação inclui todo o documento.

## Como re-exportar

1. Ter o Figma Console MCP configurado (token + Desktop Bridge se necessário).
2. Pedir ao Cursor: usar `figma_get_file_data` com `fileUrl` do arquivo Milhas e, se quiser só uma página, `nodeIds` com o id no formato `114:242`.
