import * as THREE from 'three';
import * as CANNON from "cannon-es";
import Experience from "..";

export default class Cube {
  constructor(position = [0, 0, 0], width, height, depth) {
    // options
    this.options = { position, width, height, depth }

    // setup
    const experience = new Experience();

    // methods
    this.geometry([width, height, depth]);
    this.setTexture(experience.resources);
    this.createMesh(experience.scene, position, this.geometry([width, height, depth]), this.createMaterial());
    this.createPhysics(experience.physics, position)
  }

  // events
  geometry(props) {
    return new THREE.BoxGeometry(...props)
  }

  setTexture(resources) {
    this.options.textures = {
      map: resources.items.crateColor,
      normalMap: resources.items.crateNormal,
      displacementMap: resources.items.crateHeight,
      displacementScale: 1,
      transparent: true,
    }
  }

  createMaterial() {
    return new THREE.MeshStandardMaterial({ ...this.options.textures })
  }

  createMesh(scene, position, geometry, material) {
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.set(...position)
    scene.add(this.mesh)
  }

  createPhysics(physics, position) {
    this.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: new CANNON.Box(new CANNON.Vec3(this.width * 0.5, this.height * 0.5, this.depth * 0.5)),
    })
    this.body.position.set(...position)
    physics.addBody(this.body)
  }
}
