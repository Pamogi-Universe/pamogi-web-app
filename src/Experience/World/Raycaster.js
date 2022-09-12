import * as THREE from 'three';
import Experience from '..';

export default class Raycaster {
  constructor() {
    const experience = new Experience();
    this.sizes = experience.sizes;
    this.resources = experience.resources;
    this.world = experience.world
    this.currentIntersect = null;
    console.log(experience);

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.Raycaster();

    this.mouse = new THREE.Vector2()

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX / this.sizes.width * 2 - 1
      this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
    })

    window.addEventListener('click', () => {
      // if (currentIntersect) {
      //   switch (currentIntersect.object) {
      //     case object1:
      //       console.log('click on object 1')
      //       break

      //     case object2:
      //       console.log('click on object 2')
      //       break

      //     case object3:
      //       console.log('click on object 3')
      //       break
      //   }
      // }
    })
  }

  update(intersects) {
    if (intersects.length) {
      // if (!this.currentIntersect) console.log('mouse enter')
      this.currentIntersect = intersects[0];
      window.addEventListener('click', () => {
        if (this.currentIntersect) {
          const current = this.world.objects.arr.filter(val => this.currentIntersect.object.uuid === val.uuid)[0]
          this.world.transformControl.addElements(current)
        }
      })
    }
    else {
      // if (this.currentIntersect) console.log('mouse leave')
      this.currentIntersect = null
    }
  }
}
