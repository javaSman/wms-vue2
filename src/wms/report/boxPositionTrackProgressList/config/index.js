// 补货报表查询
export const queryItems = [
  { type: 'Input', label: '箱子号', prop: 'BoxNo' },
  { type: 'Select', label: '类型', prop: 'Type', options: [] },
  {
    type: 'DateRangePart',
    label: '创建时间',
    startProp: 'BeginCreateTime',
    endProp: 'EndCreateTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    // startDefaultTime: '08:00:00',
    // endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择创建时间', trigger: 'blur' }],
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  },
  { type: 'Input', label: '码头', prop: 'WharfID' }
]
export const BtnItems = [
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
