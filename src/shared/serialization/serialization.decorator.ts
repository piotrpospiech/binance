import { SetMetadata } from "@nestjs/common";
import { z } from "zod";

export const SERIALIZER_SCHEMA_NAME = "SERIALIZER_SCHEMA";

export const Serializer = (schema: z.ZodTypeAny) => SetMetadata(SERIALIZER_SCHEMA_NAME, schema);
