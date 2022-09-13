import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from ".";

export default class Camera {
  constructor() {
    // Setup
    const experience = new Experience();
    this.sizes = experience.sizes;
    this.scene = experience.scene;
    this.canvas = experience.canvas;
    this.setInstance();
    this.setOrbitControls();
  }

  // Events
  // initialize camera
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.01, 100);
    this.instance.position.set(- 3, 6, 6);
    this.instance.lookAt(0, 200, 0);
    this.scene.add(this.instance);
  }

  // initialize orbit controller
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enabled = true;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.001;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
    this.controls.enablePan = false;
  }

  resize() {
    this.instance.aspect = this.sizes.ratio;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
