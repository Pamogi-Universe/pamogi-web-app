import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky'
import Experience from "..";

export default class Environment {
  constructor() {
    // Setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.resources = experience.resources;
    this.renderer = experience.renderer.instance
    this.sun = new THREE.Vector3();
    // this.setLight();
    // this.setEnvLight();
    this.createSky();
  }

  // Events
  // main light
  setLight() {
    this.light = new THREE.DirectionalLight(0xffffff, 2);
    this.light.position.set(5, 5, 5);
    this.light.castShadow = true;
    this.scene.add(this.light);
  }

  // environment brightness
  setEnvLight() {
    this.envLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.envLight);
  }

  createSky() {
    this.sky = new Sky();
    this.sky.scale.setScalar(10000);
    this.scene.add(this.sky);

    const skyUniforms = this.sky.material.uniforms;
    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    this.updateSun();
  }

  updateSun() {
    let renderTarget;
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    const phi = THREE.MathUtils.degToRad(90 - 20);
    const theta = THREE.MathUtils.degToRad(180);

    this.sun.setFromSphericalCoords(1, phi, theta);
    this.sky.material.uniforms['sunPosition'].value.copy(this.sun);

    if (renderTarget !== undefined) renderTarget.dispose();
    renderTarget = pmremGenerator.fromScene(this.sky);
    this.scene.environment = renderTarget.texture;
  }
}
