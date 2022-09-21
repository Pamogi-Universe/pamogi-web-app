import * as dat from 'lil-gui'

export default class Debug {
  constructor() {
    this.ui = new dat.GUI();
    this.obj = {
      viewOnly: false
    }

    this.ui.add(this.obj, "viewOnly", { View: true, Edit: false }).name("Toggle View/Edit")
  }
}