<template>
  <el-container class="common-layout">
    <el-aside>
      <LogoMen />
      <Menu />
    </el-aside>
    <el-container class="mains">
      <Header />
      <el-main>
        <router-view></router-view>
      </el-main>
      <Footer />
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Menu from "@/layout/components/Menu/index.vue";
import Header from '@/layout/components/Header/index.vue';
import Footer from "@/layout/components/Footer/index.vue";
import LogoMen from "@/layout/components/LogoMen/index.vue";
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100% !important;
  flex-direction: initial;

}

.el-container {
  height: 100%;
}

.el-aside {
  width: auto;
  position: relative;
  background-color: #41466d;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.mains {
  flex-direction: column;
}

.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  background-color: #f0f2f5;
}

.scrollMen {
  flex: 1;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
}

::v-deep {

  .common-layout,
  .el-container,
  .el-scrollbar__view,
  .el-menu {
    height: 100%;
  }


  >.el-menu {
    display: flex;
    flex-direction: column;
    transition: all .3s ease;
    background-color: transparent;
    overflow-y: scroll;
    padding-right: 0 !important;
  }
}
</style>
