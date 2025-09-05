import { scene, camera, renderer } from './scene.js';
import { controls } from './controls.js';
import { loadModel } from './loader.js';
import { startAnimation } from './animate.js';

// 加载模型
loadModel('./models/model.glb', scene);

// 添加模型加载后的调试代码
document.addEventListener('keydown', (event) => {
  if (event.key === 'f') {
    // 按F键聚焦到模型
    const model = scene.children.find(child => child.type === 'Group' || child.name);
    if (model) {
      console.log('找到模型:', model);
      // 计算模型边界球
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 2; // 增加一些距离
      
      camera.position.set(center.x, center.y + 1, center.z + cameraZ);
      controls.target.set(center.x, center.y, center.z);
      controls.update();
    }
  }
});

// 开始动画循环
startAnimation(renderer, scene, camera, controls);

// 窗口自适应
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});