class Observable<O = (data: any) => void> {
  private observers: O[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: O) {
    this.observers.push(observer);
  }

  //   unsubscribe(f) {
  //     this.observers = this.observers.filter((subscriber) => subscriber !== f);
  //   }

  notify(data: any) {
    this.observers.forEach((observer) => observer(data));
  }
}

export default new Observable();
