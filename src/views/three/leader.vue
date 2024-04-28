<template>
  <div ref="dom"></div>
</template>
<script setup>
import * as THREE from 'three';
import { ref, reactive, onMounted, render } from 'vue';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

import { Mesh } from 'three';

// 声明全局变量
let camera,scene,renderer,labelRenderer;

const dom = ref(null)
let clock = new THREE.Clock();

// 实例化纹理加载器
const textureLoader = new THREE.TextureLoader();

function init(){


  // 实例化相机
  camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
  camera.position.z = 3

  // 实例化场景
  scene = new THREE.Scene();

  // 创建聚光灯光源创建添加
  const dirLight = new THREE.SpotLight(0xffffff);
  dirLight.position.set(0,0,10)
  dirLight.intensity =2;
  dirLight.castShadow = true;
  scene.add(dirLight)

  // 添加环境光
  const alight = new THREE.AmbientLight(0xffffff)
  alight.intensity = 0.3;
  scene.add(alight)



  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias:true
  })
  renderer.setSize(window.innerWidth , window.innerHeight)
  dom.value.appendChild(renderer.domElement)



  // 绑定控制和摄像头
  const controls = new OrbitControls(camera,renderer.domElement)

}

function animate(){
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}

onMounted(()=>{
  init()
animate()
})


</script>
<style>
.label{
  font-size: 18px;
  font-weight: 600;
  color: black;
}
</style>
