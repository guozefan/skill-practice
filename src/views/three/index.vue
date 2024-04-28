<template>
  <div id="containers" @click="modelMouseClick" ref="dom"></div>

</template>
<script setup ts>
import * as THREE from "three";
import { reactive, onMounted, onUnmounted, watch, nextTick, h, ref } from 'vue';
// 引入
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";


import scene from '@/three/scene';
import cameraApi from '@/three/camera';
import rendererApi from '@/three/renderer';
import controlsApi from '@/three/control';
import {createRain} from '@/three/model'
import {ainmate,modelMouseClick} from '@/three/animate';


import { model } from '@/store/model.ts';


const gui = new GUI();
const models = model()
const dom = ref()
const group= new THREE.Group();

const state = reactive({
  screenWidth: 0,
  screenHeight: 0,
  num: 0,
  loading: true,
})


let modelsList =[]


onMounted(() => {
  init();
});

function init(){
  const wh =dom.value?.clientWidth
  const ht =dom.value?.clientHeight
  models.setDomSize({wh,ht})
  cameraApi.init();
  rendererApi.init();
  controlsApi.init();
  createRain()
  ainmate();

}


function createTag(){
  const earthDiv = document.createElement('div');
  earthDiv.className = 'label';
  earthDiv.innerHTML = '地球'
  return earthDiv
}

function addMeinv(){
  const manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    //  let num = Math.floor((loaded / total) * 100);
     console.log(Math.floor((loaded / total) * 100))
    // if (num === 100) {
    //  console.log(num)
    // }
  };
  const loader = new GLTFLoader(manager);
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load('./models/meinv.gltf',(gltf)=>{
    gltf.scene.traverse((object)=>{
      if (object.isMesh) {
        object.material.side = THREE.DoubleSide;
        object.material.emissive = object.material.color;
        object.material.emissiveMap = object.material.map;
        object.castShadow = true
      }
      object.position.set(-2,0,0)
      object.scale.set(0.1, 0.1, 0.1);
      modelsList.push(object);
    })
    scene.add(gltf.scene)
  })
}
</script>
<style>
#containers {
  width: 100%;
  height: 100%;
}

.mask {
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: blue;
  color: #fff;
}
</style>
@/store/threes
@/store/model
