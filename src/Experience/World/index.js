import * as THREE from 'three';
import Experience from "..";
import TransformControl from "../controls/transformControls"
import Environment from "./Environment";
import Floor from "./Floor";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import random from "../utils/randomKey";
// import GridHelper from '../helpers/GridHelper';

export default class World {
  constructor() {
    // Setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.resources = this.experience.resources;
    this.points = this.experience.points;
    this.helpers = {
      // gridHelper: new GridHelper(10, 10)
    }
    this.floor = new Floor();
    this.gltfLoader = new GLTFLoader();
    this.fbxLoader = new FBXLoader();
    this.objects = { meshes: [], arr: [] };
    this.loaded = false;
    this.render();
  }

  // Events
  // renders the world
  render() {
    this.resources.on("ready", () => {
      this.loaded = true;
      this.raycaster = this.experience.raycaster.instance;
      this.outlinePass = this.experience.composer;
      this.environment = new Environment();
      this.transformControl = new TransformControl();
    })
  }

  // pushes all the 3d objects to array
  pushToObject(key, value) {
    this.objects[key] = value;
    value.dataKey = key;
    this.objects.meshes.push(value);
  }

  // deleting a model from the scene
  removeFromObject() {
    this.points.delete(this.objects.current);

    this.transformControl.detach();
    this.scene.remove(this.objects.current)

    let index = null;
    this.objects.meshes.forEach((val, id) => {
      if (val.uuid === this.objects.current.uuid) {
        index = id;
      }
    });
    delete this.objects[this.objects.meshes[index].dataKey];
    this.objects.meshes.splice(index, 1);
    this.objects.current = null;
  }

  update() { }

  // loading a model into the scene
  loadModal(name, url) {
    if (!this.objects[name]) {
      this.gltfLoader.load(url, (gltf) => {
        // load 3D model
        const object = gltf.scene.children[0];

        const boundingBox = new THREE.Box3().setFromObject(object)
        const ySize = boundingBox.max.y - boundingBox.min.y
        object.position.y = ySize / 2;
        const randomID = `${name}-${random()}`;

        // put on scene
        // var dist = object.position.clone().sub(this.camera.position).length();
        // this.raycaster.ray.at(dist, object.position);
        // console.log(object.position)

        this.scene.add(object);

        // create point on the model
        this.points.push({
          id: randomID,
          position: object.position,
          title: "Enter your data",
          description: ""
        })

        this.transformControl.addElements(object);
        this.outlinePass.setCurrentElement(object);
        this.pushToObject(randomID, object);
        this.setCurrentElement(object);
      })
    } else {
      // clone a 3D model
      const randomID = `${name}-${random()}`;
      const clone = this.objects[name].clone();
      clone.position.set(0, 0, 0);
      this.scene.add(clone)

      // create point on the model
      this.points.push({
        id: randomID,
        position: object.position,
        title: "Enter your data",
        description: ""
      })

      this.transformControl.addElements(clone);
      this.outlinePass.setCurrentElement(clone);
      this.pushToObject(randomID, clone);
      this.setCurrentElement(clone)
    }
  }

  setCurrentElement(val) {
    this.objects.meshes.forEach(val => val.isCurrent = false);
    val.isCurrent = true;
    this.objects.meshes.filter(val => val.isCurrent)
    this.objects.current = this.objects.meshes.filter(val => val.isCurrent)[0];
  }
}
