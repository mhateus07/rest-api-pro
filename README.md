 # REST API Pro

API REST em **Node.js + TypeScript** com **Fastify**, **Prisma (PostgreSQL)**, **JWT Auth**, **Swagger (/docs)** e **Docker**.  
Projeto estruturado para produção, com rotas organizadas (controllers, middlewares, schemas) e autenticação pronta.

---

## ✅ Stack

- **Node.js** + **TypeScript**
- **Fastify**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** (autenticação)
- **Swagger** (documentação)
- **Docker Compose**

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
docker-compose.yml
