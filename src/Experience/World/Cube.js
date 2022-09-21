import * as THREE from 'three';
import * as CANNON from "cannon-es";
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
    const experience = new Experience();
    this.instantiate(...Object.values(this.options), experience.scene, experience.physics)

    this.destroy()
  }

  // Events
  // create the cube
  instantiate(width, height, depth, position, scene, physics) {
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

    // cannon.js body
    const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
    this.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: shape,
    })
    this.body.position.set(position.x, position.y, position.z)
    physics.addBody(this.body)
  }

  destroy() {
    // this.mesh.geometry.dispose()
    // for (const key in this.mesh.material) {
    //   const value = this.mesh.material[key]
    //   console.log(key, value)
    // }
  }
}
