/**
 * Replica no Figma a estrutura exata do app (header, cores, blocos).
 * Cores: variables.css --color-bg #F8F5F1, --color-bg-card #FFFDFB, --color-primary #6D2932, etc.
 */
const SCREENS = [
  'Contrato', 'Emissões', 'Balcão', 'Promoções', 'Conta',
  'Filtros', 'Configurações', 'Admin Panel', 'Admin Add Emission',
  'Admin Select Dates', 'Admin Add Promotion', 'Admin Add Success',
  'Editar Perfil', 'Planos', 'Plan Success', 'Create Ad', 'Select Ad Plan',
  'Ad Success', 'Minhas Vendas', 'Detalhe Venda', 'Create Purchase Offer',
  'Make Offer', 'Detalhe Voo'
];
const W = 393, H = 852, GAP = 24, COLS = 4;
const C = {
  bg: { r: 0.973, g: 0.961, b: 0.945 },
  card: { r: 1, g: 0.992, b: 0.984 },
  primary: { r: 0.427, g: 0.161, b: 0.196 },
  text: { r: 0.239, g: 0.173, b: 0.18 },
  border: { r: 0.91, g: 0.847, b: 0.769 },
  muted: { r: 0.42, g: 0.365, b: 0.373 }
};

async function addHeader(frame, title) {
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
  t.x = 20;
  t.y = 20;
  header.appendChild(t);
  frame.appendChild(header);
  return header;
}

function addCard(frame, y, label, h = 80) {
  const card = figma.createFrame();
  card.name = 'card';
  card.x = 20;
  card.y = y;
  card.resize(W - 40, h);
  card.fills = [{ type: 'SOLID', color: C.card }];
  card.cornerRadius = 16;
  card.strokes = [{ type: 'SOLID', color: C.border }];
  card.strokeWeight = 1;
  const t = figma.createText();
  t.characters = label;
  t.fontSize = 14;
  t.fills = [{ type: 'SOLID', color: C.text }];
  t.x = 16;
  t.y = 12;
  card.appendChild(t);
  frame.appendChild(card);
}

function addRow(frame, y, leftText, rightText) {
  const row = figma.createFrame();
  row.x = 20;
  row.y = y;
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
    r.x = W - 40 - 80;
    r.y = 14;
    row.appendChild(r);
  }
  frame.appendChild(row);
}

