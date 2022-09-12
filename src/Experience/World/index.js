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

    // method
    this.render();
  }

  render() {
    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.transformControl = new TransformControl()
      this.cube1 = new Cube([100, 0, -200]);
      this.cube2 = new Cube([-100, 0, 100]);
      this.transformControl.addElements(this.cube1.mesh)
    })
  }
}
