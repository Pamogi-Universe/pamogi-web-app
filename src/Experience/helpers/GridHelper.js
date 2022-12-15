import * as THREE from 'three';
import Experience from '..';

export default class GridHelper {
  constructor(size, divisions) {
    // setup
    this.__experience = new Experience();
    this.__experience.size = size;
    this.__experience.divisions = divisions;
    this.controls = {
      enabled: false
    }
    this.gui = this.__experience.debug.ui.add(this.controls, "enabled").name("Enable/Disable Grid").onChange(val => {
      this.toggle(val);
    })

    
    // methods
    this.setInstance();
  }

  // events
  setInstance() {
    this.instance = new THREE.GridHelper(this.__experience.size, this.__experience.divisions, 0xFF00FF, 0x00FF00)
    this.instance.position.y = 0.01;
  }

  toggle(val) {
    if (val) this.__experience.scene.add(this.instance)
    else this.__experience.scene.remove(this.instance);
  }
}
