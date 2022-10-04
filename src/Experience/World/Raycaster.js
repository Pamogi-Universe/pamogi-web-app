import gsap from 'gsap';
import * as THREE from 'three';
import Experience from '..';

export default class Raycaster {
  constructor() {
    // Setup
    this.__experience = new Experience();
    this.currentIntersect = null;
    this.setInstance();
  }

  // Events
  // initialize raycaster
  setInstance() {
    this.instance = new THREE.Raycaster();
    this.mouse = new THREE.Vector2()

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX / this.__experience.sizes.width * 2 - 1
      this.mouse.y = - (event.clientY / this.__experience.sizes.height) * 2 + 1
    })
  }

  // update on every frame
  update() {
    this.viewOnly = this.__experience.viewOnly;
    this.instance.setFromCamera(this.mouse, this.__experience.camera.instance);

    if (this.__experience.world.loaded) {
      let arr = [];
      if (!this.__experience.world.floor.instance) arr = this.__experience.world.objects.meshes;
      else arr = [...this.__experience.world.objects.meshes, this.__experience.world.floor.instance];

      const intersects = this.instance.intersectObjects(arr)

      if (intersects.length) {
        this.currentIntersect = intersects[0];

        this.__experience.canvas.addEventListener('click', () => {
          if (this.currentIntersect && this.currentIntersect.object.name !== "Continent") {
            const current = this.__experience.world.objects.meshes.filter((val, id) => {
              const intersectID = this.currentIntersect.object.parent.type === "Scene" ? this.currentIntersect.object.uuid : this.currentIntersect.object.parent.uuid
              return intersectID === val.uuid
            })[0];

            if (!this.viewOnly) {
              this.__experience.world.transformControl?.addElements(current);
            }
            this.__experience.world.setCurrentElement(current);
            this.__experience.composer.setCurrentElement(current);
          }
        })

        this.__experience.canvas.addEventListener('dblclick', () => {
          if (this.currentIntersect?.object.name === "Continent") {

            const center = this.currentIntersect.point;

            // this.__experience.camera.controls.target.set(...controlPoint);
            // gsap.to(this.__experience.camera.instance.position, {
              // duration: 1,
              // x: center.x,
              // y: center.y + 5,
              // z: center.z, // maybe adding even more offset depending on your model
              // onUpdate: () => this.__experience.camera.instance.lookAt(center)
            // });
          }
        })
      }
      else {
        this.currentIntersect = null
      }
    }
  }
}
