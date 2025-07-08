import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>("port") || 3000;
  const nodeEnv = configService.get<string>("nodeEnv");

  app.setGlobalPrefix("/api");
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  await app.listen(port);
  Logger.log(`🚀 App running on port ${port} in ${nodeEnv} mode`);
}

bootstrap().catch((error) => {
  console.error("❌ Failed to start application:", error);
  process.exit(1);
});
