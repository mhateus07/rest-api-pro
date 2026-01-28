 import type { FastifyReply, FastifyRequest } from "fastify";

type UserRole = "USER" | "ADMIN";

export function roleGuard(allowedRoles: UserRole[]) {
  return async function (
    req: FastifyRequest,
    reply: FastifyReply
  ) {
    const user = req.user as { role?: UserRole };

    if (!user?.role) {
      return reply.status(401).send({
        error: "UNAUTHORIZED",
        message: "Usuário sem role definida",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return reply.status(403).send({
        error: "FORBIDDEN",
        message: "Permissão insuficiente",
      });
    }
  };
}
