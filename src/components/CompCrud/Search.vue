<template>
  <div id="search">
    <PublicTitle :title="pageTitle"/>
    <div class="search_box box" v-if="isShowSearch">
      <div class="search_form_list box">
        <slot name="searchContent" />
      </div>
      <div class="search_form_btn boxC">
        <el-button
          @click="crud.toQuery"
          type="primary"
          size="mini"
          v-preventReClick="3000"
          >检索</el-button
        >
        <el-button @click="crud.resetQuery" type="warning" size="mini">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PublicTitle from "@/components/PublicTitle";
import { crud } from "@/components/CompCrud/crud";
export default {
  name: "CrudSearch",
  components: {
    PublicTitle,
  },
  mixins: [crud()],
  props: {
    pageTitle: {
      type: String,
      default: "",
    },
    isShowSearch: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
#search {
  .search_box {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    .search_form_list {
      padding-left: 15px;
    }
    .search_form_item {
      width: 180px;
      height: 40px;
      margin-right: 16px;
      border-radius: 10px;
    }
  }
}
</style>
<style scoped>
.search_form_item >>> .el-input__inner {
  border: none;
}
</style>
