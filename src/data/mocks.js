import { FIGMA_ASSETS } from '../assets/figma-assets'

/* Emissões: ofertas de voos — destinos Brasil e Europa, preços em R$ ou milhas */
export const MOCK_EMISSOES = [
  {
    id: 'emi-1',
    image: FIGMA_ASSETS.cardImg1,
    route: 'São Paulo - Roma',
    detail: '1 semana',
    labelRight: 'ida e volta',
    price: 'R$ 3.240',
    executiva: true,
    agent: 'Agência Turismo',
    rating: '★4,8',
    sponsor: true,
    airlineLogo: null,
    type: null,
  },
  {
    id: 'emi-2',
    image: FIGMA_ASSETS.cardImg2,
    period: 'Set/25 a out/25',
    route: 'Frankfurt - São Paulo',
    labelRight: 'a partir de',
    price: '120.000 milhas',
    airlineLogo: FIGMA_ASSETS.airlineLogo,
    type: 'voo direto',
    executiva: true,
    agent: null,
    sponsor: false,
  },
  {
    id: 'emi-3',
    image: FIGMA_ASSETS.cardImg3,
    period: 'Out/25 a nov/25',
    route: 'Rio de Janeiro - Lisboa',
    labelRight: 'a partir de',
    price: 'R$ 2.890',
    type: '1 parada',
    executiva: true,
    agent: null,
    rating: null,
    sponsor: false,
    airlineLogo: FIGMA_ASSETS.airlineLogo,
  },
  {
    id: 'emi-4',
    image: FIGMA_ASSETS.cardImg1,
    period: 'Set/25 a out/25',
    route: 'Belo Horizonte - Paris',
    labelRight: 'a partir de',
    price: '95.000 milhas',
    type: '1 conexão',
    executiva: true,
    agent: null,
    airlineLogo: FIGMA_ASSETS.airlineLogo,
    sponsor: false,
  },
  {
    id: 'emi-5',
    image: FIGMA_ASSETS.cardImg2,
    period: 'Out/25',
    route: 'São Paulo - Madrid',
    labelRight: 'ida e volta',
    price: 'R$ 4.100',
    type: 'voo direto',
    executiva: false,
    agent: 'Carlos Mendes',
    rating: '★4,7',
    sponsor: true,
    airlineLogo: null,
  },
  {
    id: 'emi-6',
    image: FIGMA_ASSETS.cardImg3,
    period: 'Nov/25',
    route: 'Recife - Lisboa',
    labelRight: 'a partir de',
    price: '78.000 milhas',
    type: 'voo direto',
    executiva: true,
    agent: null,
    airlineLogo: FIGMA_ASSETS.airlineLogo,
    sponsor: false,
  },
]

