# Montar todas as telas do Balcão no Figma

Este passo a passo usa o **Figma Console MCP** (não o MCP oficial Figma) para criar no Figma uma secção com **um frame por tela** do app Balcão.

---

## Por que "deu sucesso" mas não criou nada?

O **figma_execute** só corre dentro do Figma quando existe ligação **Desktop Bridge**. Se não houver ficheiro ligado, o MCP pode devolver `success: true` mas o código não corre em nenhum documento — por isso não aparece nada. **Solução:** Antes de executar, o assistente deve chamar **figma_list_open_files**. Se a resposta for "No files connected" ou `files: []`, não chamar `figma_execute`; primeiro ligar o Desktop Bridge (passos abaixo).

---

## O que será criado no Figma

- **1 Section:** "Balcão App - Telas"
- **23 Frames:** um por tela, 393×852 px (formato app), com o nome da tela no canto.
- Disposição em grelha (4 colunas), com espaçamento 24 px.

Lista das telas em [SCREENS_LIST.md](./SCREENS_LIST.md).

---

## Passos obrigatórios (antes de executar)

1. Abre o **Figma Desktop** (app instalado).
2. Abre o ficheiro onde queres as telas (ex.: [Milhas](https://www.figma.com/design/WRUTH077tmWjsCqs3ZwTVS/Milhas)).
3. No Figma: **Plugins → Development → Figma Desktop Bridge** (ou o nome do plugin que instalaste).
4. Deixa o plugin a correr (não feches a janela do plugin).
5. No Cursor, pede: *“Executa o script para criar as telas do Balcão no Figma”* — deves ver um toast no Figma: "Balcão: 23 telas na página ...". Se não aparecer nada, pede para executar create-balcao-telas-only.js (só frames).

---

## Se o MCP disser "Cannot connect to Figma Desktop"

- Confirma que estás no **Figma Desktop** (não no browser).
- Confirma que o plugin **Desktop Bridge** está a correr (Plugins → Development → …).
- Reinicia o plugin e tenta de novo no Cursor.

---

## Ficheiros nesta pasta

| Ficheiro | Uso |
|----------|-----|
| `README.md` | Este guia |
| `SCREENS_LIST.md` | Lista das 23 telas (nome + componente) |
| `create-balcao-pages.js` | Versão simples (só labels) |
| `create-balcao-pages-exact.js` | Versão que replica header + blocos e cores do código |
| **`create-balcao-with-variables.js`** | **Script principal:** variáveis (Balcão Design System) + section "Balcão App - Telas" com 23 telas. Usado pelo **Figma Console MCP** ([southleft/figma-console-mcp](https://github.com/southleft/figma-console-mcp)) via **figma_execute**. Cria na **página atual** — muda de página no Figma antes de executar. |
| `create-balcao-telas-only.js` | Script único (section + 23 frames). Se falhar por tamanho do payload, usar os 2 passos abaixo. |
| **`passo1-criar-section.js`** | **Passo 1/2:** Cria só a section "Balcao App - Telas". Executar primeiro. |
| **`passo2-criar-23-frames.js`** | **Passo 2/2:** Encontra a section e adiciona os 23 frames. Executar depois do passo 1. |
| **`conteudo-telas.cjs`** | Fonte de verdade: helpers (`addHeader`, `addCard`, `addRow`) e configs das 23 telas em ASCII (para copiar para os lotes). Não executa no Figma. |
| **`passo4-lote1.js`** … **`passo4-lote4.js`** | **Conteúdo fiel:** 4 scripts (por lote de ~5–6 telas). Cada um preenche os frames com header + cards/rows específicos. Executar **após** passo1 e passo2; substitui o conteúdo genérico de passo3. |

---

## Conteúdo fiel (passo 4)

Para ter em cada frame o layout **fiel** ao app (em vez de placeholders), depois de criar a section e os 23 frames:

1. **Passo 1** → **Passo 2** (obrigatório).
2. (Opcional) Passo 3: headers/cards genéricos — pode ser omitido se fores sempre correr o passo 4.
3. **Passo 4:** executar **4×** `figma_execute`, uma por lote, com o código de `passo4-lote1.js`, `passo4-lote2.js`, `passo4-lote3.js`, `passo4-lote4.js` (ordem: lote 1 → 2 → 3 → 4). Timeout recomendado: 15 s por chamada.

O assistente deve chamar **figma_list_open_files** primeiro; só se houver ficheiro ligado usa **figma_execute** com o código de `create-balcao-with-variables.js` (variáveis + telas), `create-balcao-pages-exact.js` (só telas) ou os 4 lotes do passo 4 (conteúdo fiel).
