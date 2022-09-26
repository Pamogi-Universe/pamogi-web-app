import * as THREE from 'three';
import Experience from ".";

export default class Renderer {
  constructor() {
    // Setup
    const experience = new Experience();
    this.sizes = experience.sizes;
    this.scene = experience.scene;
    this.canvas = experience.canvas;
    this.camera = experience.camera;
    this.setInstance();
  }

  // Events
  // display the scene
  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.physicallyCorrectLights = true;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 0.8;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.shadowMap.enabled = true;

    this.sizing();
  }

  // set canvas size
  sizing() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  // update on every frame
  update() {
    this.instance.render(this.scene, this.camera.instance);
  }

  // on screen resize
  resize() {
    this.sizing();
  }
}
