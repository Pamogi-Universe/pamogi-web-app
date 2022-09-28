import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import Experience from '..';

export default class Composer {
	constructor() {
		this.experience = new Experience();
		this.instance = new EffectComposer(this.experience.renderer.instance);

		this.addRenderPass()
		this.addOuutlinePass()
	}

	addRenderPass() {
		this.renderPass = new RenderPass(this.experience.scene, this.experience.camera.instance);
		this.instance.addPass(this.renderPass);
	}

	addOuutlinePass() {
		this.outlinePass = new OutlinePass(new THREE.Vector2(this.experience.sizes.width, this.experience.sizes.height), this.experience.scene, this.experience.camera.instance);
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
