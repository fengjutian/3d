import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

const container = document.getElementById('viewport');
const w = container.clientWidth;
const h = container.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#1a1a1a');

const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 200);
camera.position.set(0, 0, 6); // ✔ 拉近视距，增强冲击
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.localClippingEnabled = true; // ✅ 开启局部裁剪
container.appendChild(renderer.domElement);

// ✅ 定义“屏幕平面”(z=0 假设画面内)
const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);

// 光
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(3, 3, 8);
scene.add(light);

// ✅ 被裁剪对象
const boxGeo = new THREE.BoxGeometry(2, 2, 2);
const boxMatInside = new THREE.MeshStandardMaterial({
  color: 0x50b6ff,
  clippingPlanes: [clipPlane], // 只显示“屏幕内”部分
  clipShadows: true
});
const boxMatOutside = new THREE.MeshStandardMaterial({
  color: 0xff8855,
  side: THREE.DoubleSide, // ✔ 可见前后表面
});

// 创建两个 Mesh：
// ① insideMesh → 被 clipping 截断
// ② outsideMesh → 不被 clipping，模拟“穿出”部分
const insideMesh = new THREE.Mesh(boxGeo, boxMatInside);
const outsideMesh = new THREE.Mesh(boxGeo, boxMatOutside);
scene.add(insideMesh);
scene.add(outsideMesh);

let dir = 1;

function animate() {
  requestAnimationFrame(animate);

  // 自转
  insideMesh.rotation.x += 0.01;
  insideMesh.rotation.y += 0.015;
  outsideMesh.rotation.copy(insideMesh.rotation);

  // 同步位置并做Z轴冲出
  insideMesh.position.z += 0.05 * dir;
  outsideMesh.position.z = insideMesh.position.z;
  if (insideMesh.position.z > 5) dir = -1;
  if (insideMesh.position.z < -4) dir = 1;

  renderer.render(scene, camera);

  // ✅ 创建“屏幕玻璃框”可视化
    const frameGeo = new THREE.BoxGeometry(6, 3.5, 0.2);
    const frameMat = new THREE.MeshPhysicalMaterial({
    color: 0xaaaaaa,
    transparent: true,
    opacity: 0.15,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
    metalness: 0.2,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.set(0, 0, 0);
    scene.add(frameMesh);

}

animate();
