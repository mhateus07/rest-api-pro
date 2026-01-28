import { FastifyInstance } from "fastify";
import { auth } from "../middlewares/auth";
import { roleGuard } from "../middlewares/role";

export async function userRoutes(app: FastifyInstance) {
  app.get(
    "/me",
    {
      preHandler: [auth, roleGuard(["USER", "ADMIN"])],
    },
    async (req) => {
      return {
        userId: req.user.sub,
        role: req.user.role,
      };
    }
  );
}
