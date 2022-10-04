import * as THREE from 'three';
import Experience from ".";

export default class Renderer {
  constructor() {
    // Setup
    this.__experience = new Experience();
    this.setInstance();
  }

  // Events
  // display the scene
  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.__experience.canvas,
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
    this.instance.setSize(this.__experience.sizes.width, this.__experience.sizes.height)
    this.instance.setPixelRatio(Math.min(this.__experience.sizes.pixelRatio, 2))
  }

  // update on every frame
  update() {
    this.instance.render(this.__experience.scene, this.__experience.camera.instance);
  }

  // on screen resize
  resize() {
    this.sizing();
  }
}
