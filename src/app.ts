import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { authRoutes } from "./http/routes/auth.routes";
import { env } from "./env";

export const app = fastify({ logger: true });

app.register(cors, { origin: true });

app.register(jwt, {
  secret: env.JWT_SECRET,
});

app.register(swagger, {
  openapi: {
    info: { title: "REST API Pro", version: "1.0.0" },
  },
});

app.register(swaggerUI, { routePrefix: "/docs" });

app.register(authRoutes);

app.get("/health", async () => ({ status: "ok" }));

import { auth } from "./http/middlewares/auth";

app.get("/me", { preHandler: [auth] }, async (req) => {
  const user = req.user;
  return { userId: user.sub, role: user.role };
});
