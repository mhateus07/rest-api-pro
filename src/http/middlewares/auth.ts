import { FastifyReply, FastifyRequest } from "fastify";

export async function auth(req: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = await req.jwtVerify();
    req.user = { sub: payload.sub, role: (payload as any).role };
  } catch {
    return reply.status(401).send({ message: "Não autorizado." });
  }
}
