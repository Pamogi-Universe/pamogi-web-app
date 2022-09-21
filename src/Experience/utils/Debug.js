import * as dat from 'lil-gui'
import Experience from '..';

export default class Debug {
  constructor() {
    const experience = new Experience();
    this.world = experience.world;
    this.ui = new dat.GUI();
    this.obj = {
      viewOnly: false
    }


    // this.world.resources.on("ready", () => {
    //   this.transformControl = this.world.transformControl;
    // })

    this.ui.add(this.obj, "viewOnly", { View: true, Edit: false }).name("Toggle View/Edit").onChange(() => {
      this.world.transformControl.detach()
      console.log(this.world.transformControl.controls.showX)
      this.world.transformControl.controls.showX = !this.world.transformControl.controls.showX;
      this.world.transformControl.controls.showY = !this.world.transformControl.controls.showY;
      this.world.transformControl.controls.showZ = !this.world.transformControl.controls.showZ;
    })
  }
}