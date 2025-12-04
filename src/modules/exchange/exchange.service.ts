import { AnalyzeQueryDto, AnalyzeResponseDto } from "@/modules/exchange/dto/analyze.dto";
import { ConfigurationType, EnvironmentVariable } from "@/shared/configuration/configuration.schema";
import { tryCatch } from "@/shared/utils/try-catch";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MainClient } from "binance";
import { Decimal } from "decimal.js";

const INVALID_TIMEFRAME_ERROR_MESSAGE = "There is no data in the given timeframe";

interface IExchangeService {
  analyze(options: AnalyzeQueryDto): Promise<AnalyzeResponseDto>;
}

@Injectable()
export class ExchangeService implements IExchangeService {
  client: MainClient;

  constructor(private readonly configService: ConfigService<ConfigurationType, true>) {
    this.client = new MainClient({
      api_key: this.configService.get(EnvironmentVariable.BINANCE_API_KEY, { infer: true }),
      api_secret: this.configService.get(EnvironmentVariable.BINANCE_API_SECRET_KEY, { infer: true }),
    });
  }

  async analyze(options: AnalyzeQueryDto): Promise<AnalyzeResponseDto> {
    const klineResponse = await tryCatch(async () => await this.client.getKlines(options));
    // TODO: Handle different API errors
    if (klineResponse.error) throw new InternalServerErrorException();
    const klines = klineResponse.data;

    if (!klines.length) throw new BadRequestException(INVALID_TIMEFRAME_ERROR_MESSAGE);

    const openPrice = new Decimal(klines[0][1]);
    const closePrice = new Decimal(klines[klines.length - 1][4]);
    const priceDifference = Decimal.abs(closePrice.minus(openPrice));

    const allTimePrices = klines.reduce(
      (acc, kline) => ({
        highPrice: Decimal.max(new Decimal(kline[2]), acc.highPrice),
        lowPrice: Decimal.min(new Decimal(kline[3]), acc.highPrice),
      }),
      { highPrice: new Decimal(0), lowPrice: new Decimal(0) },
    );

    return {
      openPrice: openPrice.toString(),
      closePrice: closePrice.toString(),
      priceDifference: priceDifference.toString(),
      highPrice: allTimePrices.highPrice.toString(),
      lowPrice: allTimePrices.lowPrice.toString(),
    };
  }
}
