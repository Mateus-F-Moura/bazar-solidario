# Bazar Solidário

Projeto com backend Spring Boot e front-end mobile em React + TypeScript.

- Backend: Java 21, Spring Boot, Spring Security, JPA e PostgreSQL, na estrutura Maven existente.
- Front-end: Vite, React e TypeScript em [`frontend/`](frontend/README.md).

O front-end usa o endpoint de cadastro existente (`POST /usuarios`). Catálogo, eventos e checkout continuam demonstrativos enquanto seus endpoints são desenvolvidos. Consulte o [guia do front-end](frontend/README.md) para executar, testar e configurar a integração.

## Backend

Crie o banco PostgreSQL `bazar_solidario` e confira a configuração em `src/main/resources/application.properties`. Com Java 21 disponível:

```powershell
.\mvnw.cmd spring-boot:run
```

## Front-end

Com Node.js 22.18+:

```sh
cd frontend
npm ci
npm run dev
```

O Vite encaminha as chamadas `/api` ao backend em `http://localhost:8080`, sem exigir mudanças no CORS para desenvolvimento.
