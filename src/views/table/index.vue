<template>
  <div id="list">
    <Search :pageTitle="crud.title" :isShowSearch="true">
      <template #searchContent>
        <div class="box">
          <div class="search_form_item boxC" style="width: auto">
            <el-select v-model="query.type" placeholder="操作类型">
              <el-option label="查看" :value="1" />
              <el-option label="所有操作" :value="2" />
            </el-select>
          </div>
          <div class="search_form_item boxC" style="width: auto">
            <el-select v-model="query.module_id" placeholder="模块">
              <el-option v-for="(item, index) in moduleOptions" :key="'queryModule' + index" :label="item"
                :value="index" />
            </el-select>
          </div>
        </div>
      </template>

    </Search>
    <HeadBtn :permission="permission" />
    <div class="lists">
      <el-table :data="crud.list" ref="table" style="width: 100%" v-loading="crud.listLoading">
        <el-table-column label="序号" prop="id" width="60" align="center" />
        <el-table-column label="模块功能名称" prop="name" align="center" />
        <el-table-column label="描述" prop="desc" align="center" />
        <el-table-column label="可执行操作" prop="type" align="center">
          <template #default="scope">
            {{ scope.row.type == 1 ? "查看" : "所有操作" }}
          </template>
        </el-table-column>
        <el-table-column label="所属模块" prop="module_names" align="center" />
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template #default="scope">
            <TableBtn :data="scope.row" :permission="permission" />
          </template>
        </el-table-column>
      </el-table>
      <pagination />
    </div>
    <!-- 表单 -->
    <div id="form">
      <Dialog>
        <!-- 表单 -->
        <template #dialogContent>
          <div class="formContent" v-if="crud.status.add > 0 || crud.status.edit > 0">
            <el-form :model="form" :rules="rules" ref="form" label-width="115px">
              <el-form-item label="模块功能名称" prop="name">
                <el-input v-model.trim="form.name"></el-input>
              </el-form-item>
              <el-form-item label="模块名称" prop="module_id">
                <el-select v-model="form.module_id" placeholder="模块">
                  <el-option v-for="(item, index) in moduleOptions" :key="'formModule' + index" :label="item"
                    :value="index" />
                </el-select>
              </el-form-item>
              <el-form-item label="可执行的操作" prop="type">
                <template class="box">
                  <el-radio-group v-model="form.type">
                    <el-radio :label="1">查看</el-radio>
                    <el-radio :label="2">所有操作</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
              <el-form-item label="模块描述" prop="desc">
                <el-input type="textarea" v-model.trim="form.desc" rows="6"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import crudModule from './module'
// import { reactive, ref, onMounted,getCurrentInstance } from 'vue';
import Pagination from "@/components/CompCrud/Pagination";
import HeadBtn from "@/components/CompCrud/Pagination";
import Search from "@/components/CompCrud/Pagination";
import TableBtn from "@/components/CompCrud/Pagination";
import Dialog from "@/components/CompCrud/Pagination";
import CRUD, { presenter, header, form, crud } from "@/components/CompCrud/crud.js";

const defaultForm = {
  name: "",
  desc: "",
  type: 1,
  module_id: null,
};
export default {
  name: "Module",
  components: { Pagination, Dialog, HeadBtn, Search, TableBtn },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({
      title: "模块",
      crudMethod: { ...crudModule },
      query: { types: 1 },
    });
  },
  data() {
    return {
      permission: {
        add: ["模块管理"],
        edit: ["模块管理"],
        del: ["模块管理"],
        detail: false,
      },
      rules: {
        name: [{ required: true, message: "请输入模块名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
        type: [
          { required: true, message: "请选择可执行操作", trigger: "change" },
        ],
        module_id: [
          { required: true, message: "请选择模块功能", trigger: "change" },
        ],
      },
      moduleOptions: [],
    };
  },
  created() {
    this.onGetModuleArrayList();
  },
  methods: {
    // 新建和编辑表单校验后处理数据
    [CRUD.HOOK.afterValidateCU](e, form) {
      delete form.account;
      return true;
    },
    onGetModuleArrayList() {
      this.moduleOptions = {
        0: '设备管理',
        1: '系统管理',
        2: '财务管理',
        8: '小程序',
        9: '平台数据',
        11: 'C端',
        12: 'B端',
        13: '对外宣传',
        14: '意向用户',
        15: '外部活动',
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
