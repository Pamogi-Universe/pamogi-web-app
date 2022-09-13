import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from ".";

export default class Camera {
  constructor() {
    // setup
    const experience = new Experience();
    this.sizes = experience.sizes;
    this.scene = experience.scene;
    this.canvas = experience.canvas;

    // methods
    this.setInstance();
    this.setOrbitControls();
  }

  // events
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(50, this.sizes.ratio, 0.01, 30000);
    this.instance.position.set(1000, 500, 1000);
    this.instance.lookAt(0, 200, 0);
    this.scene.add(this.instance);
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enabled = true;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.001;
  }
  resize() {
    this.instance.aspect = this.sizes.ratio;
    this.instance.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
  }
}
