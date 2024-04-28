<template>
  <div class="login">
    <div class="login_title">
      <h2>今天的你是否依旧光芒万丈呀！</h2>
      <p>本项目采用Vue3、TS、Three、qiankun(微前端)、Pinia、Element-Plus开发,欢迎指导</p>
      <video id="player" width="460" height="340" playsinline controls
        data-poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg">
        <source src="" type="video/mp4">
        您的浏览器不支持 video 标签。
      </video>
    </div>

    <div class="login_from">
      <div>
        <h3>后台管理系统</h3>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="账号:" prop="userName">
            <el-input v-model.number="ruleForm.userName">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <i-ep-user />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="passWord">
            <el-input v-model="ruleForm.passWord" type="passWord" autocomplete="off">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <i-ep-Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/store/user'
import Plyr from 'plyr';


const UserStore = useUserStore();
const ruleFormRef = ref<FormInstance>()

const validateUser = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else {
    callback();
  }
};
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (!/^(\w){4,99}$/.exec(value)) {
    callback(new Error('只能输入4-20个字母、数字、下划线'));
  } else {
    callback();
  }
};
const loading = ref(false);
const ruleForm = reactive({
  userName: 'admin',
  passWord: '123456',
})

const rules = reactive({
  userName: [{ validator: validateUser, trigger: 'blur' }],
  passWord: [{ validator: validatePass, trigger: 'blur' }],
})

onMounted(() => {
  const player = new Plyr('#player');
  document.onkeydown = (event) => {
    const e: any = window.event || event;
    if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
      if (loading.value) return;
      submitForm(ruleFormRef.value);
    }
  };
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) return
    loading.value = true;
    try {
      UserStore.login(ruleForm);
    } finally {
      loading.value = false;
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  // background-image: linear-gradient(160deg, rgba(163, 163, 163, .09) 0%, rgba(163, 163, 163, .09) 33.3%, rgba(100, 100, 100, .09) 33.3%, rgba(100, 100, 100, .09) 66.6%, rgba(162, 162, 162, .09) 66.6%, rgba(162, 162, 162, .09) 99%), linear-gradient(366deg, rgba(193, 193, 193, .06) 0%, rgba(193, 193, 193, .06) 33.3%, rgba(169, 169, 169, .06) 33.3%, rgba(169, 169, 169, .06) 66.6%, rgba(92, 92, 92, .06) 66.6%, rgba(92, 92, 92, .06) 99%), linear-gradient(237deg, rgba(45, 45, 45, .03) 0%, rgba(45, 45, 45, .03) 33.3%, rgba(223, 223, 223, .03) 33.3%, rgba(223, 223, 223, .03) 66.6%, rgba(173, 173, 173, .03) 66.6%, rgba(173, 173, 173, .03) 99%), linear-gradient(388deg, rgba(226, 226, 226, .06) 0%, rgba(226, 226, 226, .06) 33.3%, rgba(81, 81, 81, .06) 33.3%, rgba(81, 81, 81, .06) 66.6%, rgba(186, 186, 186, .06) 66.6%, rgba(186, 186, 186, .06) 99%), linear-gradient(193deg, rgba(225, 225, 225, .04) 0%, rgba(225, 225, 225, .04) 33.3%, rgba(95, 95, 95, .04) 33.3%, rgba(95, 95, 95, .04) 66.6%, rgba(39, 39, 39, .04) 66.6%, rgba(39, 39, 39, .04) 99%), linear-gradient(236deg, rgba(184, 184, 184, .06) 0%, rgba(184, 184, 184, .06) 33.3%, rgba(0, 0, 0, .06) 33.3%, rgba(0, 0, 0, .06) 66.6%, rgba(140, 140, 140, .06) 66.6%, rgba(140, 140, 140, .06) 99.9%), linear-gradient(431deg, rgba(40, 40, 40, .07) 0%, rgba(40, 40, 40, .07) 33.3%, rgba(214, 214, 214, .07) 33.3%, rgba(214, 214, 214, .07) 66.6%, rgba(190, 190, 190, .07) 66.6%, rgba(190, 190, 190, .07) 99.9%), linear-gradient(169deg, rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%, rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%, rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%), linear-gradient(108deg, rgb(38, 38, 227), rgb(11, 186, 239));

  .login_title {
    width: 600px;
    position: relative;
    left: 10%;
    top: 15%;

    h2 {
      font-size: 46px;
      line-height: 56px;
      margin-bottom: 40px;
    }

    p {
      font-size: 24px;
      line-height: 44px;
    }
  }

  .login_from {
    position: absolute;
    right: 10%;
    top: 0;
    height: 100%;
    width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;

    >div {
      background-color: #a0cfff;
      border-radius: 6px;
      padding: 20px;
      padding-top: 50px;

      h3 {
        text-align: center;
        font-size: 28px;
        margin-bottom: 20px;
      }
    }

    .el-form {
      padding-left: 0;
      padding-right: 60px;
      padding-bottom: 0;

      .el-form-item {
        margin-bottom: 40px;
      }

      .el-form-item:nth-child(2) {
        margin-bottom: 50px;
      }

      ::v-deep .el-form-item:nth-child(3) .el-form-item__content {
        justify-content: center;
      }
    }
  }
}
</style>
