import * as THREE from 'three';
import Experience from '..';

export default class GridHelper {
  constructor(size, divisions) {
    // setup
    this.__experience = new Experience();
    this.__experience.scene = experience.scene;
    this.__experience.size = size;
    this.__experience.divisions = divisions;

    // methods
    this.setInstance();
  }

  // events
  setInstance() {
    this.instance = new THREE.GridHelper(this.__experience.size, this.__experience.divisions, 0xFF00FF, 0x00FF00)
    this.__experience.scene.add(this.instance)
  }
}