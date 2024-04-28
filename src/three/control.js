// 轨道控制器
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';
import cameraApi from './camera';

// 控制器
class Controls {
  init() {
    this.controls = new OrbitControls(cameraApi.camera, document.getElementById('containers'));
    this.controls.enableZoom = true;
    this.controls.maxPolarAngle = Math.PI * (90 / 190);
    this.controls.enableDamping = true;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 10000;
  }
}

export default new Controls()
