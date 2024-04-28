<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- <el-breadcrumb-item v-for="(item, idx) in breadList" :to="item.path">{{ item.meta.title }}</el-breadcrumb-item> -->
    <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
    <!-- <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const breadList = ref([] as any[])

const isHome = (router: any) => {
  return router.name === '/home/index'
}

const getBreadcrumb = () => {
  const matched = router.currentRoute.value.matched;
  const value = router.currentRoute.value
  if (!isHome(value)) {
    breadList.value = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
    return
  }
  breadList.value = [matched];
}


watch(() => router.currentRoute.value.path, (toPath) => {
  getBreadcrumb()

}, { immediate: true, deep: true })


</script>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 32px;
}
</style>
