import Experience from ".";

export default class History {
  get limit() {
    return 50;
  }

  constructor() {
    this.__experience = new Experience();
    this.instance = [];

    this.setInstance();
  }

  push(val) {
    if (this.instance.length >= this.limit) {
      this.instance.shift();
    }
    this.instance.push(val);
  }

  pop() {
    if (this.instance.length !== 0) {
      this.instance.pop();
    }
  }

  setInstance() {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey) {
        switch (e.code) {
          case "KeyZ":
            // if (!this.current) {
            //   this.current = this.instance.length - 1;
            // } else if (this.current !== 0) {
            //   this.current -= 1;
            // }
            // this.__experience.composer.setInstance(this.instance[this.current]);
            // this.__experience.update();
            break;

          case "KeY":
            // if (this.current && this.current !== this.instance.length - 1) {
            //   this.current += 1;
            // }
            break;
        }
      }
    })
  }
}
