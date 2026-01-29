import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@admin.com";
  const password = "Admin@123"; // troque depois se quiser

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log("✅ Admin já existe:", existing.email);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: passwordHash,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin criado com sucesso:", email, password);
}

main()
  .catch((e) => {
    console.error("❌ Seed falhou:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
