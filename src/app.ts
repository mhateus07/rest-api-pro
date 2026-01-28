import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import { errorHandler } from "./http/errors/error-handler";
import { authRoutes } from "./http/routes/auth.routes";
import { adminRoutes } from "./http/routes/admin.routes";
import { userRoutes } from "./http/routes/user.routes";
import { env } from "./env";

export const app = fastify({ logger: true });

/* -------------------- ERROR HANDLER -------------------- */

app.setErrorHandler(errorHandler);

/* -------------------- PLUGINS -------------------- */

app.register(cors, { origin: true });

app.register(jwt, {
  secret: env.JWT_SECRET,
});

/* -------------------- SWAGGER -------------------- */

app.register(swagger, {
  openapi: {
    info: {
      title: "REST API Pro",
      version: "1.0.0",
      description: "API com autenticação JWT e controle de acesso por role",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // 🔒 Aplica Bearer automaticamente em todas as rotas no Swagger
    security: [{ bearerAuth: [] }],
  },
});

app.register(swaggerUI, {
  routePrefix: "/docs",
});

/* -------------------- ROTAS -------------------- */

app.register(authRoutes);
app.register(userRoutes);
app.register(adminRoutes);

app.get("/health", async () => {
  return { status: "ok" };
});
