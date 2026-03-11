# Referência Figma – Milhas Balcão

**Figma:** [Milhas](https://www.figma.com/design/WRUTH077tmWjsCqs3ZwTVS/Milhas?node-id=153-362&m=dev)  
**Node raiz:** `153:362` (section "Schibsted Grotesk")  
**File key:** `WRUTH077tmWjsCqs3ZwTVS`

---

## Tipografia

- **Fonte do design:** Schibsted Grotesk (nome da section no Figma).
- Usar **Schibsted Grotesk** como fonte principal do app; se não estiver disponível, fallback para sans-serif do sistema (ex.: system-ui, -apple-system, sans-serif).

---

## Estrutura de telas (frames principais)

| Frame   | Nome     | Conteúdo |
|--------|----------|----------|
| 153:363 | 26       | **Emissões** – lista de cards de voos, header com "Emissões", filtros (Companhias, datas, Filtros), menu inferior |
| 153:502 | 27       | **Balcão** – abas "Compra" / "Venda", lista de cards de ofertas (avatar, nome, rating, "150k Flying Club", botões "Fazer oferta" / "Iniciar Venda") |
| 153:629 | 28       | **Balcão** (variante) – mesmo layout com filtros "Companhias", "Mais recentes primeiro", "Filtros" |
| 153:767 | 29       | **Balcão** – lista de cards similar |
| Outros  | Detalhe  | Calendário (Calendar/date), "Nova Ordem de Balcão", "Solicitar no balcão", "Criar Oferta de Compra" |

---

## Componentes recorrentes

- **card** – Card de oferta (área de imagem ~100px altura + bloco inferior com texto e ações).
- **Menu** – Barra inferior com 4 itens: Emissões, Balcão, Promoções, Conta.
- **Avatar / Image-24** – Avatar 24×24 (vendedor/agência).
- **Calendar/date** – Célula de calendário (ex.: 48×48); estados disponível/indisponível.
- **Frame 26 / Frame 27** – Botões "Fazer oferta" e "Iniciar Venda" (altura ~32px).

---

## Ícones (nomes no Figma)

| Uso        | Nome no Figma |
|-----------|----------------|
| Emissões  | `clarity:plane-line` |
| Balcão    | `streamline-freehand:business-deal-handshake` |
| Promoções | `streamline-ultimate:tag-dollar` |
| Conta     | `clarity:avatar-line` |
| Filtros   | `mynaui:filter-solid` |
| Voltar    | `weui:back-outlined` |

Exportar ícones do Figma ou usar equivalentes (lucide-react, phosphor, etc.) mantendo o mesmo significado.

---

## Imagens

- **Cards de oferta:** área superior do card (~345×100 ou 345×89) para imagem do destino/companhia.
- **Avatar / Image-24:** 24×24 para avatar do vendedor/agência.
- **image 2 (rounded-rectangle):** usado como placeholder para logo da companhia aérea (ex.: 77×18, 31×18, 63×15).

Obter assets exportados pelo Figma (Export ou Figma MCP) e colocar em `src/assets/` ou `public/`.

---

## Textos de referência (UI)

- **Menu:** Emissões | Balcão | Promoções | Conta
- **Abas Balcão:** Compra | Venda
- **Filtros:** Companhias, intervalo de datas, "Filtros"; "Mais recentes primeiro"
- **Cards:** "patrocinado", "★4,8", "Agencia Turismo", "voo direto", "1 parada", "1 conexão", "EXECUTIVA", "Marcelo Campos", "★4,8 • 5 negociações", "150k Flying Club", "150k Flying Club @ 94R$", "aprox R$14.100", "Fazer oferta", "Iniciar Venda"
- **Headers:** "Virgin Atlantic", "1400 ofertas de compra"
- **Detalhe/Calendário:** "Disponível", "Indisponível", "Solicitar no balcão", "Nova Ordem de Balcão", "Criar Oferta de Compra"

---

## Como obter mais detalhes do Figma

- **Código/estilo por nó:** Chamar `get_design_context` com `fileKey: WRUTH077tmWjsCqs3ZwTVS` e `nodeId` do frame desejado (ex.: `153:363`, `153:365`, `153:504`).
- **Variáveis (cores, tipos):** `get_variable_defs` com o mesmo `fileKey` e `nodeId` (se o arquivo usar variáveis).
- **Screenshot:** Incluído em `get_design_context` para referência visual.

Implementar o app em `src/` conforme [Especificacao-Tecnica-Milhas-Balcao.md](./Especificacao-Tecnica-Milhas-Balcao.md) e usar esta referência para alinhar tipografia, ícones e estrutura ao Figma.
