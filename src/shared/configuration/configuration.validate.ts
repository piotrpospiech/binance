import { configurationSchema } from "@/shared/configuration/configuration.schema";
import { Logger } from "@nestjs/common";

const CONFIGURATION_VALIDATION_ERROR_MESSAGE = "Configuration validation failed";

export function validate(configuration: Record<string, unknown>) {
  const parsedConfiguration = configurationSchema.safeParse(configuration);

  if (parsedConfiguration.error) {
    Logger.error(CONFIGURATION_VALIDATION_ERROR_MESSAGE);
    throw new Error(CONFIGURATION_VALIDATION_ERROR_MESSAGE);
  }

  return parsedConfiguration.data;
}
