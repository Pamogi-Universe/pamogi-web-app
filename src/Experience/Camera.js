import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from ".";

export default class Camera {
  constructor() {
    // Setup
    this.experience = new Experience();

    this.setInstance();
    this.setOrbitControls();
  }

  // Events
  // initialize camera
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(55, this.experience.sizes.width / this.experience.sizes.height, 1, 20000);
    this.instance.position.set(- 3, 6, 6);
    this.instance.lookAt(0, 0, 0);
    this.experience.scene.add(this.instance);
  }

  // initialize orbit controller
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.experience.canvas);
    this.controls.enableDamping = true;
    this.controls.enabled = true;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
    // this.controls.minDistance = 5;
    // this.controls.maxDistance = 50;
    // this.controls.enablePan = false;
    this.controls.screenSpacePanning = true;
  }

  resize() {
    this.instance.aspect = this.experience.sizes.ratio;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
