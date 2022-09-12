import * as THREE from 'three';
import Experience from "..";

export default class Cube {
  constructor(position = [0, 0, 0]) {
    this.position = position
    const experience = new Experience();
    this.scene = experience.scene;
    this.resources = experience.resources;
    // this.transformControl = experience.transformControl

    this.createGeometry();
    this.setTexture();
    this.createMaterial();
    this.createMesh();
    // this.enableTransformControls()
  }

  createGeometry() {
    this.geometry = new THREE.BoxGeometry(200, 200, 200)
  }

  setTexture() {
    this.textures = {
      map: this.resources.items.crateColor,
      // aoMap: this.resources.items.crateAmbientOcclusion,
      normalMap: this.resources.items.crateNormal,
      displacementMap: this.resources.items.crateHeight,
      displacementScale: 1,
      transparent: true,
    }
  }

  createMaterial() {
    this.material = new THREE.MeshStandardMaterial({ ...this.textures })
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(...this.position)
    this.scene.add(this.mesh)
  }

  // enableTransformControls() {
  //   this.transformControl.controls.attach(this.mesh)
  // }
}
