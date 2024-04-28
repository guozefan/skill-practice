
<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const store = useUserStore();
const router = useRouter();

onMounted(() => {

})
</script>

<style scoped lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
</style>
