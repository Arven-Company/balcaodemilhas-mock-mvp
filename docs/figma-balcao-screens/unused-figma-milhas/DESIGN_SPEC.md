# Design Spec — Figma Milhas

Especificação extraída do arquivo Figma via Console MCP. Usar como referência para implementação (CSS/React).

---

## Cores

Valores em RGB 0–1 no Figma; convertidos para hex.

| Uso | Figma (r,g,b) | Hex | CSS var sugerida |
|-----|----------------|-----|------------------|
| Fundo canvas / app escuro | 0.118, 0.118, 0.118 | `#1e1e1e` | `--color-bg` |
| Section / fundo secundário escuro | 0.159, 0.159, 0.159 | `#282828` | `--color-bg-card` (dark) |
| Card / tela clara | 0.973, 0.973, 0.976 | `#f8f9fa` | `--color-bg-surface` |
| Branco (texto, fundos) | 1, 1, 1 | `#ffffff` | `--color-white` |
| Gradiente card (topo) | 0.061, 0.468, 1 | `#0f77ff` | — |
| Gradiente card (base) | 0.051, 0.335, 0.707 | `#0d56b4` | — |

### Gradiente do card de destaque (emissões)

- Linear vertical (top → bottom).
- Paradas: `#0f77ff` (0%) → `#0d56b4` (100%).

```css
background: linear-gradient(180deg, #0f77ff 0%, #0d56b4 100%);
```

---

## Tipografia

| Nome no Figma | Uso | font-family | font-weight | font-size | line-height |
|---------------|-----|-------------|-------------|-----------|-------------|
| Schibsted Grotesk | "Ofertas" (tab, Concept) | Schibsted Grotesk | 600 | 14px | ~17px (100%) |
| Neue Haas Grotesk Display Pro | "Ofertas" (tab, Prototype) | Neue Haas Grotesk Display Pro | 600 | 14px | ~16.8px (100%) |

Fontes referenciadas no arquivo: **Schibsted Grotesk**, **Neue Haas Grotesk Display Pro**, **Cabinet Grotesk**.

---

## Layout

### Grid (colunas)

- **Colunas:** 4
- **Tamanho da secção:** 71.25px
- **Gutter:** 20px
- **Offset (margin lateral):** 24px
- **Dispositivo protótipo:** iPhone 16 White — 393×852

### Espaçamento em cards

- **Card com gradiente (header):** padding 16px (L/R), 10px (T/B); `itemSpacing` 10px.
- **Card branco (lista):** padding 16px (L/R), 12px (T/B).
- **Border radius:** 16px (incl. `rectangleCornerRadii` [0,0,16,16] no card gradiente).

---

## Componentes / padrões

1. **Card com gradiente azul**  
   Frame 393×248, cantos inferiores 16px, layout horizontal, padding 16/10, ícone chevron-left 24×24.

2. **Frames de tela (Prototype)**  
   393×852, fundo `#f8f9fa`, grid 4 colunas (71.25, gutter 20, offset 24).

3. **Ícones referenciados**  
   - `weui:back-outlined` — 12×24  
   - `ic:round-chevron-left` — 24×24  
   - `clarity:plane-line` — 16×16 ou 24×24  

4. **Transições**  
   Navegação entre frames: 300ms, easing EASE_OUT.

---

## Estrutura de páginas (resumo)

- **Concept** — Playground, Font Test (Schibsted, Neue Haas, Cabinet), frames 26–32, cards gradiente (8, 7, 10), imagens.
- **Teste** — Vazia (node 114:242).
- **Prototype** — Section 1: frames 1–7 (telas app 393×852), fluxo de protótipo iPhone 16.

Para nós específicos e IDs, ver `file-structure-summary.md` ou `figma-file-data.json`.
