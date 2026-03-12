# Design system – Milhas Balcão

Abstração dos **padrões**, **estilo visual**, **espaçamento** e **características** do design Figma para uso consistente no código.  
**Figma:** [Milhas](https://www.figma.com/design/WRUTH077tmWjsCqs3ZwTVS/Milhas) · **Referência:** [Figma-Milhas-Referencia.md](./Figma-Milhas-Referencia.md)

---

## 1. Características gerais do design (Figma)

- **Estilo:** Limpo, orientado a mobile (max-width 393px), com cards elevados e hierarquia clara.
- **Tom:** Profissional e confiável; azul como cor de ação e amarelo como destaque (badges, promoções).
- **Hierarquia:** Header com título em gradiente (primary → primary-dark); filtros em pills; listas com gap consistente; bottom nav fixa.
- **Recorrências:** Imagem superior do card (~100px), avatar 24×24, botões ~32px de altura, bordas arredondadas (cards 16px, pills 24px, botões 6px).

---

## 2. Padrões de layout e componentes

### 2.1 Shell da aplicação

| Padrão | Descrição | Tokens / valores |
|--------|-----------|------------------|
| **Container principal** | Coluna flex, fundo `--color-bg`, padding inferior para a nav | `min-height: 100vh`, `padding-bottom: 80px` |
| **Área de conteúdo** | Largura máxima centralizada | `max-width: 393px`, `margin: 0 auto` |
| **Bottom navigation** | Fixa no fundo, 4 itens, ícone + label | `--height-nav`, `--shadow-nav`, `padding: 8px 12px 12px` |

### 2.2 Headers

| Padrão | Descrição | Tokens / valores |
|--------|-----------|------------------|
| **Título da página** | Gradiente primary → primary-dark, bold, tamanho grande | `--text-xl`, `--font-semibold`, gradiente em `background-clip: text` |
| **Header sticky** | Fundo card, sombra leve, borda inferior arredondada | `--color-bg-card`, `--shadow-header`, `--radius-card` (só em baixo) |
| **Padding do header** | Consistente entre telas | `12px 20px 16px` → `--space-5 --space-7 --space-6` |
| **Subheader** (ex.: nome da secção + contagem) | Linha com título 18px semibold + texto secundário 14px | `--text-lg`, `--text-base` |

### 2.3 Filtros e abas

| Padrão | Descrição | Tokens / valores |
|--------|-----------|------------------|
| **Pills de filtro** | Borda azul clara, fundo card, texto 11px medium | `--color-border-filter`, `--radius-pill`, `--text-xs`, `padding: 8px 12px` |
| **Abas (Compra / Venda)** | Underline na ativa (3px primary), texto 14px | `border-bottom: 3px solid var(--color-primary)`, `--text-base` |
| **Gap entre pills** | Espaço entre filtros | `10px` → `--space-4` |

### 2.4 Cards

| Padrão | Descrição | Tokens / valores |
|--------|-----------|------------------|
| **Card base** | Fundo card, borda (ou não em emissão), sombra, radius 16px | `--color-bg-card`, `--shadow-card` / `--shadow-card-soft`, `--radius-card` |
| **Área de imagem do card** | Altura fixa, overlay em gradiente em baixo | `height: 100px` → `--height-card-image` |
| **Conteúdo sobre a imagem** | Padding 10px 16px; texto branco; rótulo 11px, título/valor 16px semibold | `--text-xs`, `--text-md` |
| **Corpo do card** | Padding consistente | `12px 16px` ou `12px 16px 16px` → `--space-5 --space-6` |
| **Avatar** | Círculo 24×24 | `--size-avatar-sm`, `border-radius: 12px` |
| **Badge (ex.: EXECUTIVA)** | Fundo accent, texto branco, pill | `--color-accent`, `--radius-badge`, `--text-xs`, `padding: 4px 6px` |
| **Botões de ação no card** | Dois botões em linha (outline + primary), altura ~32px, 14px medium | `--height-btn`, `--radius-btn`, `--text-base` |

### 2.5 Listas

| Padrão | Descrição | Tokens / valores |
|--------|-----------|------------------|
| **Lista de cards** | Padding horizontal e vertical; gap entre cards | `padding: 16px 20px 24px`, `gap: 20px` → `--space-6 --space-7 --space-8`, `--space-7` |
| **Gap entre elementos em coluna** | Ex.: nome + meta no card | `6px` → `--space-2` |

### 2.6 Formulários e fluxos (ex.: Verificação)

| Padrão | Descrição | Tokens / valores |
|--------|-----------|------------------|
| **Card de passo** | Borda, radius card, sombra suave, padding 20px | `--radius-card`, `--shadow-card-soft`, `padding: 20px` → `--space-7` |
| **Badge de número do passo** | Círculo primary, 28×28, texto branco semibold | `--color-primary`, `--text-base` |
| **Título do passo** | 18px semibold | `--text-lg`, `--font-semibold` |
| **Espaço entre passos** | Gap vertical entre cards | `20px` → `--space-7` |

---

## 3. Estilo visual (cores, tipografia, sombras)

### 3.1 Paleta (Figma)

- **Primary:** `#0f77ff` — CTAs, links, estado ativo, underline das abas.
- **Primary dark:** `#094899` — Gradiente do título, contraste.
- **Accent:** `#f6bd00` — Badges (ex.: EXECUTIVA), destaques.
- **Fundos:** `#f8f8f9` (página), `#ffffff` (cards).
- **Bordas:** `#e5e5e5` (neutro), `#d4e8ff` (filtros ativos).
- **Texto:** `#4a4a4a` (principal), `#666` (secundário), `#767676` (muted), `#a1a1a1` (light).

Tema escuro: ver `[data-theme="dark"]` em `src/styles/variables.css`.

### 3.2 Tipografia

- **Fonte:** Schibsted Grotesk (fallback: system-ui, -apple-system, sans-serif).
- **Escala:** 11px (labels, meta), 12px (nav), 14px (corpo, botões), 16px (títulos de card, valores), 18px (subtítulos), 24px (título de página).
- **Pesos:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold). Títulos e valores em 600.

