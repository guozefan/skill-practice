<template>
  <div class="container">
    <div class="box">
      <div class="left">1</div>
      <div class="center">2</div>
      <div class="right">3</div>
    </div>
  </div>
</template>
<script setup>

import { reactive, ref, onMounted } from 'vue'

const state = reactive({
  rotate: 0,
  time: null,
  index:1
})
let lis;

onMounted(()=>{
   lis = document.querySelectorAll(".box div");
  autoPlay()
  openPlay()
})

function autoPlay(){
  let prevli,nextli;
    if(state.index === lis.length-1){
        nextli = 0;
    }else{
        nextli = state.index + 1;
    }
    if(state.index === 0){
        prevli = lis.length-1;
    }else{
        prevli = state.index - 1;
    }
    for(let i = 0; i <= lis.length-1; i++){
        lis[i].className = "";
    }
  for(let i = 0; i <= lis.length-1; i++){
        lis[i].className = "";
    }
    lis[state.index].className = "center";
    lis[nextli].className = "right";
    lis[prevli].className = "left";
}


function openPlay(){
  setInterval(()=>{
    state.index--;
    if(state.index < 0){
      state.index = lis.length-1;
    }
    autoPlay()
  },3000)
}


</script>

<style lang="scss" scoped>
.container {
  position: relative;
  left: 50%;
  top: 30px;
  width: 180px;
  height: 150px;
  perspective: 800px;

  .box {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 1s;
    >div{
      width: 200px;
      height: 150px;
      position: absolute;


    }
  }

  .left{
    background-color: aquamarine;
    transform: rotateY(-45deg) translateZ(295px);
    // transition: .2s;
  }
  .center{
    background-color: beige;
    transform:rotateY(0deg) translateZ(295px);
    transition: 2s;
  }
  .right{
   background-color: blueviolet;
   transform: rotateY(45deg) translateZ(295px);
   transition: 2s;
  }
}

</style>
