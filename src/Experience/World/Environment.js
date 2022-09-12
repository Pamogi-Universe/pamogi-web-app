import * as THREE from 'three';
import Experience from "..";

export default class Environment {
  constructor() {
    // setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // methods
    this.setLight();
    this.setEnvLight()
  }

  // events
  setLight() {
    this.light = new THREE.DirectionalLight(0xffffff, 2);
    this.light.position.set(1, 1, 1);
    this.scene.add(this.light);
  }

  setEnvLight() {
    this.envLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(this.envLight);
  }
}
