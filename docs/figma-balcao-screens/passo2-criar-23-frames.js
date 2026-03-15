/**
 * Passo 2/2: Encontra a section "Balcao App - Telas" e adiciona os 23 frames.
 * Executar depois de passo1-criar-section.js
 */
(async () => {
  const SCREENS = ['Contrato','Emissoes','Balcao','Promocoes','Conta','Filtros','Configuracoes','Admin Panel','Admin Add Emission','Admin Select Dates','Admin Add Promotion','Admin Add Success','Editar Perfil','Planos','Plan Success','Create Ad','Select Ad Plan','Ad Success','Minhas Vendas','Detalhe Venda','Create Purchase Offer','Make Offer','Detalhe Voo'];
  const W = 393, H = 852, GAP = 24, COLS = 4;
  const bg = { r: 0.973, g: 0.961, b: 0.945 };
  const page = figma.currentPage;
  const section = page.findOne(n => n.type === 'SECTION' && n.name === 'Balcao App - Telas');
  if (!section) {
    figma.notify('Erro: executar primeiro passo1-criar-section.js');
    return { ok: false, error: 'Section nao encontrada' };
  }
  for (let i = 0; i < SCREENS.length; i++) {
    const col = i % COLS;
    const rw = Math.floor(i / COLS);
    const frame = figma.createFrame();
    frame.name = SCREENS[i];
    frame.x = col * (W + GAP);
    frame.y = rw * (H + GAP);
    frame.resize(W, H);
    frame.fills = [{ type: 'SOLID', color: bg }];
    frame.cornerRadius = 8;
    section.appendChild(frame);
  }
  section.resize(COLS * (W + GAP) - GAP, Math.ceil(SCREENS.length / COLS) * (H + GAP) - GAP);
  figma.selection = [section];
  figma.viewport.scrollAndZoomIntoView([section]);
  figma.notify('Passo 2/2: ' + section.children.length + ' telas criadas');
  return { ok: true, frames: section.children.length };
})();
