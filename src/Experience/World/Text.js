import * as THREE from 'three';
import Experience from '..';

export default class Text {
  constructor() {
    this.__experience = new Experience();
  }

  texture(text) {
    const family = "400 30px Comic Sans MS";
    this.ctx.font = family;
    this.canvas.width = this.ctx.measureText(text).width + 20;
    this.canvas.height = 40;

    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(-1, -1, this.canvas.width + 2, this.canvas.height + 2);

    this.ctx.fillText(text, 0, this.canvas.height - 1);
    this.canvas.style.width = this.canvas.width + 'px';
    this.ctx.font = family;
    this.ctx.fillStyle = "white";
    this.ctx.fillText(text, 10, 30);
    return new THREE.CanvasTexture(this.canvas);
  }

  initiate() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.geometry = new THREE.PlaneGeometry(this.canvas.width / 150, 0.4, 10, 10);

    this.mesh = new THREE.Mesh(
      this.geometry,
      new THREE.MeshBasicMaterial({
        map: this.texture("Write something"),
        side: THREE.DoubleSide
      })
    );
    this.mesh.rotation.order = "YXZ"
    this.mesh.rotation.y = - Math.PI * 1.8;
    this.mesh.rotation.x = - Math.PI / 2;
    // this.__experience.scene.add(this.mesh);
  }

  clone(name, object) {
    const clone = this.mesh.clone();
    clone.material.map = this.texture(name);
    clone.position.set(1, -0.8, 2);
    object.add(clone);
    object.text = clone;
  }
}
