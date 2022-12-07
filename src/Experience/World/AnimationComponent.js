import * as THREE from 'three';
import Experience from '..';

export default class AnimationComponent
{
    constructor(mesh)
    {
        this.__experience = new Experience();
        this.mixer = new THREE.AnimationMixer(mesh.scene);
        this.animationClips = mesh.animations;
        this.PlayDefaultAnim();
    }

    update()
    {
        var delta = this.__experience.time.delta;
        this.mixer.update(delta/100)
    }

    animate()
    {
        if(this)
        {
            requestAnimationFrame(this.animate);
            var delta = this.__experience.time.delta;
            if(this.mixer) this.mixer.update(delta/100);
        }
    }

    PlaySpecificClip(clipName)
    {
        const clip = THREE.AnimationClip.findByName(this.animationClips,clipName);
        if(clip)
        {
            console.log("Play Animation");
            const action = this.mixer.clipAction(clip);
            action.play();
        }
    }

    PlayDefaultAnim()
    {
        console.log("Play Animation");
        const action = this.mixer.clipAction(this.animationClips[0]);
        action.timeScale = 0.1;
        action.play();
    }
}