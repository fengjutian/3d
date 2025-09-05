# 3D模型查看器项目

这是一个基于Three.js的3D模型查看器项目，用于加载和展示GLB格式的3D模型，支持旋转、缩放和平移操作。

## 项目结构

## 技术栈

- **Three.js** - 用于3D渲染的JavaScript库
- **GLTFLoader** - 用于加载GLB/GLTF格式的3D模型
- **OrbitControls** - 提供相机旋转、缩放和平移控制
- **http-server** - 本地开发服务器

## 安装和运行

### 前提条件

- 已安装Node.js和npm（可从[Node.js官网](https://nodejs.org/)下载）
- 浏览器支持WebGL（推荐使用Chrome、Firefox或Edge最新版）

### 安装步骤

1. **克隆或下载项目文件**
   将项目文件保存到本地目录。

2. **安装http-server**
   打开命令提示符（Windows）或终端（macOS/Linux），运行以下命令：
   ```bash
   npm install -g http-server
   ```

3. **启动本地服务器**
   导航到项目目录并启动服务器：
   ```bash
   cd c:\Users\26401\Desktop\3d
   http-server .
   ```

4. **访问应用**
   服务器启动后，在浏览器中打开以下URL：
   ```
   http://localhost:8080/super-minimal.html
   ```

## 功能说明

### 主要功能

- 加载和显示GLB格式的3D模型
- 支持通过鼠标控制模型的查看角度：
  - 拖动鼠标：旋转模型
  - 滚轮：缩放模型
  - Shift+拖动：平移视图
- 按F键自动聚焦到模型中心
- 实时显示加载进度和状态信息
- 自适应窗口大小

### 使用方法

1. **启动应用**：按照安装步骤启动服务器并访问页面
2. **查看模型**：页面加载后会自动加载并显示`./models/model.glb`文件
3. **交互控制**：使用鼠标进行旋转、缩放和平移操作
4. **模型聚焦**：按F键自动将相机定位到模型中心

## 文件说明

### 主要HTML文件

- **super-minimal.html**：推荐使用的简化版查看器，修复了CDN加载问题，提供完整的错误处理
- **index.html**：原始项目入口文件
- **standalone.html**：独立版查看器，包含更多功能

### 源代码文件（src目录）

- **main.js**：主程序入口，协调各个模块的工作
- **scene.js**：场景初始化，包括相机、光源、渲染器的设置
- **controls.js**：相机控制器配置
- **loader.js**：模型加载功能
- **animate.js**：动画循环实现

## 自定义和扩展

### 更换模型

要显示不同的模型，只需将新的GLB模型文件重命名为`model.glb`并替换`./models/`目录下的原文件，或者修改HTML文件中的模型路径：

```javascript
// 在super-minimal.html中找到以下代码行并修改路径
loader.load(
    './models/model.glb', // 这里可以修改为您的模型文件路径
    // ...其他代码
);
```

### 调整场景设置

您可以修改`super-minimal.html`文件中的以下设置来自定义场景：

- **背景颜色**：
  ```javascript
  scene.background = new THREE.Color(0xeeeeee); // 修改为您喜欢的颜色
  ```

- **光照强度**：
  ```javascript
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 调整第二个参数
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 调整第二个参数
  ```

- **相机初始位置**：
  ```javascript
  camera.position.set(0, 2, 5); // 修改x、y、z坐标
  ```

## 注意事项

1. **跨域问题**
   必须使用本地服务器（如http-server）运行项目，直接双击HTML文件在浏览器中打开会导致跨域错误，无法加载模型文件。

2. **模型格式**
   当前版本只支持GLB/GLTF格式的3D模型。

3. **性能考虑**
   较大的3D模型可能会导致加载时间较长或性能下降，建议使用优化过的模型。

4. **浏览器兼容性**
   确保您的浏览器支持WebGL技术，推荐使用最新版本的Chrome、Firefox或Edge浏览器。

## 常见问题解决

### 1. 模型无法加载

- 检查模型文件路径是否正确
- 确认模型文件格式是否为GLB/GLTF
- 查看浏览器控制台（按F12）是否有错误信息
- 确保服务器已正确启动

### 2. 页面空白或显示错误

- 清除浏览器缓存后重试
- 检查网络连接是否正常
- 查看浏览器控制台的错误信息

### 3. 交互控制不工作

- 确保鼠标没有离开画布区域
- 检查浏览器是否阻止了某些交互功能
- 尝试在不同的浏览器中运行

## 许可证

本项目采用MIT许可证 - 详情请查看LICENSE文件（如未提供，则默认保留所有权利）。

## 致谢

- 感谢Three.js团队提供优秀的3D渲染库
- 感谢所有为开源贡献的开发者