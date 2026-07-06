export abstract class AggregateRoot<TEvent = unknown> {
  private readonly domainEvents: TEvent[] = [];

  protected addDomainEvent(event: TEvent): void {
    this.domainEvents.push(event);
  }

  pullDomainEvents(): TEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;
    return events;
  }

  hasDomainEvents(): boolean {
    return this.domainEvents.length > 0;
  }

  clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }
}

export default AggregateRoot;
