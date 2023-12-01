// 空托盘报表查询
export const receiptReportItems = [
  { type: 'BatchInput', label: '载具编号', prop: 'boxNo' },
  { type: 'Select', label: '载具类型', prop: 'boxType', options: [] },
  { type: 'Input', label: '储位编码', prop: 'locationNo' },
  { type: 'Select', label: '仓库编码', prop: 'WarehouseNo', options: [] },
  { type: 'Select', label: '状态', prop: 'Position', options: [] }
]

export const BtnItems = [
  // {
  //   // 导出
  //   langLabel: 'button.export',
  //   clickFun: 'toDownload',
  //   disabled: '',
  //   permission: '',
  //   styleType: 'warning',
  //   icon: 'el-icon-download'
  // },
  {
    /* 下架 */
    langLabel: 'button.offShelf',
    clickFun: 'toOffShelf',
    disabled: '',
    permission: 'Report.BlankReport.BatchOutShelves',
    styleType: 'danger',
    icon: ''
  }
]
// 空托盘报表下架
export const configFormList = [
  {
    type: 'Select',
    label: '仓库编码',
    prop: 'warehouse',
    options: [],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '码头',
    prop: 'wharfNo',
    options: [],
    rules: [{ required: true, message: '请选择码头', trigger: 'blur' }]
  }
]
