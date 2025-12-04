import { ExchangeController } from "@/modules/exchange/exchange.controller";
import { ExchangeService } from "@/modules/exchange/exchange.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [ExchangeController],
  providers: [ExchangeService],
  exports: [],
})
export class ExchangeModule {}
