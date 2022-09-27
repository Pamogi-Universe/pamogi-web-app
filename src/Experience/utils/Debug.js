import * as dat from 'lil-gui'
import Experience from '..';

export default class Debug {
  constructor() {
    this.experience = new Experience();
    this.ui = new dat.GUI();
  }
}