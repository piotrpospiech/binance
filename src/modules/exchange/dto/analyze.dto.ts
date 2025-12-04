import { numericString } from "@/shared/utils/data-types";
import { ApiProperty } from "@nestjs/swagger";
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
  startTime: z.coerce.number().optional(),
  endTime: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  // timeZone? STRING	NO	Default: 0 (UTC)
});

export class AnalyzeQueryDto extends createZodDto(analyzeQuerySchema) {}

export const analyzeResponseSchema = z.object({
  closePrice: numericString(),
  openPrice: numericString(),
  priceDifference: numericString(),
  highPrice: numericString(),
  lowPrice: numericString(),
});

export class AnalyzeResponseDto extends createZodDto(analyzeResponseSchema) {
  @ApiProperty({ example: "93154.21" })
  closePrice: string;

  @ApiProperty({ example: "93943.24" })
  openPrice: string;

  @ApiProperty({ example: "789.03" })
  priceDifference: string;

  @ApiProperty({ example: "94080" })
  highPrice: string;

  @ApiProperty({ example: "92782.48" })
  lowPrice: string;
}
