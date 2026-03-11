# **Documento de Especificação Técnica e Funcional**

## **Aplicação: Milhas Balcão**

## **Versão: 1.0**

## **1.0 Introdução**

### **1.1. Propósito do Documento**

Este documento detalha os requisitos funcionais, a arquitetura lógica e as regras de negócio da aplicação "Milhas Balcão". Ele serve como a fonte central de informações para a equipe de desenvolvimento, garantindo que todas as funcionalidades sejam implementadas de forma consistente com os objetivos do produto, independentemente da stack tecnológica escolhida.

### **1.2. Visão Geral do Sistema**

O Milhas Balcão é uma plataforma digital projetada para funcionar como um marketplace de intermediação para a compra e venda de milhas aéreas. O sistema oferece quatro módulos principais:

* **Emissões:** Um feed de ofertas de passagens aéreas.  
* **Balcão (Marketplace):** O ambiente central para negociações de compra e venda de milhas.  
* **Promoções:** Uma área para divulgação de ofertas de parceiros.  
* **Conta:** O painel de gerenciamento do usuário.

A aplicação deve ser projetada como uma experiência de página única (SPA), proporcionando uma navegação fluida e sem recarregamentos.

## **2.0 Arquitetura Funcional e Conceitos Chave**

### **2.1. Modelo de Navegação Baseado em Estado**

A navegação dentro da aplicação não é baseada em URLs tradicionais. Em vez disso, é controlada por um gerenciador de estado central que determina qual tela ou fluxo está ativo. Isso permite transições suaves e um controle rigoroso sobre a jornada do usuário, especialmente em processos de múltiplos passos.

### **2.2. Gerenciamento de Fluxos de Múltiplos Passos**

Os processos de compra e venda são fluxos complexos que devem ser divididos em etapas sequenciais. O sistema deve manter o estado atual de cada fluxo (ex: qual etapa está ativa, dados da transação) de forma persistente durante a sessão do usuário. Se o usuário navegar para uma tela auxiliar (como o chat) e retornar, ele deve ser redirecionado para a etapa exata em que estava, sem perda de progresso.

### **2.3. Tematização Global (Claro/Escuro)**

A aplicação deve suportar dois temas visuais: claro e escuro. A preferência do usuário deve ser armazenada e aplicada globalmente. Todos os componentes de UI, sem exceção, devem se adaptar dinamicamente ao tema selecionado, garantindo legibilidade e consistência visual.

### **2.4. Fonte de Dados (Simulação de Backend)**

Para fins de desenvolvimento e prototipagem, a aplicação utilizará um conjunto de dados estáticos e mockados que simulam as respostas de um servidor backend. Isso inclui listas de ofertas de voos, ofertas do marketplace, dados de usuários e promoções.

## **3.0 Requisitos Funcionais Detalhados**

### **3.1. Módulo de Emissões (Busca de Voos)**

* **RF-EMI-01: Exibição de Ofertas de Voos**  
  A tela principal deve exibir uma lista de ofertas de passagens aéreas, apresentadas em cards individuais. Cada card deve conter, no mínimo: imagem do destino, trecho (origem/destino), companhia aérea, e preço (em milhas ou BRL).  
* **RF-EMI-02: Integração com Serviço de Inteligência Externo**  
  Ao carregar, a aplicação deve iniciar uma consulta a um serviço de IA externo para obter ofertas de voos atualizadas. A consulta deve ser formulada para solicitar dados em um formato estruturado e previsível.  
  O sistema deve ser capaz de processar a resposta de texto do serviço, extrair os dados relevantes e transformá-los em objetos de oferta de voo utilizáveis pela aplicação. Em caso de falha ou resposta vazia, o sistema deve recorrer a uma lista de ofertas padrão (mockadas) para não interromper a experiência do usuário.  
* **RF-EMI-03: Exibição de Fontes de Dados**  
  As fontes da web utilizadas pelo serviço de IA para compilar as ofertas devem ser listadas na parte inferior da tela, fornecendo transparência e permitindo que o usuário verifique as informações.  
* **RF-EMI-04: Detalhes do Voo e Seleção de Datas**  
  Ao selecionar uma oferta, o usuário é levado a uma tela de detalhes que exibe informações expandidas e um componente de calendário interativo. O calendário deve indicar visualmente os dias disponíveis e permitir a seleção de uma data.

### **3.2. Módulo do Balcão (Marketplace)**

* **RF-BAL-01: Interface de Abas (Compra/Venda)**  
  A interface do marketplace deve ser dividida em duas abas: "Compra" e "Venda". A seleção de uma aba altera completamente o conjunto de dados e as ações disponíveis na tela.  
* **RF-BAL-02: Listagem de Ofertas**  
  Na aba "Compra", a lista deve conter ofertas publicadas por vendedores. A ação principal em cada card é "Iniciar Compra".  
  Na aba "Venda", a lista contém pedidos publicados por compradores. A ação principal é "Iniciar Venda".  
* **RF-BAL-03: Filtro e Ordenação**  
  O usuário deve poder filtrar as ofertas por múltiplos critérios (ex: companhia aérea, faixa de milhas) e ordenar a lista (ex: por data de publicação, preço).  
* **RF-BAL-04: Visualização em Lista vs. Grade**  
  O usuário deve poder alternar a exibição das ofertas entre um layout de lista detalhada e um layout de grade compacta.  
