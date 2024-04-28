import axios from 'axios';
import { ElMessage } from 'element-plus';
import cookie from 'js-cookie';

const $http = axios.create({
  timeout: 1000 * 60 * 3
});

$http.defaults.headers.post = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};


// 添加请求拦截器(post只能接受字符串类型数据)
$http.interceptors.request.use(
  (config) => {
    if (cookie.get('token')) {
      config.headers.Authorization = cookie.get('token')
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 添加响应拦截器
$http.interceptors.response.use(
  // 响应包含以下信息data,status,statusText,headers,config
  (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  (err) => {
    ElMessage.error(err);
    const { response } = err;
    if (response) {
      ElMessage.error(response.data.msg);
      return Promise.reject(response);
    }
    ElMessage.error('请求失败');
    return true;
  }
);

export default {
  get(url: string, params: any) {
    return new Promise((resolve, reject) => {
      $http
        .get(url, {
          params
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  export(url: string) {
    return new Promise((resolve, reject) => {
      $http
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  post(url: string, params: any) {
    return new Promise((resolve, reject) => {
      $http({
        method: 'post',
        url,
        data: params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  postFormData(url: string, params: any) {
    return new Promise((resolve, reject) => {
      $http
        .post(url, params, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }
};


