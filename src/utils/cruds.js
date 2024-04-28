import { reactive, ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';

/**
 * CRUD配置
 * @author moxun
 * @param {*} options <br>
 * @return crud instance.
 * @example
 * 要使用多crud时，请在关联crud的组件处使用crud-tag进行标记，如：<jobForm :job-status="dict.job_status" crud-tag="job" />
 */

let crud:any = {}


function CRUD(options: any) {
  const defaultOptions = {
    tag: 'default',
    // id字段名
    idField: 'id',
    // 标题
    title: '',
    // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
    sort: 'id,desc',
    // 请求数据的url
    getListUrl: '',
    // 每页数据条数
    pageSize: 20,
    // 表格数据
    list: [],
    // 选择项
    selections: [],
    // 待查询的对象
    query: {},
    // 查询数据的参数
    params: {},
    // Form 表单
    form: {},
    // 重置表单
    defaultForm: () => { },
    // 等待时间
    time: 50,
    // CRUD Method
    crudMethod: {
      add: (form: any) => { },
      del: (id: number | String) => { },
      edit: (form: any) => { },
      get: (id: number | String) => { }
    },
    // 主页操作栏显示哪些按钮
    optShow: {
      add: true,
      edit: true,
      del: true,
      download: false,
      reset: true
    },
    // 在主页准备
    queryOnPresenterCreated: true,
    // 自定义一些扩展属性
    props: {},
  }
  options = mergeOptions(defaultOptions, options)
  const data = {
    ...options,
    // 记录数据状态
    dataStatus: {},
    status: {
      add: CRUD.STATUS.NORMAL,
      edit: CRUD.STATUS.NORMAL,
      detail: CRUD.STATUS.NORMAL,
      // 添加或编辑状态
      get cu() {
        if (this.add === CRUD.STATUS.NORMAL && this.edit === CRUD.STATUS.NORMAL && this.detail === CRUD.STATUS.NORMAL) {
          return CRUD.STATUS.NORMAL
        } else if (this.add === CRUD.STATUS.PREPARED || this.edit === CRUD.STATUS.PREPARED || this.detail === CRUD.STATUS.PREPARED) {
          return CRUD.STATUS.PREPARED
        } else if (this.add === CRUD.STATUS.PROCESSING || this.edit === CRUD.STATUS.PROCESSING || this.detail === CRUD.STATUS.PROCESSING) {
          return CRUD.STATUS.PROCESSING
        }
        throw new Error('wrong crud\'s cu status')
      },
      // 标题
      get title() {
        return this.add > CRUD.STATUS.NORMAL ? `新增${crud.title}` : this.edit > CRUD.STATUS.NORMAL ? `编辑${crud.title}` : this.detail > CRUD.STATUS.NORMAL ? `${crud.title}详情` : crud.title
      }
    },
    msg: {
      submit: '提交成功',
      add: '新增成功',
      edit: '编辑成功',
      del: '删除成功'
    },
    // 页码
    currentPage: 1,
    // 总数据条数
    total: 0,
    // 整体loading
    listLoading: false,
    // 导出的 Loading
    downloadLoading: false,
    // 删除的 Loading
    delAllLoading: false
  }
  crud = Object.assign({}, data)

  const methods = {
    /**
     * 通用的提示
     */
    submitSuccessNotify() {
      crud.notify(crud.msg.submit, CRUD.NOTIFICATION_TYPE.SUCCESS)
    },
    addSuccessNotify() {
      crud.notify(crud.msg.add, CRUD.NOTIFICATION_TYPE.SUCCESS)
    },
    editSuccessNotify() {
      crud.notify(crud.msg.edit, CRUD.NOTIFICATION_TYPE.SUCCESS)
    },
    delSuccessNotify() {
      crud.notify(crud.msg.del, CRUD.NOTIFICATION_TYPE.SUCCESS)
    },
    // 获取标题
    getPageTitle() {
      return this.title
    },
    // 搜索
    toQuery() {
      console.log(crud)
      crud.currentPage = 1
      // 回传筛选参数
      callVmHook(crud, CRUD.HOOK.searchQuery, crud.getQueryParams());
      crud.refresh()
    },
    // 刷新
    refresh() {
      if (!callVmHook(crud, CRUD.HOOK.beforeRefresh)) {
        return
      }
      return new Promise((resolve, reject) => {
        crud.listLoading = true
        // 请求数据
        crud.crudMethod.get(crud.getQueryParams()).then(res => {
          const table = crud.getTable()
          if (table && table.lazy) { // 懒加载子节点数据，清掉已加载的数据
            table.store.states.treeData = {}
            table.store.states.lazyTreeNodeMap = {}
          }
          const {
            list,
            total
          } = res.data;
          crud.total = total
          crud.list = list
          crud.resetDataStatus()
          // time 毫秒后显示表格
          setTimeout(() => {
            crud.listLoading = false
            callVmHook(crud, CRUD.HOOK.afterRefresh)
          }, crud.time)
          // 过滤列表数据
          callVmHook(crud, CRUD.HOOK.filterListData, res.data);
          resolve(res)
        }).catch(err => {
          crud.listLoading = false
          reject(err)
        })
      })
    },
    /**
     * 查看详情
     */
    toShowDetail(data) {
      if (!callVmHook(crud, CRUD.HOOK.beforeToShowDetail, data)) {
        return
      }
      crud.status.detail = CRUD.STATUS.PREPARED
      callVmHook(crud, CRUD.HOOK.afterToShowDetail, data)
    },
    /**
     * 启动添加
     */
    toAdd() {
      crud.resetForm()
      if (!(callVmHook(crud, CRUD.HOOK.beforeToAdd, crud.form) && callVmHook(crud, CRUD.HOOK.beforeToCU, crud.form))) {
        return
      }
      crud.status.add = CRUD.STATUS.PREPARED
      callVmHook(crud, CRUD.HOOK.afterToAdd, crud.form)
      callVmHook(crud, CRUD.HOOK.afterToCU, crud.form)
    },
    /**
     * 启动编辑
     * @param {*} data 数据项
     */
    toEdit(data) {
      crud.resetForm(JSON.parse(JSON.stringify(data)))
      if (!(callVmHook(crud, CRUD.HOOK.beforeToEdit, crud.form) && callVmHook(crud, CRUD.HOOK.beforeToCU, crud.form))) {
        return
      }
      crud.status.edit = CRUD.STATUS.PREPARED
      crud.getDataStatus(crud.getDataId(data)).edit = CRUD.STATUS.PREPARED
      callVmHook(crud, CRUD.HOOK.afterToEdit, crud.form)
      callVmHook(crud, CRUD.HOOK.afterToCU, crud.form)
    },
    /**
     * 启动删除
     * @param {*} data 数据项
     */
    toDelete(data) {
      crud.getDataStatus(crud.getDataId(data)).delete = CRUD.STATUS.PREPARED
    },
    /**
     * 取消删除
     * @param {*} data 数据项
     */
    cancelDelete(data) {
      if (!callVmHook(crud, CRUD.HOOK.beforeDeleteCancel, data)) {
        return
      }
      crud.getDataStatus(crud.getDataId(data)).delete = CRUD.STATUS.NORMAL
      callVmHook(crud, CRUD.HOOK.afterDeleteCancel, data)
    },
    /**
     * 取消新增/编辑
     */
    cancelCU() {
      const addStatus = crud.status.add
      const editStatus = crud.status.edit
      const detailStatus = crud.status.detail
      if (addStatus === CRUD.STATUS.PREPARED) {
        if (!callVmHook(crud, CRUD.HOOK.beforeAddCancel, crud.form)) {
          return
        }
        crud.status.add = CRUD.STATUS.NORMAL
      }
      if (editStatus === CRUD.STATUS.PREPARED) {
        if (!callVmHook(crud, CRUD.HOOK.beforeEditCancel, crud.form)) {
          return
        }
        crud.status.edit = CRUD.STATUS.NORMAL
        crud.getDataStatus(crud.getDataId(crud.form)).edit = CRUD.STATUS.NORMAL
      }
      // 只有新建或编辑时才resetForm，否则控制台报错。
      if (detailStatus !== CRUD.STATUS.PREPARED) {
        crud.resetForm()
      }
      if (detailStatus === CRUD.STATUS.PREPARED) {
        crud.status.detail = CRUD.STATUS.NORMAL
      }
      if (addStatus === CRUD.STATUS.PREPARED) {
        callVmHook(crud, CRUD.HOOK.afterAddCancel, crud.form)
      }
      if (editStatus === CRUD.STATUS.PREPARED) {
        callVmHook(crud, CRUD.HOOK.afterEditCancel, crud.form)
      }
      if (detailStatus === CRUD.STATUS.PREPARED) {
        callVmHook(crud, CRUD.HOOK.afterDetailCancel)
      }
      // 只有新建或编辑时才清除表单验证，否则控制台报错。
      if (detailStatus !== CRUD.STATUS.PREPARED) {
        // 清除表单验证
        if (crud.findVM('form').$refs['form']) {
          crud.findVM('form').$refs['form'].clearValidate()
        }
      }
    },
    /**
     * 提交新增/编辑
     */
    submitCU() {
      if (!callVmHook(crud, CRUD.HOOK.beforeValidateCU)) {
        return
      }
      crud.findVM('form').$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        if (!callVmHook(crud, CRUD.HOOK.afterValidateCU, crud.form)) {
          return
        }
        // 提交表单时，将null或者undefined的字段改为"",否则验签报错。
        Object.keys(crud.form).map((key) => {
          if (crud.form[key] === null || crud.form[key] === undefined) {
            crud.form[key] = "";
          }
        });
        if (crud.status.add === CRUD.STATUS.PREPARED) {
          crud.doAdd()
        } else if (crud.status.edit === CRUD.STATUS.PREPARED) {
          crud.doEdit()
        }
      })
    },
    /**
     * 执行添加
     */
    doAdd() {
      if (!callVmHook(crud, CRUD.HOOK.beforeSubmit)) {
        return
      }
      crud.status.add = CRUD.STATUS.PROCESSING
      crud.crudMethod.add(crud.form).then((res) => {
        crud.status.add = CRUD.STATUS.NORMAL
        crud.resetForm()
        crud.addSuccessNotify()
        callVmHook(crud, CRUD.HOOK.afterSubmit, res)
        crud.toQuery()
      }).catch(() => {
        crud.status.add = CRUD.STATUS.PREPARED
        callVmHook(crud, CRUD.HOOK.afterAddError)
      })
    },
    /**
     * 执行编辑
     */
    doEdit() {
      if (!callVmHook(crud, CRUD.HOOK.beforeSubmit)) {
        return
      }
      crud.status.edit = CRUD.STATUS.PROCESSING
      crud.crudMethod.edit(crud.form).then((res) => {
        crud.status.edit = CRUD.STATUS.NORMAL
        crud.getDataStatus(crud.getDataId(crud.form)).edit = CRUD.STATUS.NORMAL
        crud.editSuccessNotify()
        crud.resetForm()
        callVmHook(crud, CRUD.HOOK.afterSubmit, res)
        crud.refresh()
      }).catch((err) => {
        crud.status.edit = CRUD.STATUS.PREPARED
        callVmHook(crud, CRUD.HOOK.afterEditError)
      })
    },
    /**
     * 执行删除
     * @param {*} data 数据项
     */
    doDelete(data, params) {
      let delAll = false
      let dataStatus
      const ids = []
      let idsSingle = {};
      if (data instanceof Array) {
        delAll = true
        data.forEach(val => {
          ids.push(this.getDataId(val))
        })
      } else {
        // ids.push(this.getDataId(data))
        idsSingle = Object.assign({}, idsSingle, params)
        idsSingle[this.idField] = this.getDataId(data)
        dataStatus = crud.getDataStatus(this.getDataId(data))
      }
      if (!callVmHook(crud, CRUD.HOOK.beforeDelete, data)) {
        return
      }
      if (!delAll) {
        dataStatus.delete = CRUD.STATUS.PROCESSING
      }
      return crud.crudMethod.del(delAll ? JSON.stringify(ids) : idsSingle).then(() => {
        if (delAll) {
          crud.delAllLoading = false
        } else dataStatus.delete = CRUD.STATUS.PREPARED
        crud.dleChangePage(1)
        crud.delSuccessNotify()
        callVmHook(crud, CRUD.HOOK.afterDelete, data)
        crud.refresh()
      }).catch(() => {
        if (delAll) {
          crud.delAllLoading = false
        } else dataStatus.delete = CRUD.STATUS.PREPARED
      })
    },
    /**
     * 获取查询参数
     */
    getQueryParams: function () {
      // 清除参数无值的情况，并且去除前后空格，以免验签校验不通过
      Object.keys(crud.query).length !== 0 && Object.keys(crud.query).forEach(item => {
        if (crud.query[item] === null || crud.query[item] === '') {
          crud.query[item] = ''
        } else if (typeof crud.query[item] === 'string') {
          crud.query[item] = myTrim(crud.query[item]);
        } else {
          crud.query[item] = crud.query[item]
        }
      })
      Object.keys(crud.params).length !== 0 && Object.keys(crud.params).forEach(item => {
        if (crud.params[item] === null || crud.params[item] === '') {
          crud.params[item] = ''
        } else if (typeof crud.params[item] === 'string') {
          crud.params[item] = myTrim(crud.params[item]);
        } else {
          crud.params[item] = crud.params[item]
        }
      })
      return {
        page: crud.currentPage,
        size: crud.pageSize,
        sort: crud.sort,
        ...crud.query,
        ...crud.params
      }
    },
    // 当前页改变
    pageChangeHandler(e) {
      crud.currentPage = e
      crud.refresh()
    },
    // 每页条数改变
    sizeChangeHandler(e) {
      crud.pageSize = e
      crud.currentPage = 1
      crud.refresh()
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage(size) {
      if (crud.list.length === size && crud.currentPage !== 1) {
        crud.currentPage = 1
      }
    },
    // 选择改变
    selectionChangeHandler(val) {
      callVmHook(crud, CRUD.HOOK.getSelectionsData, val)
      crud.selections = val
    },
    /**
     * 重置查询参数
     * @param {Boolean} toQuery 重置后进行查询操作
     */
    resetQuery(toQuery = true) {
      if (!callVmHook(crud, CRUD.HOOK.beforeResetQuery, crud.defaultQuery)) {
        return
      }
      const defaultQuery = JSON.parse(JSON.stringify(crud.defaultQuery))
      const query = crud.query
      Object.keys(query).forEach(key => {
        query[key] = defaultQuery[key] || ""
      })
      // 重置参数
      crud.params = {}
      if (toQuery) {
        crud.toQuery()
      }
    },
    /**
     * 重置表单
     * @param {Array} data 数据
     */
    resetForm(data) {
      const form = data || (typeof crud.defaultForm === 'object' ? JSON.parse(JSON.stringify(crud.defaultForm)) : crud.defaultForm.apply(crud.findVM('form')))
      const crudFrom = crud.form
      for (const key in form) {
        if (crudFrom.hasOwnProperty(key)) {
          crudFrom[key] = form[key]
        } else {
          crudFrom[key] = form[key]
        }
      }
      // add by ghl 2020-10-04  页面重复添加信息时，下拉框的校验会存在，需要找工取消
      if (crud.findVM('form').$refs['form']) {
        crud.findVM('form').$refs['form'].clearValidate()
      }
    },
    /**
     * 重置数据状态
     */
    resetDataStatus() {
      const dataStatus = {}

      function resetStatus(datas) {
        datas.forEach(e => {
          dataStatus[crud.getDataId(e)] = {
            delete: 0,
            edit: 0
          }
          if (e.children) {
            resetStatus(e.children)
          }
        })
      }
      resetStatus(crud.list)
      crud.dataStatus = dataStatus
    },
    /**
     * 获取数据状态
     * @param {Number | String} id 数据项id
     */
    getDataStatus(id) {
      return crud.dataStatus[id]
    },
    findVM(type) {
      return crud.vms.find(vm => vm && vm.type === type).vm
    },
    notify(title, type = CRUD.NOTIFICATION_TYPE.INFO) {
      crud.vms[0].vm.$notify({
        title,
        type,
        duration: 2500
      })
    },
    updateProp(name, value) {
      crud.props[name] = value
    },
    getDataId(data) {
      return data[this.idField]
    },
    getTable() {
      return this.findVM('presenter').$refs.table
    },
    attchTable() {
      const table = this.getTable()
      this.updateProp('table', table)
      const that = this
      table.$on('expand-change', (row, expanded) => {
        if (!expanded) {
          return
        }
        const lazyTreeNodeMap = table.store.states.lazyTreeNodeMap
        row.children = lazyTreeNodeMap[crud.getDataId(row)]
        if (row.children) {
          row.children.forEach(ele => {
            const id = crud.getDataId(ele)
            if (that.dataStatus[id] === undefined) {
              that.dataStatus[id] = {
                delete: 0,
                edit: 0
              }
            }
          })
        }
      })
    }
  }

}







