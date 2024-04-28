<template>
  <div id="compHeadBtn">
    <div class="boxS">
      <div class="compLeftBtn box">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="crud.toAdd()"
          v-permission="permission.add"
          >{{ addText }}</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="onDownload"
          :disabled="crud.list.length <= 0"
          v-loading="downloading"
          v-permission="permission.download ? permission.download : [false]"
          >导出</el-button
        >
        <slot name="headLeftBtn" />
      </div>
      <div class="compRightBtn">
        <el-button size="mini" icon="el-icon-refresh" @click="crud.refresh()" />
        <el-popover placement="bottom-end" width="150" trigger="click">
          <el-button slot="reference" size="mini" icon="el-icon-s-grid">
            <i class="fa fa-caret-down" aria-hidden="true" />
          </el-button>
          <el-checkbox
            v-model="allColumnsSelected"
            :indeterminate="allColumnsSelectedIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox
            v-for="item in tableColumns"
            :key="item.property"
            v-model="item.visible"
            @change="handleCheckedTableColumnsChange(item)"
          >
            {{ item.label }}
          </el-checkbox>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import CRUD, { crud } from "@/components/CompCrud/crud";
import { parseTime } from "@/utilss";
function sortWithRef(src, ref) {
  const result = Object.assign([], ref);
  let cursor = -1;
  src.forEach((e) => {
    const idx = result.indexOf(e);
    if (idx === -1) {
      cursor += 1;
      result.splice(cursor, 0, e);
    } else {
      cursor = idx;
    }
  });
  return result;
}
export default {
  name: "CrudHeadBtn",
  mixins: [crud()],
  props: {
    permission: {
      type: Object,
      default: () => {
        return {};
      },
    },
    addText: {
      type: String,
      default: "新增",
    },
    hiddenColumns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    ignoreColumns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    downloadInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      tableColumns: [],
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      tableUnwatcher: null,
      // 忽略下次表格列变动
      ignoreNextTableColumnsChange: false,
      downloading: false,
    };
  },
  watch: {
    "crud.props.table"() {
      this.updateTableColumns();
      this.tableColumns.forEach((column) => {
        if (this.hiddenColumns.indexOf(column.property) !== -1) {
          column.visible = false;
          this.updateColumnVisible(column);
        }
      });
    },
    "crud.props.table.store.states.columns"() {
      this.updateTableColumns();
    },
  },
  methods: {
    updateTableColumns() {
      const table = this.crud.getTable();
      if (!table) {
        this.tableColumns = [];
        return;
      }
      let cols = null;
      const columnFilter = (e) =>
        e &&
        e.type === "default" &&
        e.property &&
        this.ignoreColumns.indexOf(e.property) === -1;
      const refCols = table.columns.filter(columnFilter);
      if (this.ignoreNextTableColumnsChange) {
        this.ignoreNextTableColumnsChange = false;
        return;
      }
      this.ignoreNextTableColumnsChange = false;
      const columns = [];
      const fullTableColumns = table.$children
        .map((e) => e.columnConfig)
        .filter(columnFilter);
      cols = sortWithRef(fullTableColumns, refCols);
      cols.forEach((config) => {
        const column = {
          property: config.property,
          label: config.label,
          visible: refCols.indexOf(config) !== -1,
        };
        columns.push(column);
      });
      this.tableColumns = columns;
    },
    handleCheckAllChange(val) {
      if (val === false) {
        this.allColumnsSelected = true;
        return;
      }
      this.tableColumns.forEach((column) => {
        if (!column.visible) {
          column.visible = true;
          this.updateColumnVisible(column);
        }
      });
      this.allColumnsSelected = val;
      this.allColumnsSelectedIndeterminate = false;
    },
    handleCheckedTableColumnsChange(item) {
      let totalCount = 0;
      let selectedCount = 0;
      this.tableColumns.forEach((column) => {
        ++totalCount;
        selectedCount += column.visible ? 1 : 0;
      });
      if (selectedCount === 0) {
        this.crud.notify("请至少选择一列", CRUD.NOTIFICATION_TYPE.WARNING);
        this.$nextTick(function () {
          item.visible = true;
        });
        return;
      }
      this.allColumnsSelected = selectedCount === totalCount;
      this.allColumnsSelectedIndeterminate =
        selectedCount !== totalCount && selectedCount !== 0;
      this.updateColumnVisible(item);
    },
    updateColumnVisible(item) {
      const table = this.crud.props.table;
      const vm = table.$children.find((e) => e.prop === item.property);
      const columnConfig = vm.columnConfig;
      if (item.visible) {
        // 找出合适的插入点
        const columnIndex = this.tableColumns.indexOf(item);
        vm.owner.store.commit("insertColumn", columnConfig, columnIndex + 1, null);
      } else {
        vm.owner.store.commit("removeColumn", columnConfig, null);
      }
      this.ignoreNextTableColumnsChange = true;
    },
    onDownload() {
      // 获取请求参数
      let param = this.crud.getQueryParams();
      let url = "";
      let urlParams = "";
      let generateParams = param;
      // 过滤page、size、sort，保留有效参数
      Object.keys(param).map((item) => {
        if (item != "page" && item != "size" && item != "sort") {
          urlParams += `&${item}=${param[item]}`;
        }
        // 参与生成验签去除page、size、sort。否则验签报错
        if (item == "page") {
          delete generateParams.page;
        }
        if (item == "size") {
          delete generateParams.size;
        }
        if (item == "sort") {
          delete generateParams.sort;
        }
      });
      // 去除开头的&
      urlParams = urlParams.substring(1, urlParams.length);
      // 拼接url
      url = `${process.env.VUE_APP_BASE_API}${this.downloadInfo.url}?${urlParams}`;
      // generateSign(generateParams, (data) => {
      //   url +=
      //     (urlParams ? "&" : "") +
      //     "sign=" +
      //     data.signs +
      //     "&token=" +
      //     data.token +
      //     "&times=" +
      //     data.timestamp +
      //     "&account=" +
      //     data.account +
      //     "&userId=" +
      //     data.userId;
      //   var a = document.createElement("a"); //创建一个<a></a>标签
      //   console.log("url-----", url);
      //   a.href = url; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
      //   a.target = '_blank';
      //   // a.download = "退款数据"; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
      //   a.style.display = "none"; // 障眼法藏起来a标签
      //   document.body.appendChild(a); // 将a标签追加到文档对象中
      //   a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
      //   this.downloading = true;
      //   a.remove(); // 一次性的，用完就删除a标签
      //   setTimeout(() => {
      //     this.downloading = false;
      //   }, 1000);
      // });
      // if (this.crud.list.length <= 0) {
      //   this.$notify.warning("暂无数据");
      //   return;
      // }
      // this.downloading = true;
      // import("@/vendor/Export2Excel").then((excel) => {
      //   const header = this.downloadInfo.header;
      //   const filterVal = this.downloadInfo.filterVal;
      //   let fileName = this.downloadInfo.fileName;
      //   const list = this.crud.list;
      //   const data = this.formatJson(filterVal, list);
      //   excel.export_json_to_excel({
      //     header,
      //     data,
      //     filename: fileName,
      //   });
      //   this.downloading = false;
      // });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#compHeadBtn {
  width: 100%;
  margin-top: 20px;
}
</style>
