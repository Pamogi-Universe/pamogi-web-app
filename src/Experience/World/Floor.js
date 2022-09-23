import * as THREE from 'three';
import Experience from '..';

export default class Floor {
  constructor() {
    // Setup
    const experience = new Experience()
    this.createFloorMesh(experience.scene);
  }

  // Events
  // floor mesh
  createFloorMesh(scene) {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({
        color: '#222222',
      })
    )
    this.mesh.receiveShadow = true
    this.mesh.rotation.x = - Math.PI * 0.5
    scene.add(this.mesh)
  }
}
