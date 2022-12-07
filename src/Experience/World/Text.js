import * as THREE from 'three';
import Experience from '..';

export default class Text {
  constructor(textColour) {
    this.__experience = new Experience();
    this.arr = [];
    if(textColour) this.colour = textColour;
    else this.colour = "white";
  }

  canvas(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const family = "400 30px Comic Sans MS";
    ctx.font = family;
    canvas.width = ctx.measureText(text).width + 20;
    canvas.height = 40;

    ctx.fillStyle = '#ff000000';
    ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);

    canvas.style.width = canvas.width + 'px';
    ctx.font = family;
    ctx.fillStyle = this.colour;
    ctx.fillText(text, 10, 30);

    return { canvas, ctx }
  }

  texture(text) {
    const instance = this.canvas(text)

    const texture = new THREE.CanvasTexture(instance.canvas)
    instance.ctx.text = text
    texture.canvas = instance.canvas;
    texture.ctx = instance.ctx;

    this.arr.push(texture)
    return { texture, canvas: instance.canvas };
  }

  initiate() {
    const map = this.texture("Write something")
    this.geometry = new THREE.PlaneGeometry(map.canvas.width / 150, 0.4, 1, 1);
    this.mesh = new THREE.Mesh(
      this.geometry,
      new THREE.MeshBasicMaterial({
        map: map.texture,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    this.mesh.rotation.order = "YXZ"
    this.mesh.rotation.y = - Math.PI * 1.8;
    this.mesh.rotation.x = - Math.PI / 2;
  }

  clone(name, object,meshWidth) {
    const map = this.texture(name);
    const clone = this.mesh.clone();
    clone.material = new THREE.MeshBasicMaterial({
      map: map.texture,
      side: THREE.DoubleSide,
      transparent: true
    });
    clone.geometry = new THREE.PlaneGeometry(meshWidth, 0.4, 1, 1)
    object.add(clone);
    object.text = clone;

    return clone;
  }

  update(target, text) {
    const map = this.__experience.world.text.texture(text);
    target.text.material.map = map.texture;
    const currentWidth = target.text.geometry.parameters.width;
    target.text.geometry = new THREE.PlaneGeometry(currentWidth, 0.4, 1, 1)
  }
}

export  class BillboardText extends Text {
  initiate() {
    const map = this.texture("Write something")
    this.geometry = new THREE.PlaneGeometry(map.canvas.width / 150, 0.4, 1, 1);


    this.mesh = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: map.texture,
        transparent: true
      })
    );
    this.mesh.rotation.order = "YXZ"
    this.mesh.rotation.y = - Math.PI * 1.8;
    this.mesh.rotation.x = - Math.PI / 2;
  }

  clone(name, object,meshWidth) {
    const map = this.texture(name);
    const clone = this.mesh.clone();
    clone.material = new THREE.SpriteMaterial({
      map: map.texture,
      transparent: true
    });
    clone.geometry = new THREE.PlaneGeometry(meshWidth, 0.4, 1, 1)
    object.add(clone);
    object.text = clone;

    return clone;
  }
} 
