import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "../schemas/auth.schemas";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const data = registerSchema.parse(req.body);

  const userExists = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (userExists) {
    return reply.status(409).send({ message: "E-mail já cadastrado." });
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return reply.status(201).send(user);
}

export async function login(req: FastifyRequest, reply: FastifyReply) {
  const data = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    return reply.status(401).send({ message: "Credenciais inválidas." });
  }

  const ok = await bcrypt.compare(data.password, user.password);
  if (!ok) {
    return reply.status(401).send({ message: "Credenciais inválidas." });
  }

  const token = await reply.jwtSign(
    { role: user.role },
    { subject: user.id, expiresIn: "7d" }
  );

  return reply.send({ token });
}
