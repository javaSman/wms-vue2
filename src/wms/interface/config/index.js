// 接口配置
export const queryItems = [
  { type: 'Input', label: '接口名称', prop: 'APIName' },
  { type: 'Input', label: '接口地址', prop: 'URL' },
  { type: 'Input', label: '接口签名', prop: 'APISign' }
]

export const formList = [
  {
    type: 'Input',
    label: '接口名称',
    prop: 'apiName',
    rules: [{ required: true, message: '请输入接口名称', trigger: 'blur' }]
  },
  { type: 'Input', label: '接口地址', prop: 'url' },
  { type: 'Input', label: '接口签名', prop: 'apiSign' },

  { type: 'Input', label: '访问方式', prop: 'httpMethod' },
  { type: 'Input', label: '文本类型', prop: 'mediaType' },
  { type: 'Input', label: '请求参数', prop: 'parameters' }
]

export const configureCrud = {
  add: 'any',
  edit: 'any',
  del: 'any'
  // add: 'APIManagement.APIConfig.Create',
  // edit: 'APIManagement.APIConfig.Update',
  // del: 'APIManagement.APIConfig.Delete'
}
export const journalBtnItems = [
  {
    // 重发
    langLabel: 'button.retransmission',
    clickFun: 'toretransmission',
    disabled: 'single',
    permission: 'APIManagement.APILog',
    styleType: 'danger',
    icon: 'el-icon-finished',
    loading: false
  },
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: '',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
]
// 接口日志
export const journalQueryItems = [
  { type: 'Input', label: '接口名称', prop: 'APIName' },
  { type: 'Selects', label: '处理状态', prop: 'IsSuccess', options: [] },
  { type: 'Input', label: '请求参数', prop: 'Parameters' },
  { type: 'Input', label: '结果', prop: 'Result' },
  { type: 'DateTime', label: '开始时间', prop: 'BeginApplyDate' },
  { type: 'DateTime', label: '结束时间', prop: 'EndApplyDate' }

  // { type: 'Input', label: '接口签名', prop: 'APISign' }
]

export const journalFormList = [
  {
    type: 'Input',
    label: '接口名称',
    prop: 'apiName',
    rules: [{ required: true, message: '请输入接口名称', trigger: 'blur' }]
  },
  { type: 'Input', label: '接口地址', prop: 'url' },
  { type: 'Input', label: '接口签名', prop: 'apiSign' },
  { type: 'Input', label: '访问方式', prop: 'httpMethod' },
  { type: 'Input', label: '请求参数', prop: 'parameters' },
  { type: 'Input', label: '结果', prop: 'result' },
  { type: 'Input', label: '异常', prop: 'exceptions' },
  { type: 'DateTime', label: '开始时间', prop: 'beginTime' },
  { type: 'DateTime', label: '结束时间', prop: 'endTime' }
]

export const journalCrud = {
  // add: 'any',
  // edit: 'any',
  // del: 'any'
}
