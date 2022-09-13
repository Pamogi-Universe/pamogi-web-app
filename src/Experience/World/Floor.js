import * as THREE from 'three';
import * as CANNON from "cannon-es";
import Experience from '..';

export default class Floor {
  constructor() {
    const experience = new Experience()

    this.createFloorMesh(experience.scene);
    this.createFloorPhysics(experience.physics);
  }

  createFloorMesh(scene) {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({
        color: '#777777',
        // side: THREE.DoubleSide
      })
    )
    this.mesh.receiveShadow = true
    this.mesh.rotation.x = - Math.PI * 0.5
    scene.add(this.mesh)
  }

  createFloorPhysics(physics) {
    this.body = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
    })
    this.body.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    )
    physics.addBody(this.body)
  }
}