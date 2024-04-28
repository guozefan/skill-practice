<template>
  <el-header>
    <div class="lf lin_cen">
      <div @click="handelCollapse" class="icons">
        <svg-icon v-if="menuIsCollapse" iconName="icon-shouqi2-01" color="black"></svg-icon>
        <svg-icon v-else iconName="icon-shouqi2-01-copy" color="black"></svg-icon>
      </div>
      <Curmbs />
    </div>
    <div class="rf">
      <div class="lin_cen" @click="handleOpens">
        <svg-icon iconName="icon-pifu" color="black"></svg-icon>
      </div>
      <div class="lin_cen">
        <el-popover placement="bottom" :width="200" trigger="click">
          <template #reference>
            <el-badge :value="3" class="item">
              <svg-icon iconName="icon-a-naolingtixingtongzhi" color="black"></svg-icon>
            </el-badge>
          </template>
          <el-tabs v-model="state.activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="通知" name="first">User</el-tab-pane>
            <el-tab-pane label="消息" name="second">Config</el-tab-pane>
            <el-tab-pane label="待办" name="third">Role</el-tab-pane>
          </el-tabs>
        </el-popover>
      </div>
      <div class="lin_cen">
        <svg-icon iconName="icon-quanping_o" color="black"></svg-icon>
      </div>
      <p class="user lin_cen"><span>{{ userInfo.user }}</span></p>
      <div class="lin_cen">
        <el-popover placement="bottom" :width="100" trigger="click">
          <template #reference>
            <video width="40" height="40" autoplay loop muted>
              <source src="@/assets/images/user1.mp4" type="video/mp4">
              您的浏览器不支持 video 标签。
            </video>
          </template>
          <ul>
            <li>修改个人信息</li>
            <li>退出登录</li>
          </ul>
        </el-popover>
      </div>
    </div>
  </el-header>
  <Drawer :visible="state.drawer" :handleClose="handleClose" />
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/user.js';
import Drawer from '../Drawer/index.vue';
import Curmbs from '@/layout/components/crumbs.vue'
import type { TabsPaneContext } from 'element-plus'
import { global } from '@/store/global.js';
import { storeToRefs } from 'pinia';
const { menuIsCollapse } = storeToRefs(global());
const globals = global()

const { userInfo } = useUserStore();

const state = reactive({
  drawer: false,
  activeName: 'first'
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const handelCollapse = () => {
  globals.setIsCollapse(!menuIsCollapse.value)
}
const handleOpens = () => {
  state.drawer = true;
}
const handleClose = () => {
  state.drawer = false;
}
</script>
<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
  height: 70px;

  .lf {
    font-size: 32px;

    .icons {
      font-size: 26px;
    }
  }

  .lin_cen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .rf {
    display: flex;

    height: 40px;

    .lin_cen {
      height: 40px;
      line-height: 40px;
      margin: 0 10px;
    }

    .lin_cen {
      font-size: 30px;
    }

    .user {
      font-size: 24px;
    }
  }
}
</style>
