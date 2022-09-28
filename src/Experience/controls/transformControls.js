import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Experience from '..';

export default class TransformControl {
  constructor() {
    // Setup
    this.experience = new Experience();

    this.setInstance();
    this.setControls();
  }

  // Events
  // initialize transform controller
  setInstance() {
    this.controls = new TransformControls(this.experience.camera.instance, this.experience.canvas);
    this.controls.addEventListener('dragging-changed', (event) => {
      if (this.experience.world.objects.current.position.y <= this.experience.world.objects.current.scale.y / 2) {
        this.experience.world.objects.current.position.y = this.experience.world.objects.current.scale.y / 2
      }
      this.experience.camera.controls.enabled = !event.value
    });
    this.experience.scene.add(this.controls);
  }

  // set control on an element
  addElements(element) {
    this.controls.attach(element)
  }

  detach() {
    this.controls.detach();
  }

  toggle(viewOnly) {
    this.controls.enabled = !viewOnly;
  }

  // create control system
  setControls() {
    window.addEventListener('keydown', (event) => {
      switch (this.controls.enabled) {
        case true:
          switch (event.code) {
            case 'KeyQ': // Q
              this.controls.setSpace(this.controls.space === 'local' ? 'world' : 'local');
              break;

            case 'ControlRight': // ControlRight
            case 'ControlLeft': // ControlLeft
              this.controls.setTranslationSnap(0.25);
              this.controls.setRotationSnap(THREE.MathUtils.degToRad(2));
              this.controls.setScaleSnap(0.1);
              break;

            case 'KeyD': // D
              this.experience.world.objects.current && this.experience.world.removeFromObject();
              this.experience.composer.removeCurrentElement();
              this.detach();
              break;

            case 'KeyT': // T
              this.controls.setMode('translate');
              break;

            case 'KeyR': // R
              this.controls.setMode('rotate');
              break;

            case 'KeyF': // F
              this.experience.world.objects.current?.position && this.experience.camera.controls.target.set(...this.experience.world.objects.current.position)
              break;

            case 'KeyS': // S
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
          break;

        case false:
          break;
      }
    })

    window.addEventListener('keyup', (event) => {
      switch (this.controls.enabled) {
        case true:
          switch (event.code) {
            case 'ShiftLeft': // Shift
              this.controls.setTranslationSnap(null);
              this.controls.setRotationSnap(null);
              this.controls.setScaleSnap(null);
              break;
          }
          break;

        case false:
          break;
      }
    });
  }
}
