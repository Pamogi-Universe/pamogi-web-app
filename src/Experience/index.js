import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';
import Resources from './utils/Resources';
import Sizes from "./utils/Sizes"
import Time from "./utils/Time";
import World from './World';
import Raycaster from './World/Raycaster';
import View from "./View";

let instance = null

export default class Experience {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    // option
    this.canvas = document.querySelector(canvas);

    // setup
    const view = new View();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = view.scene;
    this.physics = view.physics;
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.raycaster = new Raycaster();

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

    this.raycaster.instance.setFromCamera(this.raycaster.mouse, this.camera.instance)

    if (this.world.loaded) {
      const intersects = this.raycaster.instance.intersectObjects(this.world.objects.arr)
      this.raycaster.update(intersects)
    }
  }
}