(async () => {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  let section = figma.currentPage.findOne(n => n.type === 'SECTION' && n.name === 'Balcão App - Telas');
  if (section) section.remove();
  section = figma.createSection();
  section.name = 'Balcão App - Telas';
  section.x = 0;
  section.y = 0;
  section.fills = [{ type: 'SOLID', color: { r: 0.12, g: 0.12, b: 0.12, a: 1 } }];
  figma.currentPage.appendChild(section);

  const configs = {
    'Emissões': (f) => { addHeader(f, 'Emissões'); addCard(f, 88, 'Companhias · 10.02-12/03 · Filtros', 44); addCard(f, 148, 'São Paulo - Roma  R$ 3.240', 132); addCard(f, 296, 'Frankfurt - São Paulo  120.000 milhas', 132); addCard(f, 444, 'Rio - Lisboa  R$ 2.890', 132); },
    'Balcão': (f) => { addHeader(f, 'Balcão'); addRow(f, 80, 'Compra', 'Venda'); addCard(f, 136, 'Virgin Atlantic · 3 ofertas', 44); addCard(f, 196, 'Nome · ★4,8 · 12 neg.  85.000 mi', 88); addCard(f, 300, 'Nome · ★4,9 · 8 neg.  72.000 mi', 88); },
    'Promoções': (f) => { addHeader(f, 'Promoções'); addCard(f, 88, 'Promo 1', 72); addCard(f, 176, 'Promo 2', 72); },
    'Conta': (f) => { addHeader(f, 'Conta'); addCard(f, 88, 'Usuário  Plano Básico  Editar perfil', 100); addCard(f, 204, 'Anunciar na Aba Emissões', 64); addRow(f, 284, 'Minhas Vendas', '›'); addRow(f, 332, 'Histórico de vendas'); addRow(f, 380, 'Planos de assinatura'); addRow(f, 428, 'Contrato de Intermediação'); addRow(f, 476, 'Configurações'); },
    'Contrato': (f) => { addHeader(f, 'Contrato'); addCard(f, 88, 'Texto do contrato...', 200); addCard(f, 304, 'Aceitar', 44); addCard(f, 364, 'Ignorar', 44); },
    'Filtros': (f) => { addHeader(f, 'Filtros'); addCard(f, 88, 'Companhias', 48); addCard(f, 152, 'Datas', 48); },
    'Configurações': (f) => { addHeader(f, 'Configurações'); addCard(f, 88, 'Aparência  Tema escuro [ ]', 52); addCard(f, 156, 'Administração  Painel Administrador →', 52); },
    'Admin Panel': (f) => { addHeader(f, 'Admin Panel'); addCard(f, 88, 'Adicionar Emissão', 52); addCard(f, 156, 'Adicionar Promoção', 52); },
    'Admin Add Emission': (f) => { addHeader(f, 'Adicionar Emissão'); addCard(f, 88, 'Companhia, origem, destino...', 120); },
    'Admin Select Dates': (f) => { addHeader(f, 'Selecionar datas'); addCard(f, 88, 'Calendário', 160); },
    'Admin Add Promotion': (f) => { addHeader(f, 'Adicionar Promoção'); addCard(f, 88, 'Formulário promoção', 120); },
    'Admin Add Success': (f) => { addHeader(f, 'Sucesso'); addCard(f, 88, 'Emissão/Promoção adicionada.', 80); },
    'Editar Perfil': (f) => { addHeader(f, 'Editar perfil'); addCard(f, 88, 'Nome, avatar...', 120); },
    'Planos': (f) => { addHeader(f, 'Planos'); addCard(f, 88, 'Plano Básico', 72); addCard(f, 176, 'Plano Pro', 72); },
    'Plan Success': (f) => { addHeader(f, 'Tudo pronto'); addCard(f, 88, 'Plano ativado.', 80); },
    'Create Ad': (f) => { addHeader(f, 'Criar anúncio'); addCard(f, 88, 'Dados do anúncio', 120); },
    'Select Ad Plan': (f) => { addHeader(f, 'Escolher plano'); addCard(f, 88, 'Plano 1  R$ ...', 64); addCard(f, 168, 'Plano 2', 64); },
    'Ad Success': (f) => { addHeader(f, 'Anúncio criado'); addCard(f, 88, 'Sucesso.', 60); },
    'Minhas Vendas': (f) => { addHeader(f, 'Minhas Vendas'); addCard(f, 88, 'Venda 1', 72); addCard(f, 176, 'Venda 2', 72); },
    'Detalhe Venda': (f) => { addHeader(f, 'Detalhe venda'); addCard(f, 88, 'Stepper: Segurança, Pagamento, Emissão', 120); },
    'Create Purchase Offer': (f) => { addHeader(f, 'Criar oferta de compra'); addCard(f, 88, 'Dados do voo + oferta', 140); },
    'Make Offer': (f) => { addHeader(f, 'Fazer oferta'); addCard(f, 88, 'Contraproposta', 120); },
    'Detalhe Voo': (f) => { addHeader(f, 'Detalhe do voo'); addCard(f, 88, 'Rota, preço, calendário', 180); addCard(f, 284, 'Criar Oferta de Compra', 44); }
  };

  for (let i = 0; i < SCREENS.length; i++) {
    const col = i % COLS, row = Math.floor(i / COLS);
    const frame = figma.createFrame();
    frame.name = SCREENS[i];
    frame.x = col * (W + GAP);
    frame.y = row * (H + GAP);
    frame.resize(W, H);
    frame.fills = [{ type: 'SOLID', color: C.bg }];
    frame.cornerRadius = 8;
    frame.clipsContent = false;
    if (configs[SCREENS[i]]) configs[SCREENS[i]](frame);
    else { addHeader(frame, SCREENS[i]); addCard(frame, 88, 'Conteúdo', 80); }
    section.appendChild(frame);
  }
  section.resize(COLS * (W + GAP) - GAP, Math.ceil(SCREENS.length / COLS) * (H + GAP) - GAP);
  figma.currentPage.selection = [section];
  figma.viewport.scrollAndZoomIntoView([section]);
  return { created: SCREENS.length, sectionId: section.id };
})();
