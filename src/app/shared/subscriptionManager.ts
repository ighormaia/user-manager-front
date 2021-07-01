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

  public removeById(id: number): boolean {
    for (let i = 0; i < this.subscriptions.length; i++) {
      const element = this.subscriptions[i];

      if (element.id === id) {
        (element.subscription as any).unsubscribe();
        this.subscriptions.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public removeByTag(tag: string): boolean {
    let removed = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      const element = this.subscriptions[i];

      if (element.tag === tag) {
        (element.subscription as any).unsubscribe();
        this.subscriptions.splice(i, 1);
        removed = true;
      }
    }
    return removed;
  }
}
