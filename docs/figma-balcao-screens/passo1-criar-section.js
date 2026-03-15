/**
 * Passo 1/2: Cria apenas a section "Balcao App - Telas" na página atual.
 * Executar primeiro; depois executar passo2-criar-23-frames.js
 */
(async () => {
  const page = figma.currentPage;
  let section = page.findOne(n => n.type === 'SECTION' && n.name === 'Balcao App - Telas');
  if (section) section.remove();
  section = figma.createSection();
  section.name = 'Balcao App - Telas';
  section.x = 0;
  section.y = 0;
  section.fills = [{ type: 'SOLID', color: { r: 0.12, g: 0.12, b: 0.12, a: 1 } }];
  page.insertChild(0, section);
  figma.notify('Passo 1/2: Section criada');
  return { ok: true, sectionId: section.id };
})();
