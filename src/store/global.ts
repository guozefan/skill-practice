import { defineStore } from 'pinia';
import {user} from '@/utils/interface'
import { ElNotification } from 'element-plus'
import router from '@/router/index';

export const global = defineStore('global', {
  state: () => ({
    menuIsCollapse:false,

  }),
  actions: {
    setIsCollapse(val:any){
      this.menuIsCollapse = val;
    },
  }
});
