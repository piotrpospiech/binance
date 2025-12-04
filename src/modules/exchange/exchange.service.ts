import { AnalyzeQueryDto, AnalyzeResponseDto } from "@/modules/exchange/dto/analyze.dto";
import { ConfigurationType, EnvironmentVariable } from "@/shared/configuration/configuration.schema";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MainClient } from "binance";

interface IExchangeService {
  analyze(options: AnalyzeQueryDto): AnalyzeResponseDto[];
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

  analyze(options: AnalyzeQueryDto): AnalyzeResponseDto[] {
    throw new Error("Method not implemented.");
  }
}
