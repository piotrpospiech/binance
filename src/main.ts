import { AppModule } from "@/app.module";
import { ConfigurationType, EnvironmentVariable } from "@/shared/configuration/configuration.schema";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<ConfigurationType, true>);
  const port = configService.get(EnvironmentVariable.PORT, { infer: true });

  await app.listen(port);
}

void bootstrap();
