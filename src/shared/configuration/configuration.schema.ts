import z from "zod";

const BINANCE_API_KEY_ERROR_MESSAGE = "Missing BINANCE_API_KEY environment variable";
const BINANCE_API_SECRET_KEY_ERROR_MESSAGE = "Missing BINANCE_API_SECRET environment variable";

export enum EnvironmentVariable {
  NODE_ENV = "NODE_ENV",
  PORT = "PORT",
  BINANCE_API_KEY = "BINANCE_API_KEY",
  BINANCE_API_SECRET_KEY = "BINANCE_API_SECRET_KEY",
}

export enum Environment {
  DEVELOPMENT = "development",
  TEST = "test",
  PRODUCTION = "production",
}

export const configurationSchema = z.object({
  [EnvironmentVariable.NODE_ENV]: z.enum(Environment),
  [EnvironmentVariable.PORT]: z.coerce.number().min(0).max(65535),
  [EnvironmentVariable.BINANCE_API_KEY]: z.string().min(1, BINANCE_API_KEY_ERROR_MESSAGE),
  [EnvironmentVariable.BINANCE_API_SECRET_KEY]: z.string().min(1, BINANCE_API_SECRET_KEY_ERROR_MESSAGE),
});

export type ConfigurationType = z.infer<typeof configurationSchema>;
