import * as THREE from 'three';


var scene = new THREE.Scene()


// 环境光
let AmbientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(AmbientLight);
scene.background = new THREE.Color('#ccc');
scene.environment = new THREE.Color('#ccc')

// 地面
// var gridHelper = new THREE.GridHelper(100, 30, 0x2C2C2C, 0x888888);
// gridHelper.receiveShadow = true
// console.log(gridHelper)
// scene.add(gridHelper);







// const box = new THREE.Box3();
// box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );

// const helper = new THREE.Box3Helper( box, 0xffff00 );
// scene.add( helper );

export default scene;
