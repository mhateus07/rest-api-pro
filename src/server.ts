import { app } from "./app";
import { env } from "./env";

app
  .listen({ port: env.PORT, host: "0.0.0.0" })
  .then(() => {
    app.log.info(`🚀 Server running on http://localhost:${env.PORT}`);
    app.log.info(`📚 Docs available at http://localhost:${env.PORT}/docs`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
