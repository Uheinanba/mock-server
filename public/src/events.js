export default class Events {
  constructor(ctx) {
    this.ctx = ctx;
    return {
      ['.j-btn__add, click']() {
        console.log(233);
      },
    };
  }
}
