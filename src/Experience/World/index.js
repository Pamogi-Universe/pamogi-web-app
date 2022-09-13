import Experience from "..";
import TransformControl from "../controls/transformControls"
import Cube from './Cube';
import Environment from "./Environment";
import Floor from "./Floor";

export default class World {
  constructor() {
    // Setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.physics = experience.physics;
    this.resources = experience.resources;
    this.helper = experience.helper
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
      this.pushToObject("cube1", new Cube([0, 3, 0], 1, 1.5, 2,));
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
    // const objects = { ...this.objects };
    // delete objects['meshes'];
    // delete objects['arr'];

    // for (const object in objects) {
    //   objects[object].mesh.position.copy(objects[object].body.position)
    //   objects[object].mesh.quaternion.copy(objects[object].body.quaternion)
    // }
    this.objects.arr.forEach((obj, i) => {
      if (obj.mesh.id !== this.transformControl.draggingId) {
        obj.mesh.position.set(
          obj.body.position.x,
          obj.body.position.y,
          obj.body.position.z
        );
        obj.mesh.quaternion.set(
          obj.body.quaternion.x,
          obj.body.quaternion.y,
          obj.body.quaternion.z,
          obj.body.quaternion.w
        );
      } else {
        obj.body.position.x = obj.mesh.position.x;
        obj.body.position.y = obj.mesh.position.y;
        obj.body.position.z = obj.mesh.position.z;
        obj.body.quaternion.x = obj.mesh.quaternion.x;
        obj.body.quaternion.y = obj.mesh.quaternion.y;
        obj.body.quaternion.z = obj.mesh.quaternion.z;
        obj.body.quaternion.w = obj.mesh.quaternion.w;
        obj.body.velocity.set(0, 0, 0);
        obj.body.angularVelocity.set(0, 0, 0);
      }
    });
  }
}
