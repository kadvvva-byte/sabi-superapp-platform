export class Result<T = void> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error?: string;
  private readonly value?: T;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: successful result cannot contain an error.");
    }

    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: failed result must contain an error.");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(this.error ?? "Cannot get the value of a failed result.");
    }

    return this.value as T;
  }

  public getValueOrDefault(defaultValue: T): T {
    return this.isSuccess ? (this.value as T) : defaultValue;
  }

  public static ok<T = void>(value?: T): Result<T> {
    return new Result<T>(true, undefined, value);
  }

  public static fail<T = void>(error: string): Result<T> {
    return new Result<T>(false, error);
  }

  public static combine(results: Result[]): Result<void> {
    for (const result of results) {
      if (result.isFailure) {
        return Result.fail(result.error ?? "Unknown error.");
      }
    }

    return Result.ok();
  }
}