/**
 * Passo 4 lote 1/4: Preenche frames Contrato, Emissoes, Balcao, Promocoes, Conta, Filtros com conteudo fiel.
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
  function addRow(frame, y, leftText, rightText) {
    const row = figma.createFrame();
    row.x = 20; row.y = y;
    row.resize(W - 40, 48);
    row.fills = [];
    const l = figma.createText();
    l.characters = leftText;
    l.fontSize = 14;
    l.fills = [{ type: 'SOLID', color: C.text }];
    l.y = 14;
    row.appendChild(l);
    if (rightText) {
      const r = figma.createText();
      r.characters = rightText;
      r.fontSize = 14;
      r.fills = [{ type: 'SOLID', color: C.muted }];
      r.x = W - 40 - 80; r.y = 14;
      row.appendChild(r);
    }
    frame.appendChild(row);
  }
  const configs = {
    Contrato: (f) => { addHeader(f, 'Contrato'); addCard(f, 88, 'Texto do contrato...', 200); addCard(f, 304, 'Aceitar', 44); addCard(f, 364, 'Ignorar', 44); },
    Emissoes: (f) => { addHeader(f, 'Emissoes'); addCard(f, 88, 'Companhias - 10.02-12/03 - Filtros', 44); addCard(f, 148, 'Sao Paulo - Roma  R$ 3.240', 132); addCard(f, 296, 'Frankfurt - Sao Paulo  120.000 milhas', 132); addCard(f, 444, 'Rio - Lisboa  R$ 2.890', 132); },
    Balcao: (f) => { addHeader(f, 'Balcao'); addRow(f, 80, 'Compra', 'Venda'); addCard(f, 136, 'Virgin Atlantic - 3 ofertas', 44); addCard(f, 196, 'Nome - 4,8 - 12 neg.  85.000 mi', 88); addCard(f, 300, 'Nome - 4,9 - 8 neg.  72.000 mi', 88); },
    Promocoes: (f) => { addHeader(f, 'Promocoes'); addCard(f, 88, 'Promo 1', 72); addCard(f, 176, 'Promo 2', 72); },
    Conta: (f) => { addHeader(f, 'Conta'); addCard(f, 88, 'Usuario  Plano Basico  Editar perfil', 100); addCard(f, 204, 'Anunciar na Aba Emissoes', 64); addRow(f, 284, 'Minhas Vendas', '>'); addRow(f, 332, 'Historico de vendas', null); addRow(f, 380, 'Planos de assinatura', null); addRow(f, 428, 'Contrato de Intermediacao', null); addRow(f, 476, 'Configuracoes', null); },
    Filtros: (f) => { addHeader(f, 'Filtros'); addCard(f, 88, 'Companhias', 48); addCard(f, 152, 'Datas', 48); }
  };
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const section = figma.currentPage.findOne(n => n.type === 'SECTION' && n.name === 'Balcao App - Telas');
  if (!section) { figma.notify('Section nao encontrada'); return { ok: false }; }
  const names = ['Contrato', 'Emissoes', 'Balcao', 'Promocoes', 'Conta', 'Filtros'];
  for (const name of names) {
    const frame = section.children.find(c => c.name === name);
    if (!frame || frame.type !== 'FRAME') continue;
    while (frame.children.length > 0) frame.children[0].remove();
    if (configs[name]) configs[name](frame);
  }
  figma.notify('Passo 4 lote 1: 6 telas preenchidas');
  return { ok: true };
})();
