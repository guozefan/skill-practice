<template>
  <div class="loading" v-if="loading">
    <div class="container">
      <div class="arc"></div>
      <div class="text">正在加载：{{ value }} %</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: true,
    default: 0
  },
  loading:{
    type: Boolean,
    required: true,
    default: false
  }
})
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.5);



  .arc {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-top: 2px solid #ffea29;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    animation: rt 2s infinite linear;
    position: relative;

    &::after {
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 0;
      height: 0;
      border-radius: 50%;
      border-top: initial;
      border-left: initial;
      border-right: initial;
      animation: cw 1s infinite;
      content: "";
      background: snow;
    }

    &::before {
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border-top: 2px solid #8d29ff;
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
      animation: rt 4s infinite linear reverse;
      content: "";
    }
  }

  .text{
    color: #fff;
  }
}

@keyframes rt {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes cw {
  0% {
    width: 0;
    height: 0;
  }

  75% {
    width: 40px;
    height: 40px;
  }

  100% {
    width: 0;
    height: 0;
  }
}</style>
