<template>
  <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="menuIsCollapse" background-color="#41466d" text-color="#fff"
    active-text-color="#ffd04b" :collapse-transition="false">
    <SubMenu :menu-list="menus"></SubMenu>
  </el-menu>
</template>
<script lang="ts" setup>
import {ref,watch} from 'vue'
import { useRouter } from "vue-router";
import { menus } from '@/assets/js/data';
import SubMenu from './subMenu.vue';
import { global } from '@/store/global.ts';
import { storeToRefs } from 'pinia';


const router = useRouter();
const { menuIsCollapse } = storeToRefs(global());
const activeIndex = ref('')

watch(()=>router.currentRoute.value.path,(newPath, oldPath) => {
  activeIndex.value = newPath
 },{ immediate: true })
</script>

<style lang="scss" scoped>
::v-deep {
  .el-menu {
    display: flex;
    flex-direction: column;
    height: calc(100% - 130px);
    transition: all .3s ease;

  }

  .el-menu-item {
    font-size: 18px;
  }
}
</style>
