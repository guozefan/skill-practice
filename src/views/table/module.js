import {
  tableList
} from '@/assets//js/table.js';

let list = tableList

export function get(data) {
  return new Promise((resolve, reject) => {
    resolve({
      list,
      total: list.length
    });
  })
}

// 新建模块
export function add(data) {
  return new Promise((resolve, reject) => {
    list.push(data)
    resolve({
      code: 0,
      data: [],
      message: 'success'
    });
  })
}


// 删除模块
export function del(data) {
  return new Promise((resolve, reject) => {
    list.map((item, index) => {
      if (item.id === data.id) {
        list.splice(index, 1)
      }
    })
    list.push(data)
    resolve({
      code: 0,
      data: [],
      message: 'success'
    });
  })
}

// 更新模块信息
export function edit(data) {
  return new Promise((resolve, reject) => {
    list = list.map((item, index) => {
      if (item.id === data.id) {
        item = data
      }
      return item
    })
    list.push(data)
    resolve({
      code: 0,
      data: [],
      message: 'success'
    });
  })
}
export default {
  get,
  add,
  edit,
  del
}
