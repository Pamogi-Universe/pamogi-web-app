import * as THREE from 'three';
import Experience from '..';

export default class Raycaster {
  constructor() {
    // Setup
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.instance;
    this.world = this.experience.world;
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
    this.viewOnly = this.experience.viewOnly;
    this.instance.setFromCamera(this.mouse, this.camera)

    if (this.world.loaded) {
      const intersects = this.instance.intersectObjects(this.world.objects.meshes)
      if (intersects.length) {
        this.currentIntersect = intersects[0];
        this.canvas.addEventListener('click', () => {
          if (this.currentIntersect) {
            const current = this.world.objects.meshes.filter(val => this.currentIntersect.object.uuid === val.uuid)[0];

            this.world.objects.arr.map(val => {
              val.mesh.isCurrent = false;
              if (val.mesh === current) {
                this.selectedElement = val;
              }
            })
            if (!this.viewOnly) {
              console.log(this.viewOnly)
              this.world.transformControl?.addElements(current)
              current.isCurrent = true
              this.world.objects.current = this.world.objects.arr.filter(val => val.mesh.isCurrent)[0];
            }
          }
        })
      }
      else {
        this.currentIntersect = null
      }
    }
  }
}
