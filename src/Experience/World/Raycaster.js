import * as THREE from 'three';
import Experience from '..';

export default class Raycaster {
  constructor() {
    // Setup
    this.experience = new Experience();
    this.currentIntersect = null;
    this.setInstance();
  }

  // Events
  // initialize raycaster
  setInstance() {
    this.instance = new THREE.Raycaster();
    this.mouse = new THREE.Vector2()

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX / this.experience.sizes.width * 2 - 1
      this.mouse.y = - (event.clientY / this.experience.sizes.height) * 2 + 1
    })
  }

  // update on every frame
  update() {
    this.viewOnly = this.experience.viewOnly;
    this.instance.setFromCamera(this.mouse, this.experience.camera.instance);

    if (this.experience.world.loaded) {
      const intersects = this.instance.intersectObjects(this.experience.world.objects.meshes)

      if (intersects.length) {
        this.currentIntersect = intersects[0];
        this.experience.canvas.addEventListener('click', () => {
          if (this.currentIntersect) {
            const current = this.experience.world.objects.meshes.filter((val, id) => {
              const intersectID = this.currentIntersect.object.parent.type === "Scene" ? this.currentIntersect.object.uuid : this.currentIntersect.object.parent.uuid
              return intersectID === val.uuid
            })[0];

            if (!this.viewOnly) {
              this.experience.world.transformControl?.addElements(current);
              this.experience.world.setCurrentElement(current);
            }
            this.experience.composer.setCurrentElement(current);
          }
        })
      }
      else {
        this.currentIntersect = null
      }
    }
  }
}
