 import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { fail } from "../utils/http-response";

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod validation
  if (error instanceof ZodError) {
    const formatted = error.flatten();

    return fail(reply, "Dados inválidos", {
      statusCode: 400,
      code: "VALIDATION_ERROR",
      errors: formatted.fieldErrors,
    });
  }

  // Fastify errors (ex: invalid JSON)
  if ((error as any).statusCode && typeof (error as any).statusCode === "number") {
    const statusCode = (error as any).statusCode as number;

    return fail(reply, error.message, {
      statusCode,
      code: "FASTIFY_ERROR",
    });
  }

  // Unknown error
  reply.log.error(error);

  return fail(reply, "Erro interno do servidor", {
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
  });
}
