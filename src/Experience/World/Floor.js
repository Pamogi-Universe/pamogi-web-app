import * as THREE from 'three';
import * as CANNON from "cannon-es";
import Experience from '..';

export default class Floor {
  constructor() {
    // Setup
    const experience = new Experience()
    this.createFloorPhysics(experience.physics);
    this.createFloorMesh(experience.scene);
  }

  // Events
  // floor mesh
  createFloorMesh(scene) {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: '#777777',
      })
    )
    this.mesh.receiveShadow = true
    this.mesh.rotation.x = - Math.PI * 0.5
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);
    scene.add(this.mesh)
  }

  // floor body
  createFloorPhysics(physics) {
    this.body = new CANNON.Body({
      shape: new CANNON.Plane(),
      type: CANNON.Body.STATIC,
    })
    this.body.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    )
    physics.addBody(this.body)
  }
}
