import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';
import Resources from './utils/Resources';
import Sizes from "./utils/Sizes"
import Time from "./utils/Time";
import World from './World';
import Raycaster from './World/Raycaster';
import Stats from 'three/examples/jsm/libs/stats.module'
import Debug from './utils/Debug';
import DomEvents from './DomEvents';
import Points from './Points';
import Composer from './composer/Composer';

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
    this.points = new Points();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.composer = new Composer();
    this.raycaster = new Raycaster();
    this.debug = new Debug();
    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
    this.domEvents = new DomEvents();
  }

  // Events
  // on screen resize
  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  // on every frame change
  update() {
    this.viewOnly = this.domEvents.viewOnly;
    this.stats.update()
    this.camera.update();
    this.renderer.update();
    this.raycaster.update();
    this.points.update(this.camera.instance, this.sizes);
    this.composer.instance.render();
    this.domEvents.toggleDetail();
  }
}
