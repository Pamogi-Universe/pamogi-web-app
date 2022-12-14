import * as THREE from 'three';
import gsap from "gsap";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Experience from '..';

export default class TransformControl {
  constructor() {
    // Setup
    this.__experience = new Experience();

    this.setInstance();
    this.setControls();
  }

  // Events
  // initialize transform controller
  setInstance() {
    this.controls = new TransformControls(this.__experience.camera.instance, this.__experience.canvas);
    this.controls.addEventListener('dragging-changed', (event) => {
      // if (this.__experience.world.objects.current.position.y <= this.__experience.world.objects.current.scale.y / 2) {
      //   this.__experience.world.objects.current.position.y = this.__experience.world.objects.current.scale.y / 2
      // }
      this.__experience.camera.controls.enabled = !event.value
    });
    this.__experience.scene.add(this.controls);
  }

  toggleYAxis() {
    if (this.__experience.world.objects.current.userData.isFloating) {
      this.controls.showY = true;
    } else {
      if (this.controls.mode === "translate") this.controls.showY = false;
      else this.controls.showY = true;
    }
  }

  // set control on an element
  addElements(element) {
    this.controls.attach(element);

    this.toggleYAxis();
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
              this.__experience.world.objects.current && this.__experience.world.disposeCurrentModel();
              this.__experience.composer.removeCurrentElement();
              this.detach();
              break;

            case 'KeyT': // T
              this.controls.setMode('translate');
              this.toggleYAxis();
              break;

            case 'KeyR': // R
              this.controls.setMode('rotate');
              this.toggleYAxis();
              break;

            case 'KeyF': // F
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
              break;

            case 'KeyS': // S
              this.controls.setMode('scale');
              this.toggleYAxis();
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
              if (!event.ctrlKey)
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
            case 'ControlRight': // ControlRight
            case 'ControlLeft': // ControlLeft
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
