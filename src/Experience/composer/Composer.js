import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import Experience from '..';

export default class Composer {
	constructor() {
		this.__experience = new Experience();

		this.setInstance(this.__experience.renderer.instance)
		this.addRenderPass()
		this.addOuutlinePass()
	}

	setInstance(renderer) {
		this.instance = new EffectComposer(renderer);
	}

	update() {
		this.instance.render()
	}

	addRenderPass() {
		this.renderPass = new RenderPass(this.__experience.scene, this.__experience.camera.instance);
		this.instance.addPass(this.renderPass);
	}

	addOuutlinePass() {
		this.outlinePass = new OutlinePass(new THREE.Vector2(this.__experience.sizes.width, this.__experience.sizes.height), this.__experience.scene, this.__experience.camera.instance);
		this.outlinePass.edgeStrength = 2;
		this.outlinePass.edgeGlow = 0;
		this.outlinePass.edgeThickness = 0.5;
		this.instance.addPass(this.outlinePass);
	}

	setCurrentElement(element) {
		this.outlinePass.selectedObjects = [element];
	}

	removeCurrentElement() {
		this.outlinePass.selectedObjects = [];
	}
}
