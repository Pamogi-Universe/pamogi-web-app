import * as THREE from 'three';
import Experience from "..";
import TransformControl from "../controls/transformControls"
import Environment from "./Environment";
import Floor from "./Floor";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import random from "../utils/randomKey";
import Text from './Text';
import AnimationComponent from "./AnimationComponent";
import GridHelper from '../helpers/GridHelper';
import { Clock } from 'three';
import Time from '../utils/Time';

export default class World {
  constructor() {
    // Setup
    this.__experience = new Experience();
    this.helpers = {
      gridHelper: new GridHelper(200, 200 * 4)
    }
    this.floor = new Floor();
    this.globe = new THREE.Group();
    this.gltfLoader = new GLTFLoader();
    this.objects = { meshes: [], arr: [] };
    this.animationComponents = new Map();
    this.loaded = false;
    this.render();
  }

  // Events
  // renders the world
  render() {
    this.__experience.resources.on("ready", () => {
      this.loaded = true;
      this.ObjectNr = 0;
      this.raycaster = this.__experience.raycaster.instance;
      this.outlinePass = this.__experience.composer;
      this.environment = new Environment();
      this.transformControl = new TransformControl();
      this.text = new Text();
      this.text.initiate();
    })
  }

  // pushes all the 3d objects to array
  pushToObject(key, value) {
    this.objects[key] = value;
    value.userData.key = key;

    switch (value.userData.name) {
      case "cloud":
      case "lighting":
      case "sunray":
        value.userData.isFloating = true;
        break;
      default:
        value.userData.isFloating = false;
    }

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

  update()
  {
    this.animationComponents.forEach(element => {
      element.update();
    });
  }

  // loading a model into the scene
  loadModal(name, url, position, userData, states, tag, id) {
    this.__experience.history.push();
    if (!this.objects[name]) {
      this.gltfLoader.load(url, (gltf) => {
        // load 3D model
        const object = gltf.scene.children[0];
        object.userData.name = object.userData.name.toLowerCase();
        object.userData.tag = tag;
        if(gltf.animations.length > 0) this.animationComponents.set(this.ObjectNr,new AnimationComponent(gltf));
        if (object) object.userData.id = id;

        if (this.__experience.raycaster.currentIntersect?.object.name === "Continent") {
          const center = this.__experience.raycaster.currentIntersect.point;
          object.position.set(center.x, object.position.y, center.z)
        }

        if (object.userData.name === "waterfall") {
          const clone = this.text.clone("Changed default text as a test", object);
          clone.position.set(1, -0.8, 2);
        } else if (object.userData.name === "river2") {
          const clone = this.text.clone("Write something", object);
          clone.position.set(0, 0.02, 0);
          clone.rotation.set(clone.rotation.x, Math.PI / 2, 0)
        }

        if (position) {
          object.position.set(position.x, object.position.y, position.z)
        }    

        this.__experience.scene.add(object);
        ++this.ObjectNr;

        // create point on the model
        this.addFocusToElement(name, object, { ...userData, states })
      })
    } else {
      // clone a 3D model
      console.log("Cloning model");
      const clone = this.objects[name].clone();
      clone.position.set(0, 0, 0);
      this.__experience.scene.add(clone)

      // create point on the model
      this.addFocusToElement(name, clone, { states })
    }
  }

  addFocusToElement(name, obj, userData) {
    const randomID = `${name.toLowerCase()}-${random()}`;

    this.__experience.points.push({
      id: randomID,
      position: obj.position,
      title: userData?.title ?? "",
      description: userData?.description ?? "",
      states: userData.states,
      currentState: 0
    })

    this.pushToObject(randomID, obj);
    this.setCurrentElement(obj);
    if (!this.__experience.viewOnly) this.transformControl.addElements(obj);
    this.outlinePass.setCurrentElement(obj);
    this.__experience.points.triggerClick(".point-" + obj.userData.key)
  }

  setCurrentElement(val) {
    this.objects.meshes.forEach(val => val.isCurrent = false);
    if(val != null) val.isCurrent = true;
    this.objects.meshes.filter(val => val.isCurrent)
    this.objects.current = this.objects.meshes.filter(val => val.isCurrent)[0];
  }

  removeCurrentElement() {
    this.objects.current = null
  }
}
