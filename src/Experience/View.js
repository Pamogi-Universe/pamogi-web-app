import * as THREE from 'three';
import * as CANNON from "cannon-es";
import Experience from '.';

export default class View {
  constructor() {
    // Setup
    const experience = new Experience();
    this.delta = experience.time.delta
    this.addScene();
    this.addPhysics();
  }

  // Events
  // adds the scene to the project
  addScene() {
    this.scene = new THREE.Scene();
  }

  // adds the physics to the project
  addPhysics() {
    this.physics = new CANNON.World();
    // this.physics.gravity.set(0, -9.82, 0); // gravity
    const defaultMaterial = new CANNON.Material("default");
    const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
      friction: 0.1,
      restitution: 0.7
    })
    this.physics.addContactMaterial(defaultContactMaterial);
    this.physics.defaultContactMaterial = defaultContactMaterial;
    this.physics.allowSleep = true
    this.physics.broadphase = new CANNON.SAPBroadphase(this.physics)
  }

  // updates the physics
  update() {
    this.physics.step(1 / 60, this.delta, 3)
  }
}
