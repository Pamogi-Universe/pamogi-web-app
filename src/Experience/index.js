import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';
import Resources from './utils/Resources';
import Sizes from "./utils/Sizes"
import Time from "./utils/Time";
import World from './World';
import Raycaster from './World/Raycaster';
import View from "./View";
import Stats from 'three/examples/jsm/libs/stats.module'
import CannonDebugger from 'cannon-es-debugger'
import Debug from './utils/Debug';

let instance = null

export default class Experience {
  constructor(canvas) {
    // rerender the same instance of experience
    if (instance) return instance;
    instance = this;
    window.experience = this;

    // Setup
    this.stats = Stats()
    this.canvas = document.querySelector(canvas);
    this.stats.dom.classList.add("stat")
    document.body.appendChild(this.stats.dom);
    this.sizes = new Sizes();
    this.time = new Time();
    this.view = new View();
    this.scene = this.view.scene;
    this.physics = this.view.physics;
    this.cannonDebugger = new CannonDebugger(this.scene, this.physics)
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.raycaster = new Raycaster();
    this.debug = new Debug();
    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
    this.toggleView();
  }

  // Events
  // toggle view only/edit mode
  toggleView() {
    document.getElementById("visualizer").addEventListener("change", (e) => {
      this.viewOnly = e.target.checked;
      document.body.classList.toggle("view-only");
      this.world.transformControl.controls.detach()
      this.world.transformControl.toggle(this.viewOnly)
    })
  }

  // on screen resize
  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  // on every frame change
  update() {
    this.stats.update()
    this.view.update()
    this.camera.update();
    this.renderer.update();
    this.raycaster.update();
    this.cannonDebugger.update()

    // if (this.world.loaded) {
    //   this.world.update();
    // }
  }
}
