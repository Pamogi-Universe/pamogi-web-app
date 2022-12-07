import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Experience from '..';
import random from "../utils/randomKey";

export default class Objects {
  constructor() {
    this.__experience = new Experience();
    this.gltfLoader = new GLTFLoader();
    this.group = new THREE.Group();
    this.instance = { meshes: [], arr: [] };
  }

  pushToObject(key, value) {
    this.instance[key] = value;
    value.userData.key = key
    this.instance.meshes.push(value);
  }

  disposeCurrentModel() {
    this.__experience.points.delete(this.instance.current);

    this.__experience.world.transformControl.detach();
    this.__experience.scene.remove(this.instance.current)

    let index = null;
    this.instance.meshes.forEach((val, id) => {
      if (val.uuid === this.instance.current.uuid) {
        index = id;
      }
    });
    delete this.instance[this.instance.meshes[index].userData.key];
    this.instance.meshes.splice(index, 1);
    this.instance.current = null;
  }

  // loading a model into the scene
  loadModal(name, url) {
    this.__experience.history.push();
    if (!this.instance[name]) {
      this.gltfLoader.load(url, (gltf) => {
        // load 3D model
        const object = gltf.scene.children[0];

        const boundingBox = new THREE.Box3().setFromObject(object)
        const ySize = boundingBox.max.y - boundingBox.min.y
        object.position.y = ySize / 2;

        this.group.add(object);

        // create point on the model
        this.addFocusToElement(name, object)
      })
    } else {
      // clone a 3D model
      const clone = this.instance[name].clone();
      clone.position.set(0, 0, 0);
      this.group.add(clone)

      // create point on the model
      this.addFocusToElement(name, clone)
    }
  }

  addFocusToElement(name, obj) {
    const randomID = `${name}-${random()}`;

    this.__experience.points.push({
      id: randomID,
      position: obj.position,
      title: "",
      description: ""
    })

    this.__experience.world.transformControl.addElements(obj);
    this.__experience.composer.outlinePass.setCurrentElement(obj);
    this.pushToObject(randomID, obj);
    this.setCurrentElement(obj)
  }

  setCurrentElement(val) {
    this.instance.meshes.forEach(val => val.isCurrent = false);
    val.isCurrent = true;
    this.instance.meshes.filter(val => val.isCurrent)
    this.instance.current = this.instance.meshes.filter(val => val.isCurrent)[0];
  }

  removeCurrentElement() {
    this.instance.current = null
  }
}
