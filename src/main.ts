import { AppModule } from "@/app.module";
import { ConfigurationType, Environment, EnvironmentVariable } from "@/shared/configuration/configuration.schema";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { cleanupOpenApiDoc } from "nestjs-zod";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<ConfigurationType, true>);
  const port = configService.get(EnvironmentVariable.PORT, { infer: true });
  const environment = configService.get(EnvironmentVariable.NODE_ENV, { infer: true });

  if (environment === Environment.DEVELOPMENT) {
    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);
    app.use("/reference", apiReference({ content: cleanupOpenApiDoc(document) }));
  }

  await app.listen(port);
}

void bootstrap();
