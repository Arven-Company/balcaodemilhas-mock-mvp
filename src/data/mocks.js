import { FIGMA_ASSETS } from '../assets/figma-assets'

export const MOCK_EMISSOES = [
  {
    id: '1',
    image: FIGMA_ASSETS.cardImg1,
    route: 'São Paulo - Roma',
    detail: '1 semana',
    labelRight: 'ida e volta',
    price: '3.000R$',
    executiva: true,
    agent: 'Agencia Turismo',
    rating: '★4,8',
    sponsor: true,
  },
  {
    id: '2',
    image: FIGMA_ASSETS.cardImg2,
    period: 'Set/25 a out/25',
    route: 'Frankfurt - São Paulo',
    labelRight: 'a partir de',
    price: '120.000 milhas',
    airlineLogo: FIGMA_ASSETS.airlineLogo,
    type: 'voo direto',
    executiva: true,
  },
  {
    id: '3',
    image: FIGMA_ASSETS.cardImg3,
    period: 'Set/25 a out/25',
    route: 'Rio - São Paulo',
    labelRight: 'a partir de',
    price: '3.200 milhas',
    type: '1 parada',
    executiva: true,
  },
  {
    id: '4',
    image: FIGMA_ASSETS.cardImg1,
    period: 'Set/25 a out/25',
    route: 'Frankfurt - São Paulo',
    labelRight: 'a partir de',
    price: '12000 milhas',
    type: '1 conexão',
    executiva: true,
  },
  {
    id: '5',
    image: FIGMA_ASSETS.cardImg2,
    period: 'Set/25 a out/25',
    route: 'Frankfurt - São Paulo',
    labelRight: 'a partir de',
    price: '12000 milhas',
    type: '1 conexão',
    executiva: true,
  },
]

export const MOCK_BALCAO_COMPRA = [
  { id: 'b1', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club', avatar: FIGMA_ASSETS.avatar },
  { id: 'b2', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club', avatar: FIGMA_ASSETS.avatar },
  { id: 'b3', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club @ 94R$', approx: 'aprox R$14.100', avatar: FIGMA_ASSETS.avatar },
  { id: 'b4', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club', avatar: FIGMA_ASSETS.avatar },
  { id: 'b5', name: 'Marcelo Campos', rating: '★4,8', negociacoes: '5 negociações', miles: '150k Flying Club', avatar: FIGMA_ASSETS.avatar },
]

export const MOCK_BALCAO_VENDA = [
  { id: 'v1', name: 'Ana Silva', rating: '★4,9', negociacoes: '12 negociações', miles: '80k Smiles', avatar: FIGMA_ASSETS.avatar },
  { id: 'v2', name: 'Pedro Costa', rating: '★4,7', negociacoes: '3 negociações', miles: '200k TAP', avatar: FIGMA_ASSETS.avatar },
]

export const MOCK_PROMOCOES = [
  { id: 'p1', title: 'Black Friday Milhas', category: 'Desconto', validade: 'Válido até 30/11/2025', image: FIGMA_ASSETS.cardImg1 },
  { id: 'p2', title: 'Flying Club em dobro', category: 'Acumule', validade: 'Válido até 15/12/2025', image: FIGMA_ASSETS.cardImg2 },
  { id: 'p3', title: 'Cashback em milhas', category: 'Parceiros', validade: 'Válido até 31/12/2025', image: FIGMA_ASSETS.cardImg3 },
]
