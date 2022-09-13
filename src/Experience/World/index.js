import Experience from "..";
import TransformControl from "../controls/transformControls"
import Cube from './Cube';
import Environment from "./Environment";
import Floor from "./Floor";
import GridHelper from "../helpers/GridHelper"

export default class World {
  constructor() {
    // Setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.physics = experience.physics;
    this.resources = experience.resources;
    this.helper = {
      // grid: new GridHelper(10, 10);
    }
    this.floor = new Floor();
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
      this.pushToObject("cube1", new Cube([0, 2, 0], 1, 1.5, 2));
      this.pushToObject("cube2", new Cube([-3, 2, 1], 2, 2, 2));
    })
  }

  // pushes all the 3d objects to array
  pushToObject(key, value) {
    this.objects[key] = value;
    this.objects.meshes.push(value.mesh);
    this.objects.arr.push(value);
  }

  // updates mesh position on the basis of body position
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
