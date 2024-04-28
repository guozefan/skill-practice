import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass"
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass"
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass"
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader"


import scene from './scene';
import cameraApi from './camera.js';
import controlsApi from './control';
import rendererApi from './renderer';
import {updateDrops} from './model'

import { model } from '@/store/model.ts';
import { storeToRefs } from 'pinia';


 let composer=null
let outlinePass=null
let renderPass=null


const { dom_wh,dom_ht } = storeToRefs(model());
const clock = new THREE.Clock();


// 创建性能监视器
let stats = new Stats()

stats.setMode(0)

// 设置监视器位置
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '150px'
stats.domElement.style.top = '80px'

// 将监视器添加到页面中
document.body.appendChild(stats.domElement)


export function ainmate (){
   // 更新帧数
   stats.update()
  rendererApi.renderer.render(scene, cameraApi.camera);

  // rendererApi.labelRenderer.render(scene, cameraApi.camera);

  controlsApi.controls.update();
  // updateDrops()
  if(composer){
    composer.render()
  }
  requestAnimationFrame(ainmate);
}



// 模型的点击事件
export function modelMouseClick( event ) {
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, cameraApi.camera);

  const intersects = raycaster.intersectObjects(scene.children);
  // 根据它来判断点击的什么，length为0即没有点击到模型
  // console.log(intersects.length ? intersects[0].object.name : intersects, 'intersects----->>>')
  // if(intersects.length){
  //   console.log(intersects[0].object)
  //   outlineObj([intersects[0].object])
  // }
}

//高亮显示模型（呼吸灯）
function outlineObj (selectedObjects) {
  // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
  composer = new EffectComposer(rendererApi.renderer)
  // 新建一个场景通道  为了覆盖到原理来的场景上
  renderPass = new RenderPass(scene,cameraApi.camera)
  composer.addPass(renderPass);
  // 物体边缘发光通道
  outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene,cameraApi.camera, selectedObjects)
  outlinePass.selectedObjects = selectedObjects
  outlinePass.edgeStrength = 10.0 // 边框的亮度
  outlinePass.edgeGlow = 1// 光晕[0,1]
  outlinePass.usePatternTexture = false // 是否使用父级的材质
  outlinePass.edgeThickness = 1.0 // 边框宽度
  outlinePass.downSampleRatio = 1 // 边框弯曲度
  outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
  outlinePass.visibleEdgeColor.set(parseInt(0x00ff00)) // 呼吸显示的颜色
  outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
  outlinePass.clear = true
  composer.addPass(outlinePass)
  // 自定义的着色器通道 作为参数
  let effectFXAA = new ShaderPass(FXAAShader)
  effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
  effectFXAA.renderToScreen = true
  composer.addPass(effectFXAA)
}





window.addEventListener('resize', ()=>{
  cameraApi.camera.aspect = dom_wh.value / dom_ht.value;
  cameraApi.camera.updateProjectionMatrix(); //更新投影矩阵
  rendererApi.renderer.setSize(dom_wh.value, dom_ht.value);
}, false);


