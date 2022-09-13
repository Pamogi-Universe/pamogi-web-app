import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DragControls } from "three/examples/jsm/controls/DragControls";
import Experience from '..';

export default class TransformControl {
  constructor() {
    // Setup
    const experience = new Experience();
    this.scene = experience.scene;
    this.camera = experience.camera;
    this.canvas = experience.canvas;
    this.world = experience.world;
    this.raycaster = experience.raycaster;
    this.setInstance();
    this.setControls();
  }

  // Events
  // initialize transform controller
  setInstance() {
    // this.controls = new TransformControls(this.camera.instance, this.canvas);
    // this.controls.addEventListener('dragging-changed', (event) => {
    //   this.raycaster.selectedElement.body.position.copy(this.raycaster.selectedElement.mesh.position)
    //   console.log({ body: this.raycaster.selectedElement.body.position, mesh: this.raycaster.selectedElement.mesh.position });
    //   this.camera.controls.enabled = !event.value
    // });
    // this.scene.add(this.controls);



    this.draggingId = -1;
    this.dragControls = new DragControls(this.world.objects.meshes, this.camera.instance, this.canvas);
    this.dragControls.addEventListener("dragstart", (event) => {
      event.object.material.opacity = 0.33;
      this.draggingId = event.object.id;
      console.log(event)
      this.camera.controls.enabled = false;
    });
    this.dragControls.addEventListener("dragend", (event) => {
      event.object.material.opacity = 1;
      this.draggingId = -1;
      this.camera.controls.enabled = true;
    });
  }

  // set control on an element
  addElements(element) {
    this.controls.attach(element)
  }

  // create control system
  setControls() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'KeyQ': // Q
          this.controls.setSpace(this.controls.space === 'local' ? 'world' : 'local');
          break;

        case 'ShiftLeft': // Shift
          this.controls.setTranslationSnap(100);
          this.controls.setRotationSnap(THREE.MathUtils.degToRad(15));
          this.controls.setScaleSnap(0.25);
          break;

        case 'KeyW': // W
          this.controls.setMode('translate');
          break;

        case 'KeyE': // E
          this.controls.setMode('rotate');
          break;

        case 'KeyR': // R
          this.controls.setMode('scale');
          break;

        case 'Equal':
        case 'NumpadAdd': // +, =, num+
          this.controls.setSize(this.controls.size + 0.1);
          break;

        case 'Minus':
        case 'NumpadSubtract': // -, _, num-
          this.controls.setSize(Math.max(this.controls.size - 0.1, 0.1));
          break;

        case 'KeyX': // X
          this.controls.showX = !this.controls.showX;
          break;

        case 'KeyY': // Y
          this.controls.showY = !this.controls.showY;
          break;

        case 'KeyZ': // Z
          this.controls.showZ = !this.controls.showZ;
          break;

        case 'Space': // Spacebar
          this.controls.enabled = !this.controls.enabled;
          break;

        case 'Escape': // Esc
          this.controls.reset();
          break;
      }
    })

    window.addEventListener('keyup', (event) => {
      switch (event.code) {
        case 'ShiftLeft': // Shift
          this.controls.setTranslationSnap(null);
          this.controls.setRotationSnap(null);
          this.controls.setScaleSnap(null);
          break;
      }
    });
  }
}