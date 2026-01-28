 import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import { authRoutes } from "./http/routes/auth.routes";
import { auth } from "./http/middlewares/auth";
import { roleGuard } from "./http/middlewares/role";
import { env } from "./env";

export const app = fastify({ logger: true });

/* -------------------- PLUGINS -------------------- */

app.register(cors, { origin: true });

app.register(jwt, {
  secret: env.JWT_SECRET,
});

app.register(swagger, {
  openapi: {
    info: {
      title: "REST API Pro",
      version: "1.0.0",
    },
  },
});

app.register(swaggerUI, {
  routePrefix: "/docs",
});

/* -------------------- ROTAS -------------------- */

app.register(authRoutes);

app.get("/health", async () => {
  return { status: "ok" };
});

/**
 * Rota protegida
 * - exige JWT válido
 * - exige role USER ou ADMIN
 */
app.get(
  "/me",
  {
    preHandler: [
      auth,
      roleGuard(["USER", "ADMIN"]),
    ],
  },
  async (req) => {
    return {
      userId: req.user.sub,
      role: req.user.role,
    };
  }
);
