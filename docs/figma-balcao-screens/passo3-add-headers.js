/**
 * Passo 3a: Adiciona header (titulo) em cada um dos 23 frames.
 * Executar com Desktop Bridge ligado.
 */
(async () => {
  const W = 393;
  const C = { card: { r: 1, g: 0.992, b: 0.984 }, primary: { r: 0.427, g: 0.161, b: 0.196 } };
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const section = figma.currentPage.findOne(n => n.type === 'SECTION' && n.name === 'Balcao App - Telas');
  if (!section) { figma.notify('Section nao encontrada'); return { ok: false }; }
  const titles = { 'Contrato':'Contrato','Emissoes':'Emissoes','Balcao':'Balcao','Promocoes':'Promocoes','Conta':'Conta','Filtros':'Filtros','Configuracoes':'Configuracoes','Admin Panel':'Admin Panel','Admin Add Emission':'Add Emissao','Admin Select Dates':'Selecionar datas','Admin Add Promotion':'Add Promocao','Admin Add Success':'Sucesso','Editar Perfil':'Editar perfil','Planos':'Planos','Plan Success':'Tudo pronto','Create Ad':'Criar anuncio','Select Ad Plan':'Escolher plano','Ad Success':'Anuncio criado','Minhas Vendas':'Minhas Vendas','Detalhe Venda':'Detalhe venda','Create Purchase Offer':'Criar oferta','Make Offer':'Fazer oferta','Detalhe Voo':'Detalhe voo' };
  for (const frame of section.children) {
    if (frame.type !== 'FRAME') continue;
    const header = figma.createFrame();
    header.name = 'header';
    header.resize(W, 72);
    header.fills = [{ type: 'SOLID', color: C.card }];
    header.bottomLeftRadius = header.bottomRightRadius = 16;
    const t = figma.createText();
    t.characters = titles[frame.name] || frame.name;
    t.fontSize = 24;
    t.fills = [{ type: 'SOLID', color: C.primary }];
    t.x = 20; t.y = 20;
    header.appendChild(t);
    frame.appendChild(header);
  }
  figma.notify('Passo 3a: Headers adicionados');
  return { ok: true };
})();
