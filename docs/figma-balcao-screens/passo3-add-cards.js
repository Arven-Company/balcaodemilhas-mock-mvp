/**
 * Passo 3b: Adiciona 1 card em cada frame (abaixo do header).
 * Executar depois de passo3-add-headers.js
 */
(async () => {
  const W = 393;
  const C = { card: { r: 1, g: 0.992, b: 0.984 }, text: { r: 0.239, g: 0.173, b: 0.18 }, border: { r: 0.91, g: 0.847, b: 0.769 } };
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const section = figma.currentPage.findOne(n => n.type === 'SECTION' && n.name === 'Balcao App - Telas');
  if (!section) { figma.notify('Section nao encontrada'); return { ok: false }; }
  for (const frame of section.children) {
    if (frame.type !== 'FRAME') continue;
    const card = figma.createFrame();
    card.name = 'card';
    card.x = 20; card.y = 88;
    card.resize(W - 40, 80);
    card.fills = [{ type: 'SOLID', color: C.card }];
    card.cornerRadius = 16;
    card.strokes = [{ type: 'SOLID', color: C.border }];
    card.strokeWeight = 1;
    const t = figma.createText();
    t.characters = 'Conteudo - ' + frame.name;
    t.fontSize = 14;
    t.fills = [{ type: 'SOLID', color: C.text }];
    t.x = 16; t.y = 12;
    card.appendChild(t);
    frame.appendChild(card);
  }
  figma.notify('Passo 3b: Cards adicionados');
  return { ok: true };
})();
