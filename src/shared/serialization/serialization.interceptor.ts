import { SERIALIZER_SCHEMA_NAME } from "@/shared/serialization/serialization.decorator";
import { tryCatch } from "@/shared/utils/try-catch";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map } from "rxjs";
import { z } from "zod";

const SERIALIZATION_ERROR_MESSAGE = "Serialization failed";

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const schema = this.reflector.getAllAndOverride<z.ZodTypeAny>(SERIALIZER_SCHEMA_NAME, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!schema) return next.handle();

    return next.handle().pipe(
      map((data) => {
        const { data: parsedData, error } = tryCatch(() => schema.parse(data));

        if (parsedData) return parsedData;

        if (error instanceof z.ZodError) {
          throw new InternalServerErrorException({ message: SERIALIZATION_ERROR_MESSAGE, ...z.treeifyError(error) });
        }

        throw new InternalServerErrorException(SERIALIZATION_ERROR_MESSAGE);
      }),
    );
  }
}
