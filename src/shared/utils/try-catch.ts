type Success<TData> = { data: TData; error: null };
type Failure<TError> = { data: null; error: TError };
type Result<TData, TError = Error> = Success<TData> | Failure<TError>;

export function tryCatch<TData, TError = Error>(callbackFn: () => Promise<TData>): Promise<Result<TData, TError>>;
export function tryCatch<TData, TError = Error>(callbackFn: () => TData): Result<TData, TError>;

export function tryCatch<TData, TError = Error>(
  callbackFn: () => TData | Promise<TData>,
): Result<TData, TError> | Promise<Result<TData, TError>> {
  try {
    const data = callbackFn();
    if (data instanceof Promise) {
      return data
        .then((result) => ({ data: result, error: null }) as Result<TData, TError>)
        .catch((error) => ({ data: null, error: error as TError }) as Result<TData, TError>);
    }
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as TError };
  }
}
