import * as THREE from 'three';
import Experience from '..';

export default class GridHelper {
  constructor(size, divisions) {
    // setup
    this.experience = new Experience();
    this.experience.scene = experience.scene;
    this.experience.size = size;
    this.experience.divisions = divisions;

    // methods
    this.setInstance();
  }

  // events
  setInstance() {
    this.instance = new THREE.GridHelper(this.experience.size, this.experience.divisions, 0xFF00FF, 0x00FF00)
    this.experience.scene.add(this.instance)
  }
}