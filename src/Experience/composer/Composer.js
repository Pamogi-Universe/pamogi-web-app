import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import Experience from '..';

export default class Composer {
	constructor() {
		const experience = new Experience();
		this.renderer = experience.renderer.instance;
		this.scene = experience.scene;
		this.camera = experience.camera.instance;
		this.sizes = experience.sizes;

		this.instance = new EffectComposer(this.renderer);

		this.addRenderPass()
		this.addOuutlinePass()
	}

	addRenderPass() {
		this.renderPass = new RenderPass(this.scene, this.camera);
		this.instance.addPass(this.renderPass);
	}

	addOuutlinePass() {
		this.outlinePass = new OutlinePass(new THREE.Vector2(this.sizes.width, this.sizes.height), this.scene, this.camera);
		this.outlinePass.edgeStrength = 2;
		this.outlinePass.edgeGlow = 0;
		this.outlinePass.edgeThickness = 0.5;
		this.instance.addPass(this.outlinePass);
	}

	setCurrentElement(element) {
		this.outlinePass.selectedObjects = [element];
	}
}
