import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// 添加全局变量用于调试
window.threeScene = null;
window.threeCamera = null;

export function loadModel(path, scene){
    console.log('开始加载模型:', path);
    const loader = new GLTFLoader();
    loader.load(
        path,
        gltf => {
            console.log('模型加载成功:', gltf);
            const model = gltf.scene;
            model.traverse(node => {
                if(node.isMesh){
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            scene.add(model);
            
            // 设置模型名称便于调试
            model.name = 'LoadedModel';
            
            // 记录到全局变量便于调试
            window.loadedModel = model;
            
            if(gltf.animations && gltf.animations.length > 0){
                const mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach(clip => mixer.clipAction(clip).play());
                scene.userData.mixer = mixer;
            }
        },
        (xhr) => {
            // 添加加载进度反馈
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            console.log(`模型加载进度: ${percent}%`);
        },
        error => {
            console.error('加载模型出错:', error);
            // 在页面上显示错误信息
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'position: fixed; top: 20px; left: 20px; background: red; color: white; padding: 10px; z-index: 1000;';
            errorDiv.textContent = '模型加载失败，请查看控制台获取详细信息';
            document.body.appendChild(errorDiv);
        }
    );
}

// 更新scene.js添加调试变量导出