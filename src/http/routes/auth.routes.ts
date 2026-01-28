 import { FastifyInstance } from "fastify";
import { register, login } from "../controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/users",
    {
      schema: {
        tags: ["Auth"],
        summary: "Criar usuário",
        body: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 8 },
          },
        },
        response: {
          201: {
            description: "Usuário criado com sucesso",
          },
        },
      },
    },
    register
  );

  app.post(
    "/sessions",
    {
      schema: {
        tags: ["Auth"],
        summary: "Autenticar usuário",
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        response: {
          200: {
            description: "JWT gerado",
          },
        },
      },
    },
    login
  );
}
