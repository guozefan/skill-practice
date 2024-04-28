<template>
  <div id="compTableBtn">
    <div class="boxC">
      <slot name="left"/>
      <el-button type="text" @click="crud.toShowDetail(data)" v-if="permission.detail"
        >{{detailText}}</el-button
      >
      <el-button
        type="text"
        v-permission="permission.edit"
        @click="crud.toEdit(data)"
        :loading="crud.status.cu === 2"
        >编辑</el-button
      >
      <el-button type="text" v-permission="permission.del" @click="toDelete(data,deleteParams)"
        >删除</el-button
      >
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
import { crud } from "@/components/CompCrud/crud";
export default {
  name: "CrudTableBtn",
  mixins: [crud()],
  props: {
    permission: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 调用删除接口额外传的参数
    deleteParams: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 详情文案
    detailText:{
      type:String,
      default:'详情'
    }
  },
  methods: {
    toDelete(data,params) {
      // this.pop = true
      this.$confirm(`确认删除该条数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.crud.doDelete(data,params);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
