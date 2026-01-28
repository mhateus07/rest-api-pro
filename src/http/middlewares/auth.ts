 import type { FastifyReply, FastifyRequest } from "fastify";

export async function auth(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch {
    return reply.status(401).send({
      error: "UNAUTHORIZED",
      message: "Token inválido ou ausente",
    });
  }
}
