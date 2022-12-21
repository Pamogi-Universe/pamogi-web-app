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

    this.__experience.canvas.addEventListener('click', () => {
      this.selectObject().then(value => {
        if (!this.viewOnly) {
          this.__experience.world.transformControl?.addElements(value);
        }
        if (value) {
          this.__experience.world.setCurrentElement(value);
          this.__experience.composer.setCurrentElement(value);
          this.__experience.points.triggerClick(".point-" + value.userData.key)
        }
      });
    })

    this.__experience.canvas.addEventListener('dblclick', () => {
      if (this.__experience.world.objects.current?.position) {
        const { x, y, z } = this.__experience.world.objects.current.position;
        gsap.to(this.__experience.camera.controls.target, {
          duration: 1,
          x,
          y,
          z,
          onUpdate: () => { }
        });
      }
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
      }
      else {
        this.currentIntersect = null
      }
    }
  }

  async selectObject() {
    if (this.currentIntersect && this.currentIntersect.object.name !== "Continent") {
      if (this.currentIntersect.object.name === "Cloud") {
        return this.currentIntersect.object;
      }
      if (this.currentIntersect.object.parent) {
        var currentParent = this.currentIntersect.object.parent;
        while (true) {
          if (!currentParent.parent)
            break;
          if (currentParent.parent.type === "Scene" || (currentParent.parent.userData.tag === "River" && currentParent.userData.tag === "Vegetation")) {
            return currentParent;
          }
          else {
            currentParent = currentParent.parent;
          }
        }
      }
    }
  }
}
