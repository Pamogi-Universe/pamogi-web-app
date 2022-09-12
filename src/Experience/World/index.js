import Experience from "..";
import TransformControl from "../controls/transformControls";
import GridHelper from '../helpers/GridHelper';
import Cube from './Cube';
import Environment from "./Environment";

export default class World {
  constructor() {
    // setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.gridHelper = new GridHelper(1000, 10);
    this.resources = experience.resources;
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
      this.pushToObject("cube1", new Cube([100, 0, -200]));
      this.pushToObject("cube2", new Cube([-100, 0, 100]));
      this.transformControl.addElements(this.objects.cube1.mesh)
    })
  }

  pushToObject(key, value) {
    this.objects[key] = value;
    this.objects.arr.push(value.mesh);
  }
}
