# balcaodemilhas-mock-mvp

App de exemplo **Balcão de Milhas** (mock MVP) em **React + Vite**, com navegação e PWA para instalação no celular.

## Estrutura

- **`docs/`** — Documentação de referência (colocar aqui a doc existente).
- **`src/`** — Código do app: `components/`, `pages/`, `assets/`, `styles/`.
- **`public/`** — Assets estáticos e ícones PWA.

## Comandos

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build para produção
- `npm run preview` — pré-visualizar o build
- `npm run lint` — ESLint

## Rodar no celular e ver mudanças em tempo real

1. **No PC:** abra o projeto e rode:
   ```bash
   npm run dev
   ```
2. **IP na rede:** no terminal o Vite mostra algo como:
   ```
   Local:   http://localhost:5173/
   Network: http://192.168.x.x:5173/
   ```
   Anote o endereço da linha **Network** (ex.: `192.168.1.10`).

3. **No celular:**
   - Conecte o celular à **mesma rede Wi‑Fi** do PC.
   - No navegador do celular, acesse: `http://192.168.x.x:5173` (use o IP que apareceu no passo 2).

4. **Atualização com as mudanças:**  
   Enquanto o `npm run dev` estiver rodando, ao salvar arquivos no PC o Vite envia a atualização para o navegador. O celular que está com essa URL aberta **atualiza sozinho** (hot reload).  
   Se não atualizar, recarregue a página no celular (puxe para atualizar ou F5 no navegador).

**Dica:** Se o celular não abrir a página, verifique se o firewall do Windows não está bloqueando a porta 5173 para a rede local.

### Outras formas de rodar no celular

| Forma | Quando usar | Atualização em tempo real? |
|-------|----------------|----------------------------|
| **1. Wi‑Fi (acima)** | PC e celular na mesma rede | Sim (HMR) |
| **2. Tunnel (ngrok, etc.)** | Celular em outra rede ou 4G; quer um link público | Sim (HMR) |
| **3. Android: ADB reverse** | Celular Android ligado por USB ao PC | Sim (HMR) |
| **4. Build + preview na rede** | Ver o build de produção no celular | Não (precisa rodar de novo) |
| **5. Deploy (Vercel/Netlify)** | Ver na internet; partilhar link | Não (novo deploy a cada mudança) |

**2. Tunnel (ngrok / localtunnel)**  
Expõe o seu `localhost` na internet e gera um link (ex.: `https://abc123.ngrok.io`). O celular pode abrir esse link em qualquer rede.

- **ngrok:** instale e rode `ngrok http 5173` (com o `npm run dev` já a correr). Use o URL HTTPS que aparecer no celular.
- **localtunnel:** `npx localtunnel --port 5173`. Abra no celular o URL que for mostrado.

**3. Android com USB (ADB reverse)**  
Celular Android ligado ao PC por USB, com depuração USB ativada.

```bash
adb reverse tcp:5173 tcp:5173
```

No telemóvel, no Chrome, abra `http://localhost:5173`. O tráfego vai para o PC; o HMR continua a funcionar.

**4. Build e abrir no celular pela rede**  
Para testar a versão “final” (build de produção) no telemóvel na mesma Wi‑Fi:

```bash
npm run build
npm run preview
```

No terminal aparece um endereço **Network** (porta 4173). Abra esse endereço no celular. Não há HMR; para ver mudanças, rode de novo `npm run build` e recarregue a página no celular.

**5. Deploy (Vercel, Netlify, GitHub Pages)**  
Faça deploy do projeto (ex.: `npm run build` e envie a pasta `dist` ou conecte o repositório ao Vercel/Netlify). Abra o URL do deploy no celular. Para ver alterações, é preciso fazer um novo deploy.

## Deploy na Vercel

### Custo

- **Plano Hobby (grátis):** uso pessoal / não comercial. Inclui largura de banda (100 GB/mês), minutos de build (6.000/mês), muitos deploys por dia. Para um app estático como este, **o custo é zero** dentro do uso normal.
- **Plano Pro:** ~20 USD/utilizador/mês — para equipas e uso comercial. Só faz sentido se precisares de mais recursos ou de uso comercial.

