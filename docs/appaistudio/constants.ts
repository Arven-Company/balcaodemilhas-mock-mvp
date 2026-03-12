import { FlightDeal, MarketOffer, User, Promotion } from './types';

export const MOCK_USER: User = {
  name: 'Marcelo Campos',
  avatarUrl: 'https://i.pravatar.cc/150?u=marcelo',
  rating: 4.8,
  reviews: 5,
};

export const MOCK_FLIGHT_DEALS: FlightDeal[] = [
  {
    id: '1',
    from: 'São Paulo',
    to: 'Roma',
    priceBRL: 3000,
    airline: 'Agência Turismo',
    airlineLogoUrl: 'https://logo.clearbit.com/latam.com',
    imageUrl: 'https://picsum.photos/seed/rome/400/200',
    duration: '1 semana',
    sponsored: true,
    sponsor: {
      name: 'Agência Turismo',
      rating: 4.8,
    },
  },
  {
    id: '2',
    from: 'Frankfurt',
    to: 'São Paulo',
    priceMiles: 120000,
    airline: 'Iberia',
    airlineLogoUrl: 'https://logo.clearbit.com/iberia.com',
    imageUrl: 'https://picsum.photos/seed/frankfurt/400/200',
    duration: 'Voo direto',
  },
  {
    id: '3',
    from: 'Rio',
    to: 'São Paulo',
    priceBRL: 3200,
    airline: 'KLM',
    airlineLogoUrl: 'https://logo.clearbit.com/klm.com',
    imageUrl: 'https://picsum.photos/seed/rio/400/200',
    duration: '1 parada',
  },
  {
    id: '4',
    from: 'Lisboa',
    to: 'Recife',
    priceMiles: 95000,
    airline: 'TAP Air Portugal',
    airlineLogoUrl: 'https://logo.clearbit.com/flytap.com',
    imageUrl: 'https://picsum.photos/seed/lisbon/400/200',
    duration: 'Voo direto',
  }
];

// Represents what a user SEES on the "Venda" tab. These are requests TO SELL.
export const MOCK_MARKET_OFFERS: MarketOffer[] = [
  {
    id: 'o1',
    user: MOCK_USER,
    airline: 'Virgin Atlantic',
    airlineLogoUrl: 'https://logo.clearbit.com/virginatlantic.com',
    miles: 150000,
  },
  {
    id: 'o2',
    user: { ...MOCK_USER, name: 'Ana Silva', avatarUrl: 'https://i.pravatar.cc/150?u=ana' },
    airline: 'Virgin Atlantic',
    airlineLogoUrl: 'https://logo.clearbit.com/virginatlantic.com',
    miles: 150000,
  },
  {
    id: 'o3',
    user: MOCK_USER,
    airline: 'Virgin Atlantic',
    airlineLogoUrl: 'https://logo.clearbit.com/virginatlantic.com',
    miles: 150000,
    pricePerThousand: 94,
    totalPrice: 14100,
  },
  {
    id: 'o4',
    user: { ...MOCK_USER, name: 'Carlos Pereira', avatarUrl: 'https://i.pravatar.cc/150?u=carlos' },
    airline: 'Virgin Atlantic',
    airlineLogoUrl: 'https://logo.clearbit.com/virginatlantic.com',
    miles: 150000,
  },
];

// Represents what a user SEES on the "Compra" tab. These are offers FROM sellers.
export const MOCK_PURCHASE_OFFERS: MarketOffer[] = [
    {
        id: 'p1',
        user: { name: 'Vendedor Premium', avatarUrl: 'https://i.pravatar.cc/150?u=seller1', rating: 4.9, reviews: 112 },
        airline: 'Azul',
        airlineLogoUrl: 'https://logo.clearbit.com/voeazul.com.br',
        miles: 120000,
        pricePerThousand: 98,
        totalPrice: 11760,
    },
    {
        id: 'p2',
        user: { name: 'Milhas Express', avatarUrl: 'https://i.pravatar.cc/150?u=seller2', rating: 4.7, reviews: 88 },
        airline: 'LATAM',
        airlineLogoUrl: 'https://logo.clearbit.com/latam.com',
        miles: 250000,
        pricePerThousand: 95,
        totalPrice: 23750,
    },
    {
        id: 'p3',
        user: { name: 'Top Milhas', avatarUrl: 'https://i.pravatar.cc/150?u=seller3', rating: 5.0, reviews: 250 },
        airline: 'GOL',
        airlineLogoUrl: 'https://logo.clearbit.com/voegol.com.br',
        miles: 80000,
        pricePerThousand: 102,
        totalPrice: 8160,
    },
];


