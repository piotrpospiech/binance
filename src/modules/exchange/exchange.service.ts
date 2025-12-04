import { AnalyzeQueryDto, AnalyzeResponseDto } from "@/modules/exchange/dto/analyze.dto";
import { ConfigurationType, EnvironmentVariable } from "@/shared/configuration/configuration.schema";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MainClient } from "binance";
import { Decimal } from "decimal.js";

interface IExchangeService {
  analyze(options: AnalyzeQueryDto): Promise<AnalyzeResponseDto>;
}

@Injectable()
export class ExchangeService implements IExchangeService {
  client: MainClient;

  constructor(private readonly configService: ConfigService<ConfigurationType, true>) {
    this.client = new MainClient({
      api_key: configService.get(EnvironmentVariable.BINANCE_API_KEY, { infer: true }),
      api_secret: configService.get(EnvironmentVariable.BINANCE_API_SECRET_KEY, { infer: true }),
    });
  }

  async analyze(options: AnalyzeQueryDto): Promise<AnalyzeResponseDto> {
    const klines = await this.client.getKlines(options);

    const openPrice = new Decimal(klines[0][1]);
    const closePrice = new Decimal(klines[klines.length - 1][4]);
    const priceDifference = Decimal.abs(closePrice.minus(openPrice));

    const allTimePrices = klines.reduce(
      (acc, kline) => ({
        ath: Decimal.max(new Decimal(kline[2]), acc.ath),
        atl: Decimal.min(new Decimal(kline[3]), acc.ath),
      }),
      { ath: new Decimal(0), atl: new Decimal(0) },
    );

    return {
      openPrice: openPrice.toString(),
      closePrice: closePrice.toString(),
      priceDifference: priceDifference.toString(),
      ath: allTimePrices.ath.toString(),
      atl: allTimePrices.atl.toString(),
    };
  }
}