* **RF-BAL-05: Lógica de Contraproposta**  
  Os usuários devem poder fazer uma contraproposta em ofertas. A tela de contraproposta deve validar a entrada em tempo real de acordo com a regra de negócio RN-OFF-01.

### **3.3. Módulo de Promoções**

* **RF-PRO-01: Listagem de Promoções**  
  A tela deve exibir uma lista de cards de promoções, cada um com uma imagem, título, categoria e data de validade.  
* **RF-PRO-02: Detalhes da Promoção com Conteúdo Estruturado**  
  A tela de detalhes de uma promoção deve ser capaz de renderizar conteúdo complexo e estruturado. O sistema de dados deve suportar diferentes tipos de conteúdo, como parágrafos de texto, notas de aviso, listas numeradas/com marcadores e cupons.  
* **RF-PRO-03: Interatividade de Cupons**  
  Os cupons de desconto exibidos devem ser interativos. Deve haver uma funcionalidade de "copiar para a área de transferência" que forneça feedback visual ao usuário após a cópia.

### **3.4. Módulo de Conta e Configurações**

* **RF-ACC-01: Painel do Usuário**  
  A tela de conta exibe as informações do usuário, como nome, avatar e plano de assinatura ativo. Deve fornecer acesso a outras sub-seções.  
* **RF-ACC-02: Histórico de Vendas**  
  Uma lista de todas as transações de venda do usuário (em andamento e concluídas). Clicar em uma transação leva a uma tela de detalhes com o status atualizado do processo.  
* **RF-ACC-03: Gerenciamento de Planos de Assinatura**  
  Uma tela que permite ao usuário comparar diferentes planos de assinatura. A interface deve utilizar um slider horizontal com efeito "magnético" para facilitar a comparação.  
* **RF-ACC-04: Configurações do Aplicativo (Tema)**  
  Deve conter um interruptor que permita ao usuário alternar entre o tema claro e o escuro. A mudança deve ser aplicada instantaneamente em toda a aplicação.

## **4.0 Fluxos de Usuário Detalhados**

### **4.1. Fluxo de Compra (Jornada do Comprador)**

* **Etapa 1: Aceite dos Termos de Compra**  
  * **Tela:** Exibe os termos de compra.  
  * **Lógica:** O botão de continuação permanece desabilitado até que o usuário marque a caixa de seleção de aceite.  
* **Etapa 2: Realização do Pagamento (Simulação PIX)**  
  * **Tela:** Exibe um QR Code (placeholder) e um código "PIX Copia e Cola".  
  * **Lógica:** O código PIX é gerado aleatoriamente e é único para esta sessão do fluxo. O usuário tem duas ações: copiar o código (com feedback) ou confirmar o pagamento. Ao confirmar, o sistema exibe um estado de carregamento para simular a verificação e, em caso de sucesso, avança automaticamente.  
* **Etapa 3: Envio de Dados do Passageiro**  
  * **Tela:** Instrui o usuário a abrir um chat seguro para enviar os dados.  
  * **Lógica:** Após interagir com o chat, o usuário deve clicar em um botão explícito de "Continuar" para avançar para a etapa final, confirmando que a ação foi realizada.  
* **Etapa 4: Aguardo da Emissão pelo Vendedor**  
  * **Tela:** Tela de espera passiva.  
  * **Lógica:** A UI informa ao usuário que o processo está agora com o vendedor e que ele será notificado.  
* **Conclusão: Confirmação da Compra**  
  * **Tela:** Exibe um resumo da transação bem-sucedida, com os detalhes da reserva (simulados).

### **4.2. Fluxo de Venda (Jornada do Vendedor)**

* **Etapa 1: Aceite dos Termos de Venda**  
  * **Lógica:** Similar ao fluxo de compra.  
* **Etapa 2: Aguardo do Comprador**  
  * **Lógica:** Tela de espera passiva que simula a oferta sendo listada no marketplace.  
* **Etapa 3: Gerenciamento da Transação (Stepper Vertical)**  
  * **Tela:** Uma interface de passo a passo vertical que guia o vendedor.  
  * **Lógica:** O sistema simula o progresso de etapas automáticas (Análise de Segurança, Confirmação de Pagamento). Após a confirmação do pagamento, o vendedor é instruído a obter os dados do passageiro no chat. A etapa final e crucial é uma caixa de seleção que o vendedor deve marcar manualmente para "Confirmar a emissão da passagem", o que habilita a finalização da venda.  
* **Conclusão: Confirmação da Venda**  
  * **Tela:** Exibe um resumo da venda bem-sucedida.

## **5.0 Regras de Negócio e Validações**

* **RN-OFF-01: Validação de Contraproposta**  
  Uma contraproposta não pode ter um valor mais de 15% inferior ao preço original da oferta. A validação deve ocorrer em tempo real na interface, com feedback visual e bloqueio do envio se a regra for violada.  
* **RN-PAY-01: Geração de Código de Pagamento Único**  
  Para cada transação de compra, um código de pagamento PIX único e aleatório deve ser gerado.  
* **RN-NAV-01: Persistência de Estado em Fluxos**  
  O estado (etapa atual) dos fluxos de compra e venda deve ser mantido mesmo que o usuário navegue para telas auxiliares (ex: chat). Ao retornar, o fluxo deve ser retomado do ponto exato onde parou.
