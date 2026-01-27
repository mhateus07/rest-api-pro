import { FastifyInstance } from "fastify";
import { register, login } from "../controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", login);
}
