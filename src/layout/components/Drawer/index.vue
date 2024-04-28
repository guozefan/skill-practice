<template>
  <el-drawer v-model="props.visible" class="hedaer_drawer" :direction="direction" :before-close="handleClose">
    <template #header>
      <h4>布局设置</h4>
    </template>
    <div class="drawer_item mb30">
      <p class="drawer_text">
        <el-icon>
          <Notification />
        </el-icon>
        布局切换
      </p>
      <ul>
        <li v-for="i in 4">
          <div></div>
          <div>
            <div></div>
            <div></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mb30">
      <p class="drawer_text">
        <el-icon>
          <ColdDrink />
        </el-icon>
        全局主题
      </p>
      <ul class="drawer_list">
        <li>
          <p>主题颜色</p>
          <el-color-picker v-model="state.color" size="small" />
        </li>
        <li>
          <p>暗黑模式</p>
          <el-switch v-model="state.value2" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
        </li>
        <li>
          <p>灰色模式</p>
          <el-switch v-model="state.value3" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
        </li>
        <li>
          <p>色弱模式</p>
          <el-switch v-model="state.value4" class="mt-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
        </li>
      </ul>
    </div>
    <div class="mb30">
      <p class="drawer_text">
        <el-icon>
          <Setting />
        </el-icon>
        界面设置
      </p>
      <ul class="drawer_list">
        <li>
          <p>折叠菜单</p>
          <el-switch v-model="state.value5" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
        </li>
        <li>
          <p>面包屑</p>
          <el-switch v-model="state.value6" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
        </li>
        <li>
          <p>标签栏</p>
          <el-switch v-model="state.value7" class="mt-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
        </li>
        <li>
          <p>页脚</p>
          <el-switch v-model="state.value8" class="mt-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
        </li>
      </ul>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
const direction = ref('rtl')

const props = defineProps({
  visible: {
    type: Boolean, default: false,
  },
  handleClose: {
    type: Function, required: true
  }
})

const state = reactive({
  color: "409EFF",
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: false,
  value7: false,
  value8: false,
})


</script>
<style lang="scss" scoped>
.el-drawer__header {


  h4 {
    font-size: 24px;
    color: black;
    font-weight: 500;
  }
}

.el-drawer__body {

  .drawer_text {
    text-align: center;
    line-height: 24px;
    font-size: 24px;
    margin-bottom: 20px;
    position: relative;

    i {
      position: relative;
      top: 3px;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      height: 1px;
      background-color: #ccc;
      width: 25%;
    }

    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      height: 1px;
      background-color: #ccc;
      width: 25%;
    }

  }

  .mb30 {
    margin-bottom: 30px;
  }

  .drawer_item {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 10%;
    }

    li {
      margin-bottom: 20px;
      display: flex;
      padding: 10px;
      border-radius: 5px;
      width: 45%;
      box-sizing: border-box;
      height: 70px;
      justify-content: space-between;
      box-shadow: 0 0 5px 1px #ebeff5;
      cursor: pointer;
      transition: all .2s;

      &:nth-child(1)>div:nth-child(1) {
        width: 20%;
        border-radius: 3px;
        background-color: #FF5c93;
      }

      &:nth-child(1)>div:nth-child(2) {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        >div:nth-child(1) {
          height: 20%;
          border-radius: 3px;
          background-color: #ffaec9;
        }

        >div:nth-child(2) {
          height: 65%;
          background-color: #ffdee9;
          border-radius: 3px;
          border: dashed 1px #FF5c93;
        }
      }

      &:nth-child(2),
      &:nth-child(3) {
        flex-direction: column;
      }

      &:nth-child(2)>div:nth-child(1) {
        height: 20%;
        border-radius: 3px;
        background-color: #FF5c93;
      }

      &:nth-child(2)>div:nth-child(2) {
        height: 65%;
        display: flex;
        justify-content: space-between;

        >div:nth-child(1) {
          width: 20%;
          border-radius: 3px;
          background-color: #ffaec9;
        }

        >div:nth-child(2) {
          width: 70%;
          background-color: #ffdee9;
          border-radius: 3px;
          border: dashed 1px #FF5c93;
        }
      }

      &:nth-child(3)>div:nth-child(1) {
        height: 20%;
        border-radius: 3px;
        background-color: #FF5c93;
      }

      &:nth-child(3)>div:nth-child(2) {
        height: 65%;
        background-color: #ffdee9;
        border-radius: 3px;
        border: dashed 1px #FF5c93;
      }

      &:nth-child(4)>div:nth-child(1) {
        width: 20%;
        border-radius: 3px;
        background-color: #FF5c93;
      }

      &:nth-child(4)>div:nth-child(2) {
        width: 70%;
        display: flex;
        justify-content: space-between;

        >div:nth-child(1) {
          width: 28%;
          border-radius: 3px;
          background-color: #ffaec9;
        }

        >div:nth-child(2) {
          width: 58%;
          background-color: #ffdee9;
          border-radius: 3px;
          border: dashed 1px #FF5c93;
        }
      }
    }
  }

  .drawer_list {
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      p {
        font-size: 18px;
      }
    }
  }
}
</style>
<style lang="scss">
.el-drawer__header {
  border-bottom: solid 1px #ccc;
  padding-bottom: 20px;
  margin-bottom: 0 !important;
}

.el-drawer__body {
  padding-top: 40px;
}

.hedaer_drawer {
  width: 300px !important;
}
</style>
