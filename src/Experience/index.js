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
import objects from './objects';

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
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.raycaster = new Raycaster();
    this.debug = new Debug();
    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
    this.toggleView();
    this.renderObjects();
    this.dragEvent()
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

  renderObjects() {
    document.querySelector(".object__list").innerHTML = '';

    objects.forEach((val, id) => {
      document.querySelector(".object__list").innerHTML += `
        <div class="object__item">
          <img class="object__img" src="${val.url}" alt="${val.name}">
        </div>
    `
    })
  }

  dragEvent() {
    let counter = 0;
    document.querySelectorAll(".object__img").forEach((element, id) => {
      element.addEventListener("dragend", (e) => {

        const mouseMove = (e) => {
          const x = e.clientX, y = e.clientY,
            elementMouseIsOver = document.elementFromPoint(x, y);

          if (elementMouseIsOver === this.canvas) {
            if (!counter)
              this.world.loadModal(objects[id].name, objects[id].model)
            counter++
          }
        }

        window.addEventListener("mousemove", mouseMove);
        setTimeout(() => {
          window.removeEventListener("mousemove", mouseMove);
          counter = 0;
        }, 50);
      })
    });
  }

  // on screen resize
  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  // on every frame change
  update() {
    this.stats.update()
    this.camera.update();
    this.renderer.update();
    this.raycaster.update();
  }
}