Para o Milhas Balcão como protótipo/demo, o **Hobby grátis** chega.

### Como fazer

**Opção A — Pelo site (repositório no GitHub)**

1. Cria conta em [vercel.com](https://vercel.com) (login com GitHub).
2. Clica **Add New… → Project**.
3. Importa o repositório **Arven-Company/balcaodemilhas-mock-mvp** (ou o teu fork).
4. A Vercel detecta Vite e sugere:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clica **Deploy**. Quando terminar, tens um URL tipo `balcaodemilhas-mock-mvp-xxx.vercel.app`. Abre no celular para testar.

**Opção B — Pela linha de comandos (sem GitHub)**

1. Instala o CLI: `npm i -g vercel`
2. Na pasta do projeto (`balcaodemilhas-mock-mvp`), com o código commitado:
   ```bash
   cd <caminho-para>/balcaodemilhas-mock-mvp
   vercel
   ```
3. Responde às perguntas (login na primeira vez, nome do projeto, etc.). No fim, recebes um URL de deploy.
4. Para deploy seguinte: `vercel --prod` (ou só `vercel` para preview).

O ficheiro **`vercel.json`** na raiz do projeto já está configurado (build, pasta `dist`, rewrites para SPA). Não é obrigatório se escolheres “Import” com GitHub; a Vercel infere Vite. Com `vercel.json` fica explícito.

### Ver mudanças no celular

Cada **push** na branch ligada à Vercel (ou cada `vercel --prod`) gera um novo deploy. Abres o mesmo URL no celular e recarregas a página para ver a versão mais recente (não há hot reload como no `npm run dev`).

### Renomear pasta e repositório GitHub para `balcaodemilhas-mock-mvp`

- **Pasta (no PC):** Renomeia a pasta do projeto de `balcao` para `balcaodemilhas-mock-mvp` (Explorer ou, no PowerShell: `Rename-Item -Path "balcao" -NewName "balcaodemilhas-mock-mvp"`).
- **GitHub:** No repositório, vai a **Settings → General → Repository name**, altera para `balcaodemilhas-mock-mvp` e clica **Rename**.
- **Remote local:** Depois de renomear no GitHub, na pasta do projeto executa:
  ```bash
  git remote set-url origin https://github.com/Arven-Company/balcaodemilhas-mock-mvp.git
  ```
  Confirma com `git remote -v`. Seguidos commits/push usam o novo nome.

## PWA e instalação no celular

O projeto usa `vite-plugin-pwa`. Depois do deploy (ou ao abrir o build no telemóvel), no **Chrome** podes usar **“Adicionar ao ecrã inicial”** / **“Instalar app”**. O app abre em janela própria, sem barra do browser — mas continua a ser uma **PWA (web)**, não um ficheiro APK.

### Quero um APK para instalar (tipo app nativa)

O deploy na Vercel **não gera APK**. Serves só o site; no Android a “instalação” é a PWA pelo Chrome. Para ter um **ficheiro .apk** (instalar como app ou publicar na Play Store), precisas de um passo extra:

| Opção | O que faz | Dificuldade |
|-------|-----------|-------------|
| **PWA Builder** | Em [pwabuilder.com](https://www.pwabuilder.com) colas o URL do teu deploy (ex. `https://balcaodemilhas-mock-mvp.vercel.app`). O site gera um **APK** (e opcionalmente pacote para outras lojas). | Fácil |
| **Capacitor** | No projeto, adicionas o Capacitor, fazes build da web e depois `npx cap add android` e `npx cap build`. Gera um projeto Android no repo; a partir daí podes gerar APK/AAB no Android Studio. | Média |
| **TWA (Trusted Web Activity)** | Empacota a PWA como app Android para a Play Store, abrindo o teu URL em modo “app”. PWA Builder também pode gerar TWA. | Média |

Recomendação para MVP: fazer deploy na Vercel e, se precisares de APK, usar **PWA Builder** com o URL do deploy para gerar o .apk sem alterar o código do projeto.
