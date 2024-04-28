import { defineStore } from 'pinia';
import {user} from '@/utils/interface'
import { ElNotification } from 'element-plus'
import router from '@/router/index';

export const model = defineStore('model', {
  state: () => ({
    dom_wh:0,
    dom_ht:0
  }),
  actions: {
    setDomSize({wh,ht}:{wh:number,ht:number}){
      this.dom_wh = wh
      this.dom_ht = ht
    },
  }
});
