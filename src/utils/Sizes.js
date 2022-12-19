import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
      this.trigger("resize");
    })
  }

  // Events
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ratio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}
