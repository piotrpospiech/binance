import { ExchangeModule } from "@/modules/exchange/exchange.module";
import { validate } from "@/shared/configuration/configuration.validate";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), ExchangeModule],
  controllers: [],
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
