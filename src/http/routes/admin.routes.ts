import { FastifyInstance } from "fastify";
import { auth } from "../middlewares/auth";
import { roleGuard } from "../middlewares/role";

export async function adminRoutes(app: FastifyInstance) {
  app.get(
    "/admin",
    {
      preHandler: [auth, roleGuard(["ADMIN"])],
    },
    async () => {
      return {
        ok: true,
        message: "Bem-vindo, ADMIN!",
        role: "ADMIN",
      };
    }
  );
}