/* Cards alternativos (Figma node 224-743) — variantes para tela de teste de emissões */
export const TEST_EMISSOES_CARDS = [
  { id: 'test-1', variant: 'a', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club', avatar: FIGMA_ASSETS.avatar },
  { id: 'test-2', variant: 'b', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club', approx: '@ R$94', total: 'R$14.100', avatar: FIGMA_ASSETS.avatar },
  { id: 'test-3', variant: 'c', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', cols: [{ label: 'Flying Club', value: '150k' }, { label: 'Milheiro', value: 'R$90' }, { label: 'Total', value: 'R$90.000' }], avatar: FIGMA_ASSETS.avatar },
  { id: 'test-4', variant: 'd', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club', total: 'R$14.100', approx: '@ R$94', avatar: FIGMA_ASSETS.avatar },
  { id: 'test-5', variant: 'e', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', cols: [{ label: 'Flying Club', value: '150k' }, { label: 'Milheiro', value: 'R$90' }], avatar: FIGMA_ASSETS.avatar },
]

/* RF-EMI-03: fontes de dados (rodapé Emissões) */
export const MOCK_FONTES_EMISSOES = [
  { id: 'f1', label: 'Google Flights', url: 'https://www.google.com/flights' },
  { id: 'f2', label: 'Skyscanner', url: 'https://www.skyscanner.com.br' },
  { id: 'f3', label: 'Companhias aéreas (dados agregados)', url: '#' },
]

/* Balcão Compra: ofertas de vendedores — nomes brasileiros, valores em R$ para contraproposta */
export const MOCK_BALCAO_COMPRA = [
  { id: 'compra-1', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club', approx: 'aprox R$ 14.100', originalValue: 14100, avatar: FIGMA_ASSETS.avatar, airlineLogo: FIGMA_ASSETS.airlineLogo, companhia: 'Flying Club' },
  { id: 'compra-2', name: 'Ana Paula Santos', rating: '★4,9', negociacoes: '12 negociações', miles: '80k Smiles', approx: 'aprox R$ 7.600', originalValue: 7600, avatar: FIGMA_ASSETS.avatar, airlineLogo: FIGMA_ASSETS.airlineLogo, companhia: 'Smiles' },
  { id: 'compra-3', name: 'Roberto Oliveira', rating: '★4,7', negociacoes: '3 negociações', miles: '200k TAP', approx: 'aprox R$ 18.000', originalValue: 18000, avatar: FIGMA_ASSETS.avatar, airlineLogo: FIGMA_ASSETS.airlineLogo, companhia: 'TAP' },
  { id: 'compra-4', name: 'Juliana Costa', rating: '★4,8', negociacoes: '8 negociações', miles: '150k Flying Club @ R$ 94', approx: 'aprox R$ 14.100', originalValue: 14100, avatar: FIGMA_ASSETS.avatar, airlineLogo: FIGMA_ASSETS.airlineLogo, companhia: 'Flying Club' },
  { id: 'compra-5', name: 'Lucas Ferreira', rating: '★4,6', negociacoes: '2 negociações', miles: '100k Latam', approx: 'aprox R$ 9.200', originalValue: 9200, avatar: FIGMA_ASSETS.avatar, airlineLogo: FIGMA_ASSETS.airlineLogo, companhia: 'Latam' },
]

/* Balcão Venda: pedidos de compradores */
export const MOCK_BALCAO_VENDA = [
  { id: 'venda-1', name: 'Patricia Almeida', rating: '★4,9', negociacoes: '15 negociações', miles: '80k Smiles', approx: 'aprox R$ 7.600', originalValue: 7600, avatar: FIGMA_ASSETS.avatar, airlineLogo: FIGMA_ASSETS.airlineLogo, companhia: 'Smiles' },
  { id: 'venda-2', name: 'Ricardo Souza', rating: '★4,7', negociacoes: '4 negociações', miles: '200k TAP', approx: 'aprox R$ 18.000', originalValue: 18000, avatar: FIGMA_ASSETS.avatar, airlineLogo: FIGMA_ASSETS.airlineLogo, companhia: 'TAP' },
  { id: 'venda-3', name: 'Camila Rocha', rating: '★4,8', negociacoes: '6 negociações', miles: '120k Azul', approx: 'aprox R$ 11.400', originalValue: 11400, avatar: FIGMA_ASSETS.avatar, airlineLogo: FIGMA_ASSETS.airlineLogo, companhia: 'Azul' },
]

export const MOCK_PROMOCOES = [
  {
    id: 'p1',
    title: 'Black Friday Milhas',
    category: 'Desconto',
    validade: 'Válido até 30/11/2025',
    image: FIGMA_ASSETS.cardImg1,
    content: [
      { type: 'paragraph', text: 'Aproveite descontos exclusivos na conversão de milhas durante a Black Friday.' },
      { type: 'list', items: ['Até 20% de bônus em milhas', 'Válido para todas as companhias parceiras', 'Promoção por tempo limitado'] },
      { type: 'note', text: 'Oferta válida apenas para primeiras 1000 conversões.' },
    ],
    cupons: [
      { id: 'c1', code: 'BLACK20', desc: '20% de bônus' },
      { id: 'c2', code: 'MILHAS10', desc: '10% extra' },
    ],
  },
  {
    id: 'p2',
    title: 'Flying Club em dobro',
    category: 'Acumule',
    validade: 'Válido até 15/12/2025',
    image: FIGMA_ASSETS.cardImg2,
    content: [
      { type: 'paragraph', text: 'Acumule o dobro de milhas em voos selecionados da Virgin Atlantic.' },
      { type: 'list', items: ['Válido em classe econômica e executiva', 'Registro prévio necessário'] },
    ],
    cupons: [
      { id: 'c3', code: 'FLY2X', desc: 'Dobro de milhas' },
    ],
  },
  {
    id: 'p3',
    title: 'Cashback em milhas',
    category: 'Parceiros',
    validade: 'Válido até 31/12/2025',
    image: FIGMA_ASSETS.cardImg3,
    content: [
      { type: 'paragraph', text: 'Ganhe cashback em milhas em compras com parceiros.' },
      { type: 'paragraph', text: 'Ative o cupom antes de finalizar a compra no site do parceiro.' },
    ],
    cupons: [
      { id: 'c4', code: 'CASH5', desc: '5% em milhas' },
      { id: 'c5', code: 'CASH15', desc: '15% em milhas' },
    ],
  },
]

export const MOCK_HISTORICO_VENDAS = [
  { id: 'h1', date: '10/03/2025', type: 'Venda', miles: '150k Flying Club', value: 'R$ 14.100', status: 'Concluída' },
  { id: 'h2', date: '08/03/2025', type: 'Compra', miles: '80k Smiles', value: 'R$ 7.200', status: 'Concluída' },
  { id: 'h3', date: '05/03/2025', type: 'Venda', miles: '200k TAP', value: 'R$ 18.000', status: 'Concluída' },
]

export const MOCK_PLANOS = [
  { id: 'pl1', name: 'Básico', price: 'Grátis', features: ['Até 3 ofertas/mês', 'Suporte por email'] },
  { id: 'pl2', name: 'Pro', price: 'R$ 29/mês', features: ['Ofertas ilimitadas', 'Suporte prioritário', 'Relatórios'] },
  { id: 'pl3', name: 'Empresa', price: 'R$ 99/mês', features: ['Tudo do Pro', 'API', 'Gestão de equipe'] },
]
