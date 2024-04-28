<template>
  <div class="practice">
    <div class="canvas-container" ref="canvasDom"></div>
    <div class="home-content-title">
      <h1>汽车展示与选配</h1>
    </div>
    <div class="home-content">
      <h2>车身部位</h2>
      <div class="select">
        <el-select v-model="carValue" clearable placeholder="请选择">
          <el-option v-for="item in carParts" :key="item.name" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <h2>选择车身颜色</h2>
      <div class="select">
        <div class="select-item" v-for="(item, index) in colors" :key="index" @click="slectColor(index)">
          <div class="select-item-color" :style="{ backgroundColor: item }"></div>
        </div>
      </div>
      <h2>选择贴膜材质</h2>
      <div class="select">
        <el-button plain v-for="(item, index) in materials" :type="item.type" :key="index"
          @click="slectMaterial(index)">{{
            item.name }}</el-button>
      </div>
    </div>
    <Loading :value="progress" :loading="loading"></Loading>
  </div>
</template>
<script setup>
import * as THREE from 'three';
import { ref, reactive, onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const canvasDom = ref(null)
const carValue = ref('')
const progress = ref(0)
const loading = ref(true)


const scene = new THREE.Scene()// 创建场景
let camera;
let controls; // 添加控制器
let renderer;

let colors = ['red', 'blue', 'green', 'gray', 'orange', 'purple']
let materials = [{ name: '磨砂', value: 1, type: 'info' }, { name: '冰晶', value: 0, type: 'primary' }]

const carParts = [
  {
    id: '轮毂',
    name: '车胎',
    list: [],
    material: new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      metalness: 1,
      roughness: 0.1,
    }),
  },
  {
    id: 'Mesh002',
    name: '车身',
    scene: null,
    material: new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      metalness: 1,
      roughness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0
    }),
  },
  {
    id: '前脸',
    name: '前脸',
    scene: null,
    material: new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      metalness: 1,
      roughness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0
    }),
  },
  {
    id: '挡风玻璃',
    name: '挡风玻璃',
    scene: null,
    material: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 1,
      transparent: true,
    }),
  },
  {
    id: '引擎盖_1',
    name: '引擎盖',
    scene: null,
    material: new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      metalness: 1,
      roughness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0
    }),
  },
]


function slectColor(index) {
  if (!carValue.value) {
    ElNotification({
      title: '操作不当',
      message: '请选择车身部位',
      type: 'warning',
    })
  } else {

    for (let i = 0; i < carParts.length; i++) {
      if (carParts[i].id === carValue.value) {
        if (carParts[i].id === '轮毂') {
          for (let j = 0; j < carParts[i].list.length; j++) {
            carParts[i].list[j].material.color.set(colors[index])
          }
        } else {
          carParts[i].material.color.set(colors[index])
        }
      }
    }
  }
}


function slectMaterial(index) {
  bodyMaterial.clearcoatRoughness = materials[index].value;
  frontMaterial.clearcoatRoughness = materials[index].value;
  hoodMaterial.clearcoatRoughness = materials[index].value;
}

// 创建相机
const initCamera = () => {
  console.log(canvasDom?.value?.offsetWidth)
  camera = new THREE.PerspectiveCamera(75, canvasDom?.value?.offsetWidth / canvasDom?.value?.offsetHeight, 0.1, 1000)
  camera.position.set(0, 2, 6)
  scene.background = new THREE.Color('#ccc');
  scene.environment = new THREE.Color('#ccc')
}

// 创建渲染器、初始化渲染器，
const initRenderer = () => {
  renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
  })
  renderer.setSize(canvasDom?.value?.offsetWidth - 20, canvasDom?.value?.offsetHeight)
  // 将渲染器加入dom
  canvasDom.value.appendChild(renderer.domElement)
  renderer.setClearColor('#000');
}



// 动画帧
const render = () => {
  renderer.render(scene, camera)
  controls && controls.update()
  requestAnimationFrame(render)
}

// 添加网格地面
const addGrid = () => {
  const gridHelper = new THREE.GridHelper(10, 10);
  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  scene.add(gridHelper)
}

// 初始化控制器
const initControls = ()=>{
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()
}

  // 添加汽车模型
const initModel = () => {
  const manager = new THREE.LoadingManager()
  manager.onProgress = function (item,loaded,total){
    progress.value= Math.floor((loaded / total) * 100);

    if(progress.value === 100){
      loading.value =false
    }
  }




  const loader = new GLTFLoader(manager);
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/gltf/');
  dracoLoader.setDecoderConfig({ type: "js" });
  loader.setDRACOLoader(dracoLoader)

  loader.load('./models/bmw01.glb', (gltf) => {
    const bmw = gltf.scene;
    bmw.traverse((child) => {
      if (!child.isMesh) return
      for (let i = 0; i < carParts.length; i++) {
        if (child.name.includes(carParts[i].id)) {
          // 判断是否轮毂
          if (child.name.includes('轮毂')) {
            child.material = carParts[i].material
            carParts[i].list.push(child)
          } else {
            carParts[i].scene = child
            carParts[i].scene.material = carParts[i].material
          }
        }
      }
    })
    scene.add(bmw)
  })

}

onMounted(() => {
  initCamera()
  initRenderer()
  render()
  addGrid()
  initControls()
  initModel()



  // 添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff, 1)
  light1.position.set(0, 0, 10)
  scene.add(light1)

  const light2 = new THREE.DirectionalLight(0xffffff, 1)
  light2.position.set(0, 0, -10)
  scene.add(light2)

  const light3 = new THREE.DirectionalLight(0xffffff, 1)
  light3.position.set(10, 0, 0)
  scene.add(light3)

  const light4 = new THREE.DirectionalLight(0xffffff, 1)
  light4.position.set(-10, 0, 0)
  scene.add(light4)

  const light5 = new THREE.DirectionalLight(0xffffff, 1)
  light5.position.set(0, 10, 0)
  scene.add(light5)

  const light6 = new THREE.DirectionalLight(0xffffff, 0.3)
  light6.position.set(5, 10, 0)
  scene.add(light6)

  const light7 = new THREE.DirectionalLight(0xffffff, 0.3)
  light7.position.set(0, 10, 5)
  scene.add(light7)

  const light8 = new THREE.DirectionalLight(0xffffff, 0.3)
  light8.position.set(0, 10, -5)
  scene.add(light8)

  const light9 = new THREE.DirectionalLight(0xffffff, 0.3)
  light9.position.set(-5, 10, 0)
  scene.add(light9)
})



</script>
<style lang="scss">
.practice {
  position: relative;
  height: 100%;

  .home-content-title {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 26px;
  }

  .canvas-container {
    height: 100%;
  }
}


.home-content {
  position: absolute;
  right: 20px;
  top: 20px;

  h2,
  .select {
    margin-bottom: 16px;
  }

  .select-item {
    display: inline-block;
    margin: 0 5px;
  }

  .select-item-color {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: inline-block;
    cursor: pointer;
    border: solid 1px red;
  }

  .select-item-text {
    height: 30px;
    line-height: 30px;
    margin: 10px;
    padding: 0 10px;
    border: solid 1px yellow;
    border-radius: 10px;
  }
}
</style>
