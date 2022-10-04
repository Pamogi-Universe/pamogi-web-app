import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky'
import Experience from "..";

export default class Environment {
  constructor() {
    // Setup
    this._experience = new Experience();
    this.sun = new THREE.Vector3();
    this.setLight();
    // this.setEnvLight();
    this.createSky();
  }

  // Events
  // main light
  setLight() {
    this.light = new THREE.DirectionalLight(0xffffff, 2);
    this.light.position.set(5, 5, 5);
    this.light.castShadow = true;
    this.helper = new THREE.DirectionalLightHelper(this.light, 5)
    this._experience.scene.add(this.light);
  }

  // environment brightness
  setEnvLight() {
    this.envLight = new THREE.AmbientLight(0xffffff, 0.9);
    this._experience.scene.add(this.envLight);
  }

  createSky() {
    this.sky = new Sky();
    this.sky.scale.setScalar(10000);
    this._experience.scene.add(this.sky);

    const skyUniforms = this.sky.material.uniforms;
    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    this.updateSun();
  }

  updateSun() {
    this.renderTarget;
    const pmremGenerator = new THREE.PMREMGenerator(this._experience.renderer.instance);
    const phi = THREE.MathUtils.degToRad(90 - 20);
    const theta = THREE.MathUtils.degToRad(180);

    this.sun.setFromSphericalCoords(1, phi, theta);
    this.sky.material.uniforms['sunPosition'].value.copy(this.sun);

    if (this.renderTarget !== undefined) this.renderTarget.dispose();
    this.renderTarget = pmremGenerator.fromScene(this.sky);
    this._experience.scene.environment = this.renderTarget.texture;
  }
}
