import * as THREE from 'three';
import * as CANNON from "cannon-es";
import Experience from "..";

export default class Cube {
  constructor(position = [0, 0, 0], width, height, depth) {
    // options
    this.options = { position: { x: position[0], y: position[1], z: position[2] }, width, height, depth }

    // setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.physics = experience.physics;

    // methods
    this.instantiate(this.options.width, this.options.height, this.options.depth, this.options.position)
  }

  // events
  instantiate(width, height, depth, position) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
    })
    // Three.js mesh
    this.mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    this.mesh.scale.set(width, height, depth)
    this.mesh.castShadow = true
    this.mesh.position.set(position.x, position.y, position.z)
    this.scene.add(this.mesh)

    // Cannon.js body
    const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))

    this.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: shape,
    })
    this.body.position.set(position.x, position.y, position.z)
    this.physics.addBody(this.body)
  }
}