### 3.3 Sombras

- **Card:** leve elevação (`0 3px 5px rgba(0,0,0,0.12)`).
- **Card soft:** muito suave para cards secundários.
- **Header / abas:** sombra inferior para separar do conteúdo.
- **Nav:** sombra superior para separar da área de conteúdo.
- **Modal:** sombra mais forte para overlay.

### 3.4 Bordas e raios

- **Card:** 16px.
- **Pill (filtros, badges):** 24px (ou 21px para badges pequenos).
- **Botão:** 6px.
- **Modal:** 20px (quando aplicável).

---

## 4. Espaçamento (escala Figma)

Escala de espaçamento usada em padding, margin e gap:

| Nome | Valor | Uso típico |
|------|--------|------------|
| `--space-1` | 4px | Margens mínimas, ícone–texto |
| `--space-2` | 6px | Gap entre nome e meta no card |
| `--space-3` | 8px | Padding interno pequeno |
| `--space-4` | 10px | Gap entre pills |
| `--space-5` | 12px | Padding de header/card, margin-bottom de título |
| `--space-6` | 16px | Padding horizontal de listas, padding de card |
| `--space-7` | 20px | Gap entre cards, padding de conteúdo |
| `--space-8` | 24px | Padding vertical de lista, secções |
| `--space-9` | 28px | Margem entre blocos (ex.: título → conteúdo) |
| `--space-10` | 32px | Espaçamentos maiores |

**Padrões recorrentes:**

- Header: `12px 20px 16px` → `space-5 space-7 space-6`
- Lista: `16px 20px 24px` → `space-6 space-7 space-8`
- Card body: `12px 16px` ou `12px 16px 16px`
- Conteúdo sobre imagem do card: `10px 16px`

---

## 5. Estados e feedback

- **Sucesso:** verde (`--color-success`, `--color-success-bg`).
- **Aviso:** laranja/âmbar (`--color-warning`, `--color-warning-bg`).
- **Erro:** vermelho (`--color-error`, `--color-error-bg`).
- **Info:** azul (`--color-info`, `--color-info-bg`).
- **Desabilitado:** `--color-disabled-bg`, `--color-disabled-text`.
- **Foco:** anel ou outline com `--color-focus-ring` (acessibilidade).
- **Hover:** overlay sutil `--color-hover-overlay` quando aplicável.

---

## 6. Ícones e imagens (Figma)

- **Ícones de navegação:** 32×32; nomes no Figma: `clarity:plane-line`, `streamline-freehand:business-deal-handshake`, `streamline-ultimate:tag-dollar`, `clarity:avatar-line`.
- **Filtros:** `mynaui:filter-solid`; Voltar: `weui:back-outlined`.
- **Avatar:** 24×24 (Image-24 no Figma).
- **Área de imagem do card:** ~345×100 (ou 89) px; object-fit cover; overlay em gradiente na parte inferior.

---

## 7. Onde está no código

| Conceito | Ficheiro |
|----------|----------|
| Tokens (cores, sombras, raios, tipografia, espaço) | `src/styles/variables.css` |
| Cards (emissão, balcão, promoção) | `src/styles/cards.css` |
| Layout (shell, header, filtros, abas, lista, bottom nav) | `src/styles/app-layout.css` |
| Fluxo de verificação | `src/styles/verificacao.css` |

Ao criar novos componentes ou telas, usar as variáveis de `variables.css` e seguir os padrões de espaçamento e hierarquia descritos neste documento para manter o estilo alinhado ao Figma.