function mergeOptions(src: any, opts: any) {
  const optsRet = {
    ...src
  }
  for (const key in src) {
    if (opts.hasOwnProperty(key)) {
      optsRet[key] = opts[key]
    }
  }
  return optsRet
}


/**
 * CRUD钩子
 */
CRUD.HOOK = {
  /** 刷新 - 之前 */
  beforeRefresh: 'beforeCrudRefresh',
  /** 刷新 - 之后 */
  afterRefresh: 'afterCrudRefresh',
  /** 过滤列表数据 */
  filterListData: 'filterListData',
  /** 重置筛选参数之前 */
  beforeResetQuery: 'beforeResetQuery',
  getSelectionsData: 'getSelectionsData',
  /** 查看详情 - 之前 */
  beforeToShowDetail: 'beforeToShowDetail',
  /** 查看详情 - 之后 */
  afterToShowDetail: 'afterToShowDetail',
  /** 删除 - 之前 */
  beforeDelete: 'beforeCrudDelete',
  /** 删除 - 之后 */
  afterDelete: 'afterCrudDelete',
  /** 删除取消 - 之前 */
  beforeDeleteCancel: 'beforeCrudDeleteCancel',
  /** 删除取消 - 之后 */
  afterDeleteCancel: 'afterCrudDeleteCancel',
  /** 新建 - 之前 */
  beforeToAdd: 'beforeCrudToAdd',
  /** 新建 - 之后 */
  afterToAdd: 'afterCrudToAdd',
  /** 编辑 - 之前 */
  beforeToEdit: 'beforeCrudToEdit',
  /** 编辑 - 之后 */
  afterToEdit: 'afterCrudToEdit',
  /** 开始 "新建/编辑" - 之前 */
  beforeToCU: 'beforeCrudToCU',
  /** 开始 "新建/编辑" - 之后 */
  afterToCU: 'afterCrudToCU',
  /** "新建/编辑" 验证 - 之前 */
  beforeValidateCU: 'beforeCrudValidateCU',
  /** "新建/编辑" 验证 - 之后 */
  afterValidateCU: 'afterCrudValidateCU',
  /** 添加取消 - 之前 */
  beforeAddCancel: 'beforeCrudAddCancel',
  /** 添加取消 - 之后 */
  afterAddCancel: 'afterCrudAddCancel',
  /** 编辑取消 - 之前 */
  beforeEditCancel: 'beforeCrudEditCancel',
  /** 编辑取消 - 之后 */
  afterEditCancel: 'afterCrudEditCancel',
  /** 详情取消 - 之后 */
  afterDetailCancel: 'afterDetailCancel',
  /** 提交 - 之前 */
  beforeSubmit: 'beforeCrudSubmitCU',
  /** 提交 - 之后 */
  afterSubmit: 'afterCrudSubmitCU',
  afterAddError: 'afterCrudAddError',
  afterEditError: 'afterCrudEditError'
}
/**
 * CRUD状态
 */
CRUD.STATUS = {
  NORMAL: 0,
  PREPARED: 1,
  PROCESSING: 2
}

/**
 * CRUD通知类型
 */
CRUD.NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  ERROR: 'error'
}
export default CRUD
export {
  presenter,
  header,
  form,
  crud
}