export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: 'promo1',
    title: 'Assinatura Clube 1000 Smiles',
    category: 'Clubes de Milhas',
    expiryDate: '15/04/2025',
    imageUrl: 'https://picsum.photos/seed/smiles/600/400',
    sections: [
      {
        title: 'Até 19 mil milhas em 6 meses',
        content: []
      },
      {
        title: 'Passo a Passo para a assinatura',
        content: [
          {
            type: 'list',
            listType: 'ordered',
            items: [
              'Acesse o link: https://www.smiles.com.br/clube-smiles/assine-ja/19-mil-milhas-6-meses/09042025',
              'Escolha o plano 1000;',
              'Adicione uma forma de pagamento.'
            ]
          }
        ]
      },
      {
        title: 'VALOR DO MILHEIRO - Permanência de 06 meses',
        content: [
          {
            type: 'list',
            listType: 'unordered',
            items: [
              'Plano mensal: R$ 13,26 (Excelentes)',
              'Plano anual parcelado: R$ 12,60 (Excelentes)',
              'Plano anual à vista: R$ 11,94'
            ]
          }
        ]
      },
      {
        title: 'Observações Importantes',
        content: [
          { type: 'text', content: '💭Lembrando, toda assinatura/upgrade com bônus, você paga o mesmo valor de mensalidade do plano escolhido, porém, como ganha os bônus, você reduz o valor do milheiro - ⚠️ valor de milheiro não é a mesma coisa que valor da mensalidade', isNote: true },
          { type: 'text', content: '*Promoção válida apenas para adesões ao Plano 1.000 do Clube Smiles.', isNote: false },
          { type: 'text', content: '**Necessária a permanência por, no mínimo, 06 meses.', isNote: false },
          { type: 'text', content: '***A adesão deve ser feita nesta página para ser elegível a esta promoção.', isNote: false },
          { type: 'text', content: '**Promoção válida somente para novas adesões ao Clube Smiles. Caso o cliente tenha cancelado o Clube no período de 365 dias, ele não será elegível a esta campanha, podendo aderir ao Clube, usufruir dos benefícios, mas não receber bonificação referente a esta promoção.', isNote: false },
          { type: 'text', content: '⚠️No plano anual à vista, o valor a ser pago é de R$ 504,00 em parcela única. Entretanto, você pode fazer o cancelamento após 6 meses e receber de volta o valor referente aos meses restantes.', isNote: true }
        ]
      }
    ]
  },
  {
    id: 'promo2',
    title: 'Descontos em Viagens Azul',
    category: 'Pacotes e Hotéis',
    expiryDate: '14/04/2025',
    imageUrl: 'https://picsum.photos/seed/azul/600/400',
    sections: [
      {
          title: 'Cupons de Desconto Disponíveis',
          content: [
              { type: 'coupon', code: 'RESGATE15', description: '15% OFF em pacotes (aéreo + hotel), hospedagem, seguro e carros - COM PONTOS.', expiry: 'Até 13/04/2025' },
              { type: 'coupon', code: 'FESTA15', description: '15% OFF em hotéis - EM DINHEIRO.', expiry: 'Até 14/04/2025' },
              { type: 'coupon', code: 'NIVER20', description: '20% OFF em TODOS os pacotes - EM DINHEIRO.', expiry: 'Até 14/04/2025' },
              { type: 'coupon', code: 'CELEBRE25', description: '25% OFF em TODOS os pacotes - EM DINHEIRO.', expiry: 'Até 14/04/2025' },
              { type: 'coupon', code: 'NIVER35', description: '35% OFF em pacotes internacionais - EM DINHEIRO.', expiry: 'Até 14/04/2025', link: 'https://www.azulviagens.com.br/packages/results.aspx?searchSessionID=772820#?packageName=internacionais' }
          ]
      },
      {
        title: 'Passo a Passo para reservar',
        content: [
          {
            type: 'list',
            listType: 'ordered',
            items: [
              'Acesse o link: https://www.azulviagens.com.br/',
              'Encontre a hospedagem/pacote que deseja',
              'Preencha os dados dos hóspedes',
              'Na página de pagamento insira o cupom desejado',
              'Escolha a sua forma de pagamento ou realize seu resgate'
            ]
          }
        ]
      },
      {
        title: 'Regulamento',
        content: [
          { type: 'text', content: '🔗 Regulamento completo disponível em: https://www.voeazul.com.br/br/pt/ofertas/aniversario-azul-viagens' }
        ]
      }
    ]
  }
];