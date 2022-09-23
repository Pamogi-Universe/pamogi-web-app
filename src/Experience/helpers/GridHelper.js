import * as THREE from 'three';
import Experience from '..';

export default class GridHelper {
  constructor(size, divisions) {
    // setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.size = size;
    this.divisions = divisions;

    // methods
    this.setInstance();
  }

  // events
  setInstance() {
    this.instance = new THREE.GridHelper(this.size, this.divisions, 0xFF00FF, 0x00FF00)
    this.scene.add(this.instance)
  }
}