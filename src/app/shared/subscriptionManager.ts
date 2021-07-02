export class SubscriptionManager<T> {
  private subscriptions: {
    id: number,
    tag: string,
    subscription: T
  }[];

  private counter: number;

  constructor() {
    this.subscriptions = [];
    this.counter = 0;
  }

  public add(subscription: T, tag: string = ''): number {
    this.subscriptions.push(
      {
        id: ++this.counter,
        tag,
        subscription
      }
    );
    return this.counter;
  }

  public destroy() {
    if (!(this.subscriptions === null || this.subscriptions === undefined)) {
      for (const elem of this.subscriptions) {
        (elem.subscription as any).unsubscribe();
      }
      this.subscriptions = [];
    }
  }
}
