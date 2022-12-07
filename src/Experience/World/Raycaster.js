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
      this.selectObject().then(value => 
        {
          if (!this.viewOnly) {
            this.__experience.world.transformControl?.addElements(value);
          }
          if(value)
          {
            console.log("Selecting element");
            this.__experience.world.setCurrentElement(value);
            this.__experience.composer.setCurrentElement(value);
            this.__experience.points.triggerClick(".point-" + value.userData.key)
          }
        });
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

  async selectObject()
  {
    if (this.currentIntersect && this.currentIntersect.object.name !== "Continent") {
      var hasFoundSceneParent = false;
      var currentParent = this.currentIntersect.object.parent;
      while(hasFoundSceneParent === false)
      {
        if(currentParent.parent.type === "Scene")
        {
          return currentParent;
        }
        else
        {
          currentParent = currentParent.parent;
        }
      }
    }
  }
}
