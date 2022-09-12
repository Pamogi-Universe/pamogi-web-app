import * as THREE from 'three';
import Experience from ".";

export default class Renderer {
  constructor() {
    // setup
    const experience = new Experience();
    this.sizes = experience.sizes;
    this.scene = experience.scene;
    this.canvas = experience.canvas;
    this.camera = experience.camera;

    // methods
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      physicallyCorrectLights: true,
      outputEncoding: THREE.sRGBEncoding,
      toneMapping: THREE.CineonToneMapping,
      toneMappingExposure: 1.75,
      shadowMap: {
        enabled: true,
        type: THREE.PCFSoftShadowMap
      }
    });

    this.sizing();
  }
  sizing() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }
  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
  resize() {
    this.sizing();
  }
}
