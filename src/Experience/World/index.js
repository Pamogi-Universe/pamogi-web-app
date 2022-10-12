import * as THREE from 'three';
import Experience from "..";
import TransformControl from "../controls/transformControls"
import Environment from "./Environment";
import Floor from "./Floor";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import random from "../utils/randomKey";
// import GridHelper from '../helpers/GridHelper';

export default class World {
  constructor() {
    // Setup
    this.__experience = new Experience();
    this.helpers = {
      // gridHelper: new GridHelper(10, 10)
    }
    this.floor = new Floor();
    this.globe = new THREE.Group();
    this.gltfLoader = new GLTFLoader();
    this.objects = { meshes: [], arr: [] };
    this.loaded = false;
    this.render();
  }

  // Events
  // renders the world
  render() {
    this.__experience.resources.on("ready", () => {
      this.loaded = true;
      this.raycaster = this.__experience.raycaster.instance;
      this.outlinePass = this.__experience.composer;
      this.environment = new Environment();
      this.transformControl = new TransformControl();
    })
  }

  // pushes all the 3d objects to array
  pushToObject(key, value) {
    this.objects[key] = value;
    value.userData.key = key
    this.objects.meshes.push(value);
  }

  // deleting a model from the scene
  disposeCurrentModel(obj) {
    let object = obj ?? this.objects.current;

    this.__experience.points.delete(object);

    this.transformControl.detach();
    this.__experience.scene.remove(object)

    let index = null;
    this.objects.meshes.forEach((val, id) => {
      if (val.uuid === object.uuid) {
        index = id;
      }
    });
    delete this.objects[this.objects.meshes[index].userData.key];
    this.objects.meshes.splice(index, 1);
    this.objects.current = null;
  }

  update() { }

  // loading a model into the scene
  loadModal(name, url, position, userData, states, id) {
    this.__experience.history.push();
    if (!this.objects[name]) {
      this.gltfLoader.load(url, (gltf) => {
        // load 3D model

        // const group = new THREE.Group();
        const object = gltf.scene.children[0];
        console.log(object)
        if (object) object.userData.id = id;

        const boundingBox = new THREE.Box3().setFromObject(object)
        const size = boundingBox.getSize(new THREE.Vector3())
        // const center = boundingBox.getCenter(new THREE.Vector3())
        // center.x = size.x / 2
        object.position.y = size.y / 2
        // center.z = size.z / 2

        // const mesh = new THREE.Mesh(
        //   new THREE.BoxGeometry(xSize, ySize, zSize),
        //   new THREE.MeshStandardMaterial({ color: "red", transparent: true, opacity: 0.5 })
        // )

        position && object.position.set(...position);

        // group.add(object)
        // const boundingGroup = new THREE.Box3().setFromObject(group)
        // const sizeGroup = boundingGroup.getSize(new THREE.Vector3())

        // group.position.y = sizeGroup.y / 2
        this.__experience.scene.add(object);

        // console.log({ size, center })

        // create point on the model
        this.addFocusToElement(name, object, { ...userData, states })
      })
    } else {
      // clone a 3D model
      const clone = this.objects[name].clone();
      clone.position.set(0, 0, 0);
      this.__experience.scene.add(clone)

      // create point on the model
      this.addFocusToElement(name, clone, { states })
    }
  }

  addFocusToElement(name, obj, userData) {
    const randomID = `${name}-${random()}`;

    this.__experience.points.push({
      id: randomID,
      position: obj.position,
      title: userData?.title ?? "",
      description: userData?.description ?? "",
      states: userData.states,
      currentState: 0
    })

    if (!this.__experience.viewOnly) this.transformControl.addElements(obj);
    this.outlinePass.setCurrentElement(obj);
    this.pushToObject(randomID, obj);
    this.setCurrentElement(obj)
    this.__experience.points.triggerClick(".point-" + obj.userData.key)
  }

  setCurrentElement(val) {
    this.objects.meshes.forEach(val => val.isCurrent = false);
    val.isCurrent = true;
    this.objects.meshes.filter(val => val.isCurrent)
    this.objects.current = this.objects.meshes.filter(val => val.isCurrent)[0];
  }

  removeCurrentElement() {
    this.objects.current = null
  }
}
