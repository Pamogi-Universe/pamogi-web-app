import * as THREE from 'three';
import * as CANNON from "cannon-es";

export default class View {
  constructor() {
    this.addScene();
    this.addPhysics();
  }

  addScene() {
    this.scene = new THREE.Scene();
  }

  addPhysics() {
    this.physics = new CANNON.World();
    this.physics.gravity.set(0, -9.82, 0);
    const defaultMaterial = new CANNON.Material("default");
    const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
      friction: 0.1,
      restitution: 0.7
    })
    this.physics.addContactMaterial(defaultContactMaterial);
    this.physics.defaultContactMaterial = defaultContactMaterial;
  }
}
