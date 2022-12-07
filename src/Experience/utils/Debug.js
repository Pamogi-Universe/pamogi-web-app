import * as dat from 'lil-gui'
import Experience from '..';

export default class Debug {
  constructor() {
    this.__experience = new Experience();
    this.ui = new dat.GUI();
  }
}