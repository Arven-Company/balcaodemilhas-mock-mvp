/**
 * Passo 4 lote 3/4: Preenche Editar Perfil, Planos, Plan Success, Create Ad, Select Ad Plan, Ad Success.
 */
(async () => {
  const W = 393;
  const C = { card: { r: 1, g: 0.992, b: 0.984 }, primary: { r: 0.427, g: 0.161, b: 0.196 }, text: { r: 0.239, g: 0.173, b: 0.18 }, border: { r: 0.91, g: 0.847, b: 0.769 }, muted: { r: 0.42, g: 0.365, b: 0.373 } };
  function addHeader(frame, title) {
    const header = figma.createFrame();
    header.name = 'header';
    header.resize(W, 72);
    header.fills = [{ type: 'SOLID', color: C.card }];
    header.bottomLeftRadius = header.bottomRightRadius = 16;
    header.clipsContent = false;
    const t = figma.createText();
    t.characters = title;
    t.fontSize = 24;
    t.fills = [{ type: 'SOLID', color: C.primary }];
    t.x = 20; t.y = 20;
    header.appendChild(t);
    frame.appendChild(header);
  }
  function addCard(frame, y, label, h) {
    if (h === undefined) h = 80;
    const card = figma.createFrame();
    card.name = 'card';
    card.x = 20; card.y = y;
    card.resize(W - 40, h);
    card.fills = [{ type: 'SOLID', color: C.card }];
    card.cornerRadius = 16;
    card.strokes = [{ type: 'SOLID', color: C.border }];
    card.strokeWeight = 1;
    const t = figma.createText();
    t.characters = label;
    t.fontSize = 14;
    t.fills = [{ type: 'SOLID', color: C.text }];
    t.x = 16; t.y = 12;
    card.appendChild(t);
    frame.appendChild(card);
  }
  const configs = {
    'Editar Perfil': (f) => { addHeader(f, 'Editar perfil'); addCard(f, 88, 'Nome, avatar...', 120); },
    Planos: (f) => { addHeader(f, 'Planos'); addCard(f, 88, 'Plano Basico', 72); addCard(f, 176, 'Plano Pro', 72); },
    'Plan Success': (f) => { addHeader(f, 'Tudo pronto'); addCard(f, 88, 'Plano ativado.', 80); },
    'Create Ad': (f) => { addHeader(f, 'Criar anuncio'); addCard(f, 88, 'Dados do anuncio', 120); },
    'Select Ad Plan': (f) => { addHeader(f, 'Escolher plano'); addCard(f, 88, 'Plano 1  R$ ...', 64); addCard(f, 168, 'Plano 2', 64); },
    'Ad Success': (f) => { addHeader(f, 'Anuncio criado'); addCard(f, 88, 'Sucesso.', 60); }
  };
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const section = figma.currentPage.findOne(n => n.type === 'SECTION' && n.name === 'Balcao App - Telas');
  if (!section) { figma.notify('Section nao encontrada'); return { ok: false }; }
  const names = ['Editar Perfil', 'Planos', 'Plan Success', 'Create Ad', 'Select Ad Plan', 'Ad Success'];
  for (const name of names) {
    const frame = section.children.find(c => c.name === name);
    if (!frame || frame.type !== 'FRAME') continue;
    while (frame.children.length > 0) frame.children[0].remove();
    if (configs[name]) configs[name](frame);
  }
  figma.notify('Passo 4 lote 3: 6 telas preenchidas');
  return { ok: true };
})();
