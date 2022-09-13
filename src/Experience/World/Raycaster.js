import * as THREE from 'three';
import Experience from '..';

export default class Raycaster {
  constructor() {
    // Setup
    const experience = new Experience();
    this.sizes = experience.sizes;
    this.resources = experience.resources;
    this.camera = experience.camera.instance;
    this.world = experience.world
    this.currentIntersect = null;
    this.selectedElement = null;
    this.setInstance();
  }

  // Events
  // initialize raycaster
  setInstance() {
    this.instance = new THREE.Raycaster();

    this.mouse = new THREE.Vector2()

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX / this.sizes.width * 2 - 1
      this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
    })
  }

  // update on every frame
  update() {
    this.instance.setFromCamera(this.mouse, this.camera)

    if (this.world.loaded) {
      const intersects = this.instance.intersectObjects(this.world.objects.meshes)
      if (intersects.length) {
        // if (!this.currentIntersect) console.log('mouse enter')
        this.currentIntersect = intersects[0];
        window.addEventListener('click', () => {
          if (this.currentIntersect) {
            const current = this.world.objects.meshes.filter(val => this.currentIntersect.object.uuid === val.uuid)[0];

            this.world.objects.arr.forEach(val => {
              if (val.mesh.uuid === current.uuid) {
                this.selectedElement = val;
              }
            })
            // this.world.transformControl?.addElements(current)
          }
        })
      }
      else {
        // if (this.currentIntersect) console.log('mouse leave')
        this.currentIntersect = null
      }
    }
  }
}
