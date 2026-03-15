/**
 * Figma Console / Desktop Bridge ONLY.
 * 1) Creates variable collection "Balcão Design System" with ALL variables from variables.css.
 * 2) Creates section "Balcão App - Telas" and 23 screen frames (solid fills so frames always appear).
 */
(async () => {
  const SCREENS = ['Contrato','Emissões','Balcão','Promoções','Conta','Filtros','Configurações','Admin Panel','Admin Add Emission','Admin Select Dates','Admin Add Promotion','Admin Add Success','Editar Perfil','Planos','Plan Success','Create Ad','Select Ad Plan','Ad Success','Minhas Vendas','Detalhe Venda','Create Purchase Offer','Make Offer','Detalhe Voo'];
  const W = 393, H = 852, GAP = 24, COLS = 4;

  // Usar sempre a página atual (onde tens o ficheiro aberto no Desktop Bridge)
  const targetPage = figma.currentPage;
  try {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  } catch (_) {
    // Se a fonte falhar, continuamos sem texto nas telas
  }

  const hexToRgb = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
  };

  // ----- 1) Variable collection + ALL variables from variables.css -----
  const localCollections = await figma.variables.getLocalVariableCollectionsAsync();
  let collection = localCollections.find(c => c.name === 'Balcão Design System');
  if (!collection) {
    collection = figma.variables.createVariableCollection('Balcão Design System');
  }
  const modeId = collection.modes[0].modeId;
  let localVars = await figma.variables.getLocalVariablesAsync();
  const createdInSession = [];

  function findVar(name) {
    return localVars.find(x => x.name === name && x.variableCollectionId === collection.id)
      || createdInSession.find(x => x.name === name);
  }
  function getOrCreateColor(name, hex) {
    let v = findVar(name);
    if (!v) {
      v = figma.variables.createVariable(name, collection, 'COLOR');
      v.setValueForMode(modeId, hexToRgb(hex));
      createdInSession.push(v);
    }
    return v;
  }
  function getOrCreateFloat(name, value) {
    let v = findVar(name);
    if (!v) {
      v = figma.variables.createVariable(name, collection, 'FLOAT');
      v.setValueForMode(modeId, value);
      createdInSession.push(v);
    }
    return v;
  }
  function getOrCreateString(name, value) {
    let v = findVar(name);
    if (!v) {
      v = figma.variables.createVariable(name, collection, 'STRING');
      v.setValueForMode(modeId, value);
      createdInSession.push(v);
    }
    return v;
  }

  const colorTokens = [
    { key: 'color/primary', hex: '#6D2932' },
    { key: 'color/primary-dark', hex: '#561C24' },
    { key: 'color/accent', hex: '#C7B7A3' },
    { key: 'color/accent-light', hex: '#E8D8C4' },
    { key: 'color/bg', hex: '#F8F5F1' },
    { key: 'color/bg-card', hex: '#FFFDFB' },
    { key: 'color/bg-elevated', hex: '#FFFFFF' },
    { key: 'color/bg-surface', hex: '#FAF7F3' },
    { key: 'color/bg-surface-2', hex: '#F5EFE7' },
    { key: 'color/border', hex: '#E8D8C4' },
    { key: 'color/border-filter', hex: '#E5DED4' },
    { key: 'color/text', hex: '#3d2c2e' },
    { key: 'color/text-secondary', hex: '#5c4a4c' },
    { key: 'color/text-muted', hex: '#6b5d5f' },
    { key: 'color/text-light', hex: '#8a7f81' },
    { key: 'color/nav-active', hex: '#6D2932' },
    { key: 'color/nav-inactive', hex: '#666666' },
    { key: 'color/success', hex: '#0d8050' },
    { key: 'color/success-bg', hex: '#e6f4ee' },
    { key: 'color/warning', hex: '#b35c00' },
    { key: 'color/warning-bg', hex: '#fff4e6' },
    { key: 'color/error', hex: '#c23030' },
    { key: 'color/error-bg', hex: '#fce8e8' },
    { key: 'color/info', hex: '#6D2932' },
    { key: 'color/info-bg', hex: '#F2EAE4' },
    { key: 'color/disabled-bg', hex: '#F0EBE6' },
    { key: 'color/disabled-text', hex: '#9a8f8a' },
    { key: 'color/back-btn-bg', hex: '#E8D8C4' },
    { key: 'color/back-btn-color', hex: '#3d2c2e' },
    { key: 'color/back-btn-hover-bg', hex: '#DDCDB8' }
  ];
  const floatTokens = [
    { key: 'radius/card', value: 16 },
    { key: 'radius/pill', value: 24 },
    { key: 'radius/btn', value: 6 },
    { key: 'radius/modal', value: 20 },
    { key: 'radius/badge', value: 21 },
    { key: 'font/regular', value: 400 },
    { key: 'font/medium', value: 500 },
    { key: 'font/semibold', value: 600 },
    { key: 'font/bold', value: 700 },
    { key: 'text/xs', value: 11 },
    { key: 'text/sm', value: 12 },
    { key: 'text/base', value: 14 },
    { key: 'text/md', value: 16 },
    { key: 'text/lg', value: 18 },
    { key: 'text/xl', value: 24 },
    { key: 'line-height/tight', value: 1.2 },
    { key: 'line-height/normal', value: 1.4 },
    { key: 'line-height/relaxed', value: 1.5 },
    { key: 'space/1', value: 4 },
    { key: 'space/2', value: 6 },
    { key: 'space/3', value: 8 },
    { key: 'space/4', value: 10 },
    { key: 'space/5', value: 12 },
    { key: 'space/6', value: 16 },
    { key: 'space/7', value: 20 },
    { key: 'space/8', value: 24 },
    { key: 'space/9', value: 28 },
    { key: 'space/10', value: 32 },
    { key: 'height/btn', value: 32 },
    { key: 'height/btn-touch', value: 44 },
    { key: 'height/card-image', value: 100 },
    { key: 'size/avatar-sm', value: 24 },
    { key: 'size/avatar-md', value: 32 },
    { key: 'width/app-max', value: 393 },
    { key: 'height/nav', value: 56 }
  ];

  for (const t of colorTokens) getOrCreateColor(t.key, t.hex);
  for (const t of floatTokens) getOrCreateFloat(t.key, t.value);
  getOrCreateString('font/family', 'Schibsted Grotesk');

  const C = { bg: hexToRgb('#F8F5F1'), card: hexToRgb('#FFFDFB'), primary: hexToRgb('#6D2932'), text: hexToRgb('#3d2c2e'), border: hexToRgb('#E8D8C4'), muted: hexToRgb('#6b5d5f') };

  // ----- 2) Helpers: create layers with SOLID fills (no binding) so frames always appear -----
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

  let section = targetPage.findOne(n => n.type === 'SECTION' && n.name === 'Balcão App - Telas');
  if (section) section.remove();
  section = figma.createSection();
  section.name = 'Balcão App - Telas';
  section.x = 0; section.y = 0;
  section.fills = [{ type: 'SOLID', color: { r: 0.12, g: 0.12, b: 0.12, a: 1 } }];
  targetPage.insertChild(0, section);

  const configs = {
    'Emissões': (f) => { addHeader(f,'Emissões'); addCard(f,88,'Companhias · 10.02-12/03 · Filtros',44); addCard(f,148,'São Paulo - Roma  R$ 3.240',132); addCard(f,296,'Frankfurt - São Paulo  120.000 milhas',132); addCard(f,444,'Rio - Lisboa  R$ 2.890',132); },
    'Balcão': (f) => { addHeader(f,'Balcão'); addRow(f,80,'Compra','Venda'); addCard(f,136,'Virgin Atlantic · 3 ofertas',44); addCard(f,196,'Nome · ★4,8 · 12 neg.  85.000 mi',88); addCard(f,300,'Nome · ★4,9 · 8 neg.  72.000 mi',88); },
    'Promoções': (f) => { addHeader(f,'Promoções'); addCard(f,88,'Promo 1',72); addCard(f,176,'Promo 2',72); },
    'Conta': (f) => { addHeader(f,'Conta'); addCard(f,88,'Usuário  Plano Básico  Editar perfil',100); addCard(f,204,'Anunciar na Aba Emissões',64); addRow(f,284,'Minhas Vendas','›'); addRow(f,332,'Histórico de vendas',null); addRow(f,380,'Planos de assinatura',null); addRow(f,428,'Contrato de Intermediação',null); addRow(f,476,'Configurações',null); },
    'Contrato': (f) => { addHeader(f,'Contrato'); addCard(f,88,'Texto do contrato...',200); addCard(f,304,'Aceitar',44); addCard(f,364,'Ignorar',44); },
    'Filtros': (f) => { addHeader(f,'Filtros'); addCard(f,88,'Companhias',48); addCard(f,152,'Datas',48); },
    'Configurações': (f) => { addHeader(f,'Configurações'); addCard(f,88,'Aparência  Tema escuro [ ]',52); addCard(f,156,'Administração  Painel Administrador →',52); },
    'Admin Panel': (f) => { addHeader(f,'Admin Panel'); addCard(f,88,'Adicionar Emissão',52); addCard(f,156,'Adicionar Promoção',52); },
    'Admin Add Emission': (f) => { addHeader(f,'Adicionar Emissão'); addCard(f,88,'Companhia, origem, destino...',120); },
    'Admin Select Dates': (f) => { addHeader(f,'Selecionar datas'); addCard(f,88,'Calendário',160); },
    'Admin Add Promotion': (f) => { addHeader(f,'Adicionar Promoção'); addCard(f,88,'Formulário promoção',120); },
    'Admin Add Success': (f) => { addHeader(f,'Sucesso'); addCard(f,88,'Emissão/Promoção adicionada.',80); },
    'Editar Perfil': (f) => { addHeader(f,'Editar perfil'); addCard(f,88,'Nome, avatar...',120); },
    'Planos': (f) => { addHeader(f,'Planos'); addCard(f,88,'Plano Básico',72); addCard(f,176,'Plano Pro',72); },
    'Plan Success': (f) => { addHeader(f,'Tudo pronto'); addCard(f,88,'Plano ativado.',80); },
    'Create Ad': (f) => { addHeader(f,'Criar anúncio'); addCard(f,88,'Dados do anúncio',120); },
    'Select Ad Plan': (f) => { addHeader(f,'Escolher plano'); addCard(f,88,'Plano 1  R$ ...',64); addCard(f,168,'Plano 2',64); },
    'Ad Success': (f) => { addHeader(f,'Anúncio criado'); addCard(f,88,'Sucesso.',60); },
    'Minhas Vendas': (f) => { addHeader(f,'Minhas Vendas'); addCard(f,88,'Venda 1',72); addCard(f,176,'Venda 2',72); },
    'Detalhe Venda': (f) => { addHeader(f,'Detalhe venda'); addCard(f,88,'Stepper: Segurança, Pagamento, Emissão',120); },
    'Create Purchase Offer': (f) => { addHeader(f,'Criar oferta de compra'); addCard(f,88,'Dados do voo + oferta',140); },
    'Make Offer': (f) => { addHeader(f,'Fazer oferta'); addCard(f,88,'Contraproposta',120); },
    'Detalhe Voo': (f) => { addHeader(f,'Detalhe do voo'); addCard(f,88,'Rota, preço, calendário',180); addCard(f,284,'Criar Oferta de Compra',44); }
  };

  for (let i = 0; i < SCREENS.length; i++) {
    const col = i % COLS, rw = Math.floor(i / COLS);
    const frame = figma.createFrame();
    frame.name = SCREENS[i];
    frame.x = col * (W + GAP);
    frame.y = rw * (H + GAP);
    frame.resize(W, H);
    frame.fills = [{ type: 'SOLID', color: C.bg }];
    frame.cornerRadius = 8;
    frame.clipsContent = false;
    try {
      if (configs[SCREENS[i]]) configs[SCREENS[i]](frame);
      else { addHeader(frame, SCREENS[i]); addCard(frame, 88, 'Conteúdo', 80); }
    } catch (_) {
      // Falha em header/card não impede o frame de ser adicionado
    }
    section.appendChild(frame);
  }
  section.resize(COLS * (W + GAP) - GAP, Math.ceil(SCREENS.length / COLS) * (H + GAP) - GAP);
  figma.selection = [section];
  figma.viewport.scrollAndZoomIntoView([section]);
  figma.notify('Balcão: ' + section.children.length + ' telas na página "' + targetPage.name + '"');
  return { ok: true, variables: colorTokens.length + floatTokens.length + 1, screens: section.children.length, sectionId: section.id };
})();
