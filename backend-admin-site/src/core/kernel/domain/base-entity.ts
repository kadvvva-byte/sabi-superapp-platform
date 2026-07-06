import { UniqueId } from "./unique-id";

export interface BaseEntityProps {
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseEntity<T extends BaseEntityProps> {
  protected readonly _id: UniqueId;
  protected props: T;

  protected constructor(props: T, id?: UniqueId) {
    this._id = id ?? UniqueId.create();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): UniqueId {
    return this._id;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  protected touch(): void {
    this.props.updatedAt = new Date();
  }

  public equals(object?: BaseEntity<T> | null): boolean {
    if (!object) return false;
    if (this === object) return true;
    return this._id.equals(object._id);
  }
}