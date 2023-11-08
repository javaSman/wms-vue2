// 上架管理
export const inShelvesQueryItems = [
  { type: 'Input', label: '上架编号', prop: 'InShelvesID' },
  { type: 'Select', label: '仓库编码', prop: 'warehouseID', options: [] },
  // { type: 'Input', label: '设备编号', prop: 'DeviceID' },
  { type: 'Input', label: '载具', prop: 'BoxID' },
  { type: 'Input', label: '任务号', prop: 'TaskId' },
  { type: 'Input', label: '起始位置', prop: 'BeginPostion' },
  { type: 'Input', label: '结束位置', prop: 'EndPostion' },
  { type: 'Select', label: '载具状态', prop: 'BoxState', options: [] },
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料描述', prop: 'MaterialDesc' },
  { type: 'Input', label: '物料条码   ', prop: 'Barcode' },
  { type: 'Input', label: '批次号查询', prop: 'Batch' },
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'CreationTimeStart',
    endProp: 'CreationTimeEnd',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择创建时间', trigger: 'blur' }],
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  },
  {
    type: 'DateRangePart',
    label: '更新时间',
    // prop: 'registrationEndTime',
    startProp: 'LastModificationTimeStart',
    endProp: 'LastModificationTimeEnd',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择更新时间', trigger: 'blur' }],
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
export const ReportsCrud = {
  download: 'any'
}
