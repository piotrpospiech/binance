import { ExchangeModule } from "@/modules/exchange/exchange.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [ExchangeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
