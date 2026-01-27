# 🚀 REST API Pro

API REST profissional construída com **Node.js + TypeScript**, seguindo boas práticas de arquitetura, autenticação segura com JWT, documentação automática e integração com banco de dados relacional usando Prisma ORM.

Este projeto foi desenvolvido com foco em **qualidade de código, escalabilidade e padrão de mercado**, sendo ideal como **case de portfólio backend**.

---

## 🧠 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Fastify**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Zod** (validação)
- **Swagger / OpenAPI**
- **Docker (PostgreSQL)**
- **TSX** (ambiente de desenvolvimento)

---

## 🏗️ Arquitetura do Projeto

```txt
src/
├── app.ts                # Configuração principal do Fastify
├── server.ts             # Bootstrap do servidor
├── env.ts                # Validação de variáveis de ambiente
│
├── lib/
│   └── prisma.ts         # Prisma Client
│
├── http/
│   ├── controllers/      # Controllers da aplicação
│   ├── middlewares/      # Middlewares (auth)
│   ├── routes/           # Rotas organizadas por domínio
│   └── schemas/          # Schemas Zod
│
└── @types/
    └── fastify-jwt.d.ts  # Tipagem customizada do JWT


🔐 Autenticação

A API implementa autenticação baseada em JWT, com:

Registro de usuário

Login (geração de token)

Middleware de autenticação

Controle de acesso a rotas protegidas