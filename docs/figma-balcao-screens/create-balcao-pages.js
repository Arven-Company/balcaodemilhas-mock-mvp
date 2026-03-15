/**
 * Script para executar no Figma via Console MCP (figma_execute).
 * Cria uma Section "Balcão App - Telas" e um frame por tela do app (393×852).
 * 
 * Pré-requisito: Figma Desktop aberto, ficheiro aberto, Desktop Bridge a correr.
 */

const SCREENS = [
  'Contrato', 'Emissões', 'Balcão', 'Promoções', 'Conta',
  'Filtros', 'Configurações', 'Admin Panel', 'Admin Add Emission',
  'Admin Select Dates', 'Admin Add Promotion', 'Admin Add Success',
  'Editar Perfil', 'Planos', 'Plan Success', 'Create Ad', 'Select Ad Plan',
  'Ad Success', 'Minhas Vendas', 'Detalhe Venda', 'Create Purchase Offer',
  'Make Offer', 'Detalhe Voo'
];

const FRAME_W = 393;
const FRAME_H = 852;
const GAP = 24;
const COLS = 4;

(async () => {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  let section = figma.currentPage.findOne(n => n.type === 'SECTION' && n.name === 'Balcão App - Telas');
  if (section) {
    section.remove();
  }
  section = figma.createSection();
  section.name = 'Balcão App - Telas';
  section.x = 0;
  section.y = 0;
  section.fills = [{ type: 'SOLID', color: { r: 0.12, g: 0.12, b: 0.12, a: 1 } }];
  figma.currentPage.appendChild(section);

  const ids = [];
  for (let i = 0; i < SCREENS.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const frame = figma.createFrame();
    frame.name = SCREENS[i];
    frame.x = col * (FRAME_W + GAP);
    frame.y = row * (FRAME_H + GAP);
    frame.resize(FRAME_W, FRAME_H);
    frame.fills = [{ type: 'SOLID', color: { r: 0.97, g: 0.97, b: 0.98, a: 1 } }];
    frame.cornerRadius = 8;
    const label = figma.createText();
    label.characters = SCREENS[i];
    label.fontSize = 14;
    label.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2, a: 1 } }];
    label.x = 16;
    label.y = 16;
    frame.appendChild(label);
    section.appendChild(frame);
    ids.push({ name: SCREENS[i], id: frame.id });
  }
  section.resize(COLS * (FRAME_W + GAP) - GAP, Math.ceil(SCREENS.length / COLS) * (FRAME_H + GAP) - GAP);
  figma.currentPage.selection = [section];
  figma.viewport.scrollAndZoomIntoView([section]);
  return { created: SCREENS.length, sectionId: section.id, frameIds: ids };
})();
