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
    this.outlinePass = this.experience.composer
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
    this.instance.setFromCamera(this.mouse, this.camera);

    if (this.world.loaded) {
      const intersects = this.instance.intersectObjects(this.world.objects.meshes)

      if (intersects.length) {
        this.currentIntersect = intersects[0];
        this.canvas.addEventListener('click', () => {
          if (this.currentIntersect) {
            const current = this.world.objects.meshes.filter((val, id) => {
              const intersectID = this.currentIntersect.object.parent.type === "Scene" ? this.currentIntersect.object.uuid : this.currentIntersect.object.parent.uuid
              return intersectID === val.uuid
            })[0];

            if (!this.viewOnly) {
              this.world.transformControl?.addElements(current);
              this.world.setCurrentElement(current);
            }
            this.outlinePass.setCurrentElement(current);
          }
        })
      }
      else {
        this.currentIntersect = null
      }
    }
  }
}
