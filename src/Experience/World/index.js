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
    this.resources = experience.resources;
    this.floor = new Floor();
    this.objects = { arr: [] };
    this.loaded = false;

    // method
    this.render();
  }

  render() {
    this.resources.on("ready", () => {
      this.loaded = true;
      this.environment = new Environment();
      this.transformControl = new TransformControl();
      this.pushToObject("cube1", new Cube([100, 200, -200], 200, 200, 200));
      this.pushToObject("cube2", new Cube([-100, 100, 100], 200, 200, 200));
    })
  }

  pushToObject(key, value) {
    this.objects[key] = value;
    this.objects.arr.push(value.mesh);
  }
}
