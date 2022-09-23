import * as THREE from 'three';
import Experience from "..";
import TransformControl from "../controls/transformControls"
import Environment from "./Environment";
import Floor from "./Floor";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import random from "../utils/randomKey";
import GridHelper from '../helpers/GridHelper';

export default class World {
  constructor() {
    // Setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.resources = experience.resources;
    this.helpers = {
      gridHelper: new GridHelper(10, 10)
    }
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
    value.dataKey = key;
    this.objects.meshes.push(value);
  }

  removeFromObject() {
    this.objects.current.geometry.dispose()

    for (const key in this.objects.current.material) {
      const val = this.objects.current.material[key]
      if (val && val.dispose === 'function') {
        val.dispose();
      }
    }

    this.transformControl.detach();
    this.scene.remove(this.objects.current)

    let index = null;
    this.objects.meshes.forEach((val, id) => {
      if (val.uuid === this.objects.current.uuid) {
        index = id;
      }
    });
    delete this.objects[this.objects.meshes[index].dataKey];
    this.objects.meshes.splice(index, 1);
    this.objects.current = null;
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
      clone.position.set(0, 0, 0);
      this.pushToObject(`${name}-${random()}`, clone);
      this.scene.add(clone)
    }
  }
}
