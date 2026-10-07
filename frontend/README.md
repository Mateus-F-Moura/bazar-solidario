# Bazar Solidário — front-end mobile

Aplicação React + TypeScript + Vite, adaptada ao backend Spring Boot deste repositório. Layout pensado para celular, com navegação inferior, foco acessível, catálogo, busca, filtros, favoritos, detalhes de peças, sacola, prévia de checkout, encontros, apresentação do projeto e cadastro.

## Executar

Requer Node.js 22.18+ (os testes usam suporte nativo a TypeScript).

```sh
cd frontend
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite. Para acessar pelo celular na mesma rede, use `node node_modules/vite/bin/vite.js --host 0.0.0.0` e o endereço de rede exibido. O navegador do celular usa o proxy do Vite; não precisa acessar diretamente o backend.

Em outro terminal, na raiz do repositório, execute o backend com Java 21 e PostgreSQL configurados:

```powershell
.\mvnw.cmd spring-boot:run
```

A configuração atual espera o banco `bazar_solidario` em `localhost:5432`. O backend atende normalmente em `localhost:8080`.

## Integração disponível

O cadastro usa `POST /api/usuarios`, encaminhado pelo Vite a `POST /usuarios` do Spring. Envia apenas `nome`, `email` e `senha`; o backend atribui `CLIENTE`. A tela informa progresso, falhas e sucesso real, confirma a senha e impede envios simultâneos. Não persiste senha ou sessão no navegador. Não existe endpoint de autenticação no backend atual, portanto cadastrar não faz login.

Para mudar o endereço, copie `.env.example` para `.env.local` e ajuste `API_PROXY_TARGET`. `VITE_API_BASE_URL` define a base pública da API, por padrão `/api`. O proxy está disponível também em `npm run preview`.

Catálogo, lojas e eventos são ilustrativos. Favoritos e sacola ficam apenas no navegador. Checkout não cria pedido, reserva ou cobrança. Contato, parceria e interesse em eventos continuam como prévias sem envio: ainda não existem endpoints para essas funcionalidades.

O backend atual recebe e retorna a entidade `Usuario` com o campo `senha`, e a salva sem hash. O cliente descarta esse campo da resposta, mas o cadastro do servidor precisa de hash de senha e DTOs antes de receber credenciais reais em produção. Esta integração não altera o backend nem sua segurança.

## Verificar e publicar

```sh
npm test
npm run build
npm run preview
```

O build gera `dist/`. Na hospedagem, configure fallback das rotas para `index.html` e encaminhe `/api/*` ao backend removendo `/api`, ou forneça uma URL pública em `VITE_API_BASE_URL` e configure CORS no servidor. O proxy do Vite não acompanha os arquivos estáticos.

## Design

Paleta em `src/styles/tokens.css`: verde petróleo, marfim, aqua e lavanda. Fontes Fraunces e Instrument Sans são instaladas como dependências e servidas localmente. Fotografias ilustrativas são carregadas do Unsplash.

[Referência editável no Figma](https://www.figma.com/design/UNlqj03qJ6BsaAX9sUwxiL?node-id=3-19).
