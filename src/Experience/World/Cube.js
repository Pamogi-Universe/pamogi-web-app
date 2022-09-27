import * as THREE from 'three';
import Experience from "..";

export default class Cube {
  constructor(position = [0, 0, 0], width, height, depth) {
    // params
    this.options = {
      width,
      height,
      depth,
      position: {
        x: position[0],
        y: position[1],
        z: position[2]
      }
    }

    // Setup
    this.experience = new Experience();
    this.instantiate(...Object.values(this.options), this.experience.scene)

    this.destroy()
  }

  // Events
  // create the cube
  instantiate(width, height, depth, position, scene) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
    })
    // three.js mesh
    this.mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    this.mesh.scale.set(width, height, depth)
    this.mesh.castShadow = true
    this.mesh.position.set(position.x, position.y, position.z)
    scene.add(this.mesh)
  }

  destroy() {}
}
