import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from "@/config/nprogress";
import { useUserStore } from '@/store/user.js';
import {menus} from '@/assets/js/data';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  {
    path: '/login',
    name: 'Login',
    meta: {
			title: "登录"
		},
    component: () => import( '@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'layout',
    meta: {
			title: "首页"
		},
    redirect: '/home/index',
    component: () => import( '@/layout/index.vue'),
    children: []
  },
  {
    path: '/404',
    meta: {
			title: "404"
		},
    component: () => import( '@/views/404/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const addRouter = ()=>{
  const modules = import.meta.glob("@/views/**/*.vue");
  menus.forEach((item:any)=>{
    item.component = modules["/src/views"+item.name+".vue"];
    if(item.children.length){
      item.children.map((subItem:any)=>{
         subItem.component = modules["/src/views"+subItem.name+".vue"];
        router.addRoute('layout',subItem);
      })
    }else{
      router.addRoute('layout',item);
    }

  })
}
addRouter()
// 白名单
const whiteList =['/login'];

router.beforeEach( (to,from,next)=>{
  // 开启进度条
  NProgress.start();

  const { userInfo } = useUserStore();
  if (Object.keys(userInfo).length) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/home' });
    } else {
      // 判断路由是否存在
      if (to.matched.length === 0) {
        next('/404');
      }
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next('/login');
  }

})

// 路由跳转结束
router.afterEach(()=>{
  NProgress.done();
})

// 路由跳转错误
router.onError(error => {
	NProgress.done();
	console.warn("路由错误", error.message);
});


export default router;
