import { defineStore } from 'pinia';
import { user } from '@/utils/interface'
import { ElNotification } from 'element-plus'
import router from '@/router/index';
import { logins } from '@/api/user'
import cookie from 'js-cookie';
import { Result } from '@/utils/interface'

export const useUserStore = defineStore('user', {
  persist: {
    key: 'user', // 本地存储的名称
    storage: sessionStorage // 本地存储的位置
  },
  state: () => ({
    userInfo: {},
  }),
  actions: {
    async login(userInfo: user) {
      const res: Result = await logins(userInfo)
      if (res.code === '0') {
        this.userInfo = res.msg.userInfo
        cookie.set('token', res.msg.token, { domain: 'localhost' })
        router.push('/home');
      } else {
        ElNotification({
          message: res.msg,
          type: 'error',
        })
      }
    },
    async setComm() {

    },
    async getMenus() {

    }
  }
});
