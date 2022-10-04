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
import History from './History';
import gsap from 'gsap';

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
    this.history = new History();

    this.canvas.addEventListener('dblclick', () => {
      if (this.raycaster.currentIntersect?.object.name === "Continent") {

        const center = this.raycaster.currentIntersect.point;

        let counter = 0;

        if (!counter) {
          gsap.to(this.camera.controls.target, {
            duration: 1,
            x: center.x,
            y: center.y,
            z: center.z, // maybe adding even more offset depending on your model
            onUpdate: () => {
              // this.camera.instance.position.set(center.x, center.y + 5, center.z)
              // this.camera.instance.lookAt(center);
              // this.camera.controls.target.set(...center);
              counter++;
            }
          });

          // gsap.to(this.camera.instance.position, {
          //   duration: 1,
          //   x: center.x,
          //   y: center.y + 5,
          //   z: center.z, // maybe adding even more offset depending on your model
          //   onUpdate: () => {
          //     // this.camera.instance.lookAt(center);
          //     // this.camera.controls.target.set(...center);
          //     counter++;
          //   }
          // });
        }

      }
    })
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
    this.stats.update();
    this.camera.update();
    this.raycaster.update();
    this.points.update(this.camera.instance, this.sizes);
    this.composer.update();
  }
}
