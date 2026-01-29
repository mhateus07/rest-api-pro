![CI](https://github.com/mhateus07/rest-api-pro/actions/workflows/ci.yml/badge.svg)

# REST API Pro

API REST profissional construída com **Node.js + TypeScript**, focada em boas práticas de backend, autenticação segura e arquitetura escalável.

O projeto simula um cenário real de produção, com **controle de acesso por roles (RBAC)**, **JWT**, **Prisma ORM**, **PostgreSQL**, **Docker** e **documentação via Swagger**.

---

## 🚀 Stack

- Node.js  
- TypeScript  
- Fastify  
- Prisma ORM  
- PostgreSQL  
- JWT (Auth)  
- Swagger (OpenAPI)  
- Docker + Docker Compose  

---

## 🧱 Arquitetura

- Separação clara de responsabilidades  
- Controllers, routes, middlewares e schemas isolados  
- Validação de dados com schemas  
- Autenticação e autorização desacopladas  
- Configuração de ambiente centralizada  

---

## 📁 Estrutura do projeto

```txt
src/
  app.ts
  server.ts
  env.ts
  lib/
    prisma.ts
  http/
    controllers/
    middlewares/
    routes/
    schemas/
prisma/
  schema.prisma
  migrations/
  seed/
docker-compose.yml
```

---

## ▶️ Como rodar o projeto (Local)

⚠️ Todos os comandos abaixo devem ser executados no terminal.

```bash
npm install
docker compose up -d
cp .env.example .env
npx prisma migrate dev
npm run dev
```

A API estará disponível em:

- **API:** http://localhost:3333  
- **Swagger:** http://localhost:3333/docs  

---

## 🌱 Seed de usuário ADMIN

Para facilitar testes locais, o projeto inclui um seed que cria um usuário administrador.

```bash
npx tsx prisma/seed/admin.ts
```

Usuário criado:

- **Email:** admin@admin.com  
- **Senha:** Admin@123  
- **Role:** ADMIN  

---

## 🔐 Autenticação e Autorização

- Autenticação via JWT  
- Controle de acesso baseado em roles (**USER / ADMIN**)  
- Middleware de autorização protegendo rotas sensíveis  

### Fluxo

1. Login via `/sessions`  
2. Recebe JWT  
3. Token usado no header:  
   ```
   Authorization: Bearer <token>
   ```
4. Acesso liberado conforme role  

---

## ⭐ Destaques técnicos

- RBAC (Role-Based Access Control)  
- Prisma com migrations versionadas  
- Docker para ambiente local consistente  
- Swagger documentando todas as rotas  
- Código organizado e escalável  
- Pronto para CI/CD e testes automatizados  

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com foco em **portfólio backend**, simulando padrões utilizados em ambientes profissionais e servindo como base para:

- APIs corporativas  
- SaaS  
- Sistemas internos  
- Autenticação centralizada
