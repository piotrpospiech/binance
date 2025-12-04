import { ExchangeModule } from "@/modules/exchange/exchange.module";
import { validate } from "@/shared/configuration/configuration.validate";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), ExchangeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
