type Primitive = string | number | boolean | bigint | symbol | null | undefined | Date;

function isPrimitiveValue(value: unknown): value is Primitive {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint" ||
    typeof value === "symbol" ||
    value instanceof Date
  );
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (isPrimitiveValue(a) || isPrimitiveValue(b)) {
    return a === b;
  }

  if (typeof a !== "object" || typeof b !== "object" || !a || !b) {
    return false;
  }

  const aKeys = Object.keys(a as Record<string, unknown>);
  const bKeys = Object.keys(b as Record<string, unknown>);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key) =>
    deepEqual(
      (a as Record<string, unknown>)[key],
      (b as Record<string, unknown>)[key]
    )
  );
}

export abstract class ValueObject<T> {
  protected readonly props: Readonly<T>;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(other?: ValueObject<T> | null): boolean {
    if (!other) return false;
    if (this === other) return true;
    return deepEqual(this.props, other.props);
  }

  public unpack(): Readonly<T> {
    return this.props;
  }
}