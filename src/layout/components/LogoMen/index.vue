

<template>
  <div class="user">
    <div class="imgs"><img src="../../../assets/images/meow.png" alt=""></div>
    <p v-if="!menuIsCollapse">后台管理系统</p>
  </div>
</template>
<script setup>
import { global } from '@/store/global.ts';
import { storeToRefs } from 'pinia';
const { menuIsCollapse } = storeToRefs(global());
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: solid 1px rgba(255, 255, 255, 0.3);

  .imgs {
    width: 60px;
    height: 60px;


    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    margin-top: 20px;
    height: 26px;
    line-height: 26px;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
  }
}
</style>
