import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';
import Resources from './utils/Resources';
import Sizes from "./utils/Sizes"
import Time from "./utils/Time";
import World from './World';

let instance = null

export default class Experience {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    // option
    this.canvas = document.querySelector(canvas);

    // setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // methods
    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update())
  }

  // events
  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update();
  }
}
