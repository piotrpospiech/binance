import { createZodDto } from "nestjs-zod";
import z from "zod";

enum Interval {
  ONE_SECOND = "1s",
  ONE_MINUTE = "1m",
  THREE_MINUTES = "3m",
  FIVE_MINUTES = "5m",
  FIVETEEN_MINUTES = "15m",
  THIRTY_MINUTES = "30m",
  ONE_HOUR = "1h",
  TWO_HOURS = "2h",
  FOUR_HOURS = "4h",
  SIX_HOURS = "6h",
  EIGHT_HOURS = "8h",
  TWELVE_HOURS = "12h",
  ONE_DAY = "1d",
  THREE_DAYS = "3d",
  ONE_WEEK = "1w",
  ONE_MONTH = "1M",
}

export const analyzeQuerySchema = z.object({
  symbol: z.string(),
  interval: z.enum(Interval),
  startTime: z.number().optional(),
  endTime: z.number().optional(),
  limit: z.number().optional(),
  // timeZone? STRING	NO	Default: 0 (UTC)
});

export class AnalyzeQueryDto extends createZodDto(analyzeQuerySchema) {}

export const analyzeResponseSchema = z.object({
  closePrice: z.string(),
  openPrice: z.string(),
  priceDifference: z.string(),
  ath: z.string(),
  atl: z.string(),
});

export class AnalyzeResponseDto extends createZodDto(analyzeResponseSchema) {}
