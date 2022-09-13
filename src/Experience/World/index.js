import * as THREE from 'three';
import * as CANNON from "cannon-es";
import Experience from "..";
import TransformControl from "../controls/transformControls"
import Cube from './Cube';
import Environment from "./Environment";
import Floor from "./Floor";

export default class World {
  constructor() {
    // setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.physics = experience.physics;
    this.resources = experience.resources;
    this.helper = experience.helper
    this.floor = new Floor();
    this.objects = { meshes: [], arr: [] };
    this.loaded = false;

    // method
    this.render();
  }

  render() {
    this.resources.on("ready", () => {
      this.loaded = true;
      this.environment = new Environment();
      this.transformControl = new TransformControl();
      this.pushToObject("cube1", new Cube([0, 3, 0], 1, 1.5, 2,));
      this.pushToObject("cube2", new Cube([-3, 2, 1], 2, 2, 2));
    })
  }

  pushToObject(key, value) {
    this.objects[key] = value;
    this.objects.meshes.push(value.mesh);
    this.objects.arr.push(value);
  }

  update() {
    const objects = { ...this.objects };
    delete objects['meshes'];
    delete objects['arr'];

    for (const object in objects) {
      objects[object].mesh.position.copy(objects[object].body.position)
      objects[object].mesh.quaternion.copy(objects[object].body.quaternion)
    }
  }
}
