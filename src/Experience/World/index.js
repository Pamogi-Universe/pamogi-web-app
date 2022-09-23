import Experience from "..";
import TransformControl from "../controls/transformControls"
import Environment from "./Environment";
import Floor from "./Floor";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import random from "../utils/randomKey";

export default class World {
  constructor() {
    // Setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.resources = experience.resources;
    this.helpers = {}
    this.floor = new Floor();
    this.gltfLoader = new GLTFLoader();
    this.objects = { meshes: [], arr: [] };
    this.loaded = false;
    this.render();
  }

  // Events
  // renders the world
  render() {
    this.resources.on("ready", () => {
      this.loaded = true;
      this.environment = new Environment();
      this.transformControl = new TransformControl();
    })
  }

  // pushes all the 3d objects to array
  pushToObject(key, value) {
    this.objects[key] = value;
    this.objects.meshes.push(value);
    this.objects.arr.push(value);
  }

  // updates mesh position on the basis of body position
  update() { }

  loadModal(name, url) {
    if (!this.objects[name]) {
      this.gltfLoader.load(url, (gltf) => {
        this.pushToObject(`${name}-${random()}`, gltf.scene.children[0]);
        this.scene.add(gltf.scene.children[0])
      })
    } else {
      const clone = this.objects[name].clone();
      clone.position.set(0,0,0);
      this.pushToObject(`${name}-${random()}`, clone);
      this.scene.add(clone)
    }
  }
}
