import * as THREE from 'three';
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

import {
  model
} from '@/store/model.ts';
import {
  storeToRefs
} from 'pinia';

const {
  dom_wh,
  dom_ht
} = storeToRefs(model());


// 渲染
class Renderer {
  init() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true
    });
    this.renderer.autoClear = false; //取消Threejs帧缓冲区数据自动清除功能
    this.renderer.shadowMap.enabled = true
    this.renderer.setSize(dom_wh.value, dom_ht.value);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    document.getElementById('containers').appendChild(this.renderer.domElement);


    // this.labelRenderer = new CSS2DRenderer()
    // // 设置渲染器宽高
    // this.labelRenderer.setSize(dom_wh.value, dom_ht.value);
    // //将css2d节点渲染到页面中
    // document.getElementById('containers').appendChild(this.labelRenderer.domElement);

    // this.labelRenderer.domElement.style.position = 'fixed';
    // this.labelRenderer.domElement.style.top = '0px';
    // this.labelRenderer.domElement.style.left = '0px';
    // this.labelRenderer.domElement.style.zIndex = '0';

  }
}

export default new Renderer();
