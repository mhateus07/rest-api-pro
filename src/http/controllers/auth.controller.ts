 import type { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs";

import { prisma } from "../../lib/prisma";
import { ok, fail } from "../utils/http-response";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  // Aqui assumimos que a rota já validou o body com Zod
  const data = req.body as {
    name: string;
    email: string;
    password: string;
  };

  const userExists = await prisma.user.findUnique({
    where: { email: data.email },
    select: { id: true },
  });

  if (userExists) {
    return fail(reply, "E-mail já cadastrado.", {
      statusCode: 409,
      code: "EMAIL_ALREADY_EXISTS",
    });
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

  return ok(reply, user, { statusCode: 201 });
}

export async function login(req: FastifyRequest, reply: FastifyReply) {
  // Aqui assumimos que a rota já validou o body com Zod
  const data = req.body as {
    email: string;
    password: string;
  };

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    return fail(reply, "Credenciais inválidas.", {
      statusCode: 401,
      code: "INVALID_CREDENTIALS",
    });
  }

  const passwordOk = await bcrypt.compare(data.password, user.password);

  if (!passwordOk) {
    return fail(reply, "Credenciais inválidas.", {
      statusCode: 401,
      code: "INVALID_CREDENTIALS",
    });
  }

  const token = await reply.jwtSign(
    { role: user.role },
    { subject: user.id, expiresIn: "7d" }
  );

  return ok(reply, { token });
}
