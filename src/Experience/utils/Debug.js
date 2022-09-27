import * as dat from 'lil-gui'
import Experience from '..';

export default class Debug {
  constructor() {
    const experience = new Experience();
    this.world = experience.world;
    this.ui = new dat.GUI();
  }
}