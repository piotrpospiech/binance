import { ExchangeRoutes } from "@/modules/exchange/const/routes.const";
import { AnalyzeQueryDto, AnalyzeResponseDto } from "@/modules/exchange/dto/analyze.dto";
import { ExchangeService } from "@/modules/exchange/exchange.service";
import { Controller, Get, Query } from "@nestjs/common";

interface IExchangeController {
  analyze(query: AnalyzeQueryDto): Promise<AnalyzeResponseDto>;
}

@Controller(ExchangeRoutes.BASE)
export class ExchangeController implements IExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get(ExchangeRoutes.ANALYZE)
  async analyze(@Query() query: AnalyzeQueryDto): Promise<AnalyzeResponseDto> {
    return await this.exchangeService.analyze(query);
  }
}
