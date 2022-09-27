import Experience from '..';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Floor {
  constructor() {
    // Setup
    this.experience = new Experience()
    this.createFloorMesh(this.experience.scene);
  }

  // Events
  // floor mesh
  createFloorMesh(scene) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/models/Continent.glb", (gltf) => {
      this.instance = gltf.scene.children[0];

      scene.add(this.instance)
    })
  }
}
