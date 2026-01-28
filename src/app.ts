 import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import { authRoutes } from "./http/routes/auth.routes";
import { adminRoutes } from "./http/routes/admin.routes";
import { userRoutes } from "./http/routes/user.routes";
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
app.register(userRoutes);
app.register(adminRoutes);

app.get("/health", async () => {
  return { status: "ok" };
});
