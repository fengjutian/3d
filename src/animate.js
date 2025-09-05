import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function startAnimation(renderer, scene, camera, controls){
    const clock = new THREE.Clock();
    function animate(){
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if(scene.userData.mixer) scene.userData.mixer.update(delta);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}
