import * as THREE from 'three';
import Experience from "..";

export default class Cube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.createGeometry();
    this.setTexture();
    this.createMaterial();
    this.createMesh();
  }
  createGeometry() {
    this.geometry = new THREE.BoxGeometry(200, 200, 200)
  }

  setTexture() {
    this.textures = {
      map: this.resources.items.texture
    }
  }

  createMaterial() {
    this.material = new THREE.MeshStandardMaterial({ map: this.textures.map })
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }
}
