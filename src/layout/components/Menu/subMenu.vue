<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title>
        <el-icon>
          <svg-icon :iconName="item.meta.icon" color="#fff"></svg-icon>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <subMenu :menuList="item.children"></subMenu>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path" @click="handleClickMenu(item)">
      <el-icon>
        <svg-icon :iconName="item.meta.icon" color="#fff"></svg-icon>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script lang="ts" setup>

import { useRouter } from "vue-router";

defineProps<{ menuList: any[] }>();

const router = useRouter();
const handleClickMenu = (item: any) => {
  if (item.meta.isLink) return window.open(item.meta.isLink, "_blank");
  router.push(item.path);
};
</script>
<style></style>
