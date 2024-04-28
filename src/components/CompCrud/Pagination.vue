<template>
  <div
    :class="{ hidden: hidden }"
    v-show="crud.list.length > 0"
    class="pagination-container boxC"
  >
    <el-pagination
      :background="background"
      :current-page.sync="crud.currentPage"
      :page-size.sync="crud.pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="crud.total"
      v-bind="$attrs"
      @size-change="crud.sizeChangeHandler"
      @current-change="crud.pageChangeHandler"
    />
  </div>
</template>

<script>
import { scrollTo } from "@/utilss/scroll-to";
import { crud } from "@/components/CompCrud/crud";
export default {
  name: "CrudPagination",
  mixins: [crud()],
  props: {
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50, 80];
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    // 当前页显示多少条
    handleSizeChange(val) {
      this.$emit("pagination", {
        currentPage: this.currentPage,
        pageSize: val,
      });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    // 当前页码
    handleCurrentChange(val) {
      this.$emit("pagination", { currentPage: val, pageSize: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style scoped>
.pagination-container {
  width: 100%;
  margin: 15px 0;
}
.pagination-container.hidden {
  display: none;
}
</style>
