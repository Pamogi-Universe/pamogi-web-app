import * as THREE from 'three';
import Experience from "..";

export default class Environment {
  constructor() {
    // Setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.resources = experience.resources;
    this.setLight();
    this.setEnvLight()
  }

  // Events
  // main light
  setLight() {
    this.light = new THREE.DirectionalLight(0xffffff, 2);
    this.light.position.set(1, 1, 1);
    this.scene.add(this.light);
  }

  // environment brightness
  setEnvLight() {
    this.envLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(this.envLight);
  }
}
