import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as TWEEN from "@tweenjs/tween.js";
import Experience from ".";

export default class Camera {
  constructor() {
    // Setup
    this.__experience = new Experience();

    this.setInstance();
    this.setOrbitControls();
  }

  // Events
  // initialize camera
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(55, this.__experience.sizes.width / this.__experience.sizes.height, 0.01, 20000);
    this.instance.position.set(- 3, 6, 6);
    this.instance.lookAt(0, 0, 0);
    this.__experience.scene.add(this.instance);
  }

  // initialize orbit controller
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.__experience.canvas);
    this.controls.enableDamping = true;
    this.controls.enabled = true;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.001;
    // this.controls.minDistance = 5;
    // this.controls.maxDistance = 50;
    // this.controls.enablePan = false;
    this.controls.screenSpacePanning = true;
  }

  resize() {
    this.instance.aspect = this.__experience.sizes.ratio;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
