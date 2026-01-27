import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { role: "USER" | "ADMIN" };
    user: { sub: string; role: "USER" | "ADMIN" };
  }
}
