<template>
  <div id="publicTitle" class="box">
    <div class="all_title box">
      <div class="all_title_icon" v-if="isShowIcon"></div>
      <div class="all_title_text" v-if="titleType == 1">{{ title }}</div>
      <div class="all_title_text_normal" v-if="titleType == 2">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowIcon: {
      type: Boolean,
      default: true,
    },
    titleType: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      default: "标题",
    },
  },
};
</script>

<style lang="scss" scoped>
.all_title_icon {
  width: 8px;
  height: 8px;
  margin-right: 6px;
  border-radius: 50%;
  background: #0663f6;
}
.all_title_text {
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
}
.all_title_text_normal {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
</style>
