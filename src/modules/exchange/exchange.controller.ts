import { ExchangeRoutes } from "@/modules/exchange/const/routes.const";
import { AnalyzeQueryDto, AnalyzeResponseDto, analyzeResponseSchema } from "@/modules/exchange/dto/analyze.dto";
import { ExchangeService } from "@/modules/exchange/exchange.service";
import { Serializer } from "@/shared/serialization/serialization.decorator";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

interface IExchangeController {
  analyze(query: AnalyzeQueryDto): Promise<AnalyzeResponseDto>;
}

@Controller(ExchangeRoutes.BASE)
export class ExchangeController implements IExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @ApiOperation({ summary: "Analyze historical market data" })
  @ApiResponse({ status: 200, type: AnalyzeResponseDto })
  @Get(ExchangeRoutes.ANALYZE)
  @Serializer(analyzeResponseSchema)
  async analyze(@Query() query: AnalyzeQueryDto): Promise<AnalyzeResponseDto> {
    return await this.exchangeService.analyze(query);
  }
}
