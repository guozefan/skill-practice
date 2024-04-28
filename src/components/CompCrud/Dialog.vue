<template>
  <div id="dialog">
    <el-dialog v-model="isShowDialog" :width="dialogWidth + '%'" :before-close="crud.cancelCU"
      :close-on-click-modal="false">
      <div class="dialogBox">
        <div class="dialogBox_title boxS">
          <PublicTitle :title="customTitle ? customTitle : crud.status.title" />
          <div class="box">
            <el-button type="primary" @click="crud.submitCU" :loading="crud.status.cu === 2" v-if="(crud.status.add > 0 || crud.status.edit > 0) && isShowDialogConfirmBtn
      " size="mini">确定</el-button>
            <div class="dialogBox_close boxC" @click="crud.cancelCU">关闭</div>
          </div>
        </div>
        <div class="dialogBox_content" v-loading="dialogLoading">
          <!-- 表单slot -->
          <slot name="dialogContent" />
          <!-- 详情slot -->
          <slot name="dialogDetailContent" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PublicTitle from "@/components/PublicTitle";
import { crud } from "@/components/CompCrud/crud";
export default {
  name: "CrudDialog",
  components: {
    PublicTitle: PublicTitle,
  },
  mixins: [crud()],
  props: {
    customTitle: {
      type: String,
      default: "",
    },
    dialogWidth: {
      type: Number,
      default: 50,
    },
    isShowDialogConfirmBtn: {
      type: Boolean,
      default: true,
    },
    dialogLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isShowDialog() {
      return this.crud.status.cu > 0 ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialogBox {
  width: 100%;
  padding-bottom: 70px;

  .dialogBox_title {
    width: 100%;
    padding: 24px;
    padding-left: 14px;

    .dialogBox_close {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .dialogBox_content {
    width: 100%;
    padding: 0 40px;
  }
}
</style>
<style scoped>
#dialog>>>.el-dialog {
  border-radius: 12px;
}

#dialog>>>.el-dialog__body {
  padding: 0;
}

#dialog>>>.el-dialog__header {
  display: none;
}

.dialogBox>>>.input_box {
  width: 350px;
}
</style>
