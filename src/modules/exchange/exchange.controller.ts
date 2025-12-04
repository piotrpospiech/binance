import { ExchangeRoutes } from "@/modules/exchange/const/routes.const";
import { ExchangeService } from "@/modules/exchange/exchange.service";
import { Controller } from "@nestjs/common";

interface IExchangeController {}

@Controller(ExchangeRoutes.BASE)
export class ExchangeController implements IExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}
}
