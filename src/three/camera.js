import * as THREE from 'three';
import scene from './scene';
import { model } from '@/store/model.ts';
import { storeToRefs } from 'pinia';
const { dom_wh,dom_ht } = storeToRefs(model());

// 初始化相机
class CameraApi {
  init() {
    this.camera = new THREE.PerspectiveCamera(45, dom_wh.value / dom_ht.value, 1, 1000);
    this.camera.position.set(0, 0, 10)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 相机辅助线
    // const helper = new THREE.CameraHelper( this.camera );
    // scene.add( helper );
    window.camera = this.camera
  }
  setPos(x, y, z) {
    this.camera.position.set(x, y, z)
  }
}


export default new CameraApi();
