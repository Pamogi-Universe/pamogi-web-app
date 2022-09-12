import * as THREE from 'three';
import Experience from "..";
import GridHelper from '../helpers/GridHelper';
import Cube from './Cube';

export default class World {
  constructor() {
    // setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.gridHelper = new GridHelper(1000, 10);
    this.resources = this.experience.resources;
    this.cube = new Cube()

    // method
  }
}
