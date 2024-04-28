import * as THREE from 'three';
import cameraApi from './camera';
import scene from './scene';

let geom;
let drops = 20000; //雨滴数量
let raindropSpeed = 5 //雨滴下落速度
let dropSpeed = 8  // 雪花下落速度
let group = new THREE.Group();
//
export const createRain = () => {
  //加载雨滴图片
  let rain = new URL('../assets/images/yudi.jpg', import.meta.url).href
  const texture = new THREE.TextureLoader().load(rain)
  // 定义顶点数据
  const positions = new Float32Array(drops * 3);
  const velocities = new Float32Array(drops * 3);
  geom = new THREE.BufferGeometry()
  // 生成雨滴位置
  // for (let i = 0; i < drops; i++) {
  //   positions[i * 3] = (Math.random() - 0.5) * 16000; // x
  //   positions[i * 3 + 1] = Math.random() * 5000; // y
  //   positions[i * 3 + 2] = (Math.random() - 0.5) * 16000; // z
  //   //雨滴位移速度
  //   velocities[i * 3] = 0; // x
  //   velocities[i * 3 + 1] = -raindropSpeed; // y
  //   velocities[i * 3 + 2] = 0; // z
  // }
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  // 创建雨滴材质
  const rainMaterial = new THREE.PointsMaterial({
    //color: 0xffffff,
    size: 10,
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending, // 融合模式
    // depthTest: false, // 可以去掉texture的黑色背景

  });
  let Points = new THREE.Points(geom, rainMaterial)
  group.name = '下雨'
  group.add(Points)
  scene.add(group)
}

export const createSnow = () => {
  //加载雨滴图片
  let rain = new URL('../assets/images/rain.jpg', import.meta.url).href
  const texture = new THREE.TextureLoader().load(rain)
  // 定义顶点数据
  const positions = new Float32Array(drops * 3);
  const velocities = new Float32Array(drops * 3);
  const snowflakeRotations = new Float32Array(drops * 3);
  geom = new THREE.BufferGeometry()
  // 生成雨滴位置
  for (let i = 0; i < drops; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16000; // x
    positions[i * 3 + 1] = Math.random() * 5000; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 16000; // z

    // 修改雪花坠落位置数据，使其x、z方向上可以晃动飘落；修改dropSpeed坠落速度，雪花的速度会慢一些
    velocities[i * 3] = (Math.random() - 0.5) / 3 * dropSpeed; // x
    velocities[i * 3 + 1] = -dropSpeed + (Math.random() / 5 * dropSpeed); // y
    velocities[i * 3 + 2] = (Math.random() - 0.5) / 3 * dropSpeed; // z


    // 雪花的随机旋转角度
    snowflakeRotations[i * 3] = Math.random() * 2 * Math.PI;
    snowflakeRotations[i * 3 + 1] = Math.random() * 2 * Math.PI;
    snowflakeRotations[i * 3 + 2] = Math.random() * 2 * Math.PI;
  }
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  geom.setAttribute('rotation', new THREE.BufferAttribute(snowflakeRotations, 1));

  // 创建雨滴材质
  const rainMaterial = new THREE.PointsMaterial({
    //color: 0xffffff,
    size: 10,
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending, // 融合模式
    depthTest: false, // 可以去掉texture的黑色背景

  });
  let Points = new THREE.Points(geom, rainMaterial)
  group.name = '下雪'
  group.add(Points)
  scene.add(group)
}


export const  updateDrops =()=> {
  const positions = geom.attributes.position.array;
  const velocities = geom.attributes.velocity.array;
  for(let i=0; i<drops;i++){ //change Y
      // 更新雨滴位置
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // 如果雨滴落到了地面，重新回到顶部
      if (positions[i * 3 + 1] < -500) {
          positions[i * 3] = (Math.random() - 0.5) * 16000; // x
          positions[i * 3 + 1] = Math.random() * 5000; // y
          positions[i * 3 + 2] = (Math.random() - 0.5) * 16000; // z
      }
  }
  geom.attributes.position.needsUpdate = true
  group.position.copy( cameraApi.camera.position ); //不管放大还是缩小 雨滴不会改变
}
