import Experience from "..";
import GridHelper from '../helpers/GridHelper';
import Cube from './Cube';

export default class World {
  constructor() {
    // setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.gridHelper = new GridHelper(1000, 10);
    this.resources = experience.resources;
    this.cube = new Cube()

    // method
  }
}
