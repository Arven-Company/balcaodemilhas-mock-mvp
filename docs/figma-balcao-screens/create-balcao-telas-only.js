/**
 * Cria APENAS a section + 23 frames (sem texto) para testar se o Figma executa.
 * Se isto aparecer no Figma, o problema era loadFontAsync/createText.
 * Uso: figma_execute com este código na página atual.
 */
(async () => {
  const SCREENS = ['Contrato','Emissoes','Balcao','Promocoes','Conta','Filtros','Configuracoes','Admin Panel','Admin Add Emission','Admin Select Dates','Admin Add Promotion','Admin Add Success','Editar Perfil','Planos','Plan Success','Create Ad','Select Ad Plan','Ad Success','Minhas Vendas','Detalhe Venda','Create Purchase Offer','Make Offer','Detalhe Voo'];
  const W = 393, H = 852, GAP = 24, COLS = 4;
  const bg = { r: 0.973, g: 0.961, b: 0.945 };

  const page = figma.currentPage;
  let section = page.findOne(n => n.type === 'SECTION' && n.name === 'Balcao App - Telas');
  if (section) section.remove();

  section = figma.createSection();
  section.name = 'Balcao App - Telas';
  section.x = 0;
  section.y = 0;
  section.fills = [{ type: 'SOLID', color: { r: 0.12, g: 0.12, b: 0.12, a: 1 } }];
  page.insertChild(0, section);

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
  figma.notify('Balcao: criadas ' + section.children.length + ' telas na pagina ' + page.name);
  return { ok: true, page: page.name, frames: section.children.length };
})();
