// import { del } from '@/api/system/tenant'

// 下架管理
export const outShelvesQueryItems = [
  { type: 'Input', label: '下架编号', prop: 'InShelvesID' },
  { type: 'Select', label: '仓库编码', prop: 'warehouseID', options: [] },
  // { type: 'Input', label: '设备编号', prop: 'DeviceID' },
  { type: 'Input', label: '载具', prop: 'BoxID' },
  { type: 'Input', label: '任务号', prop: 'TaskId' },
  { type: 'Input', label: '起始位置', prop: 'BeginPostion' },
  { type: 'Input', label: '结束位置', prop: 'EndPostion' },
  { type: 'Select', label: '箱子状态', prop: 'BoxState', options: [] },
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
// AGV任务表
export const agvTaskQueryItems = [
  { type: 'Input', label: '下架编号', prop: 'AGVTaskId' },
  { type: 'Input', label: '仓库编码', prop: 'WarehouseID' },
  { type: 'Input', label: '设备编号', prop: 'DeviceID' },
  { type: 'Input', label: '载具', prop: 'BoxID' },
  { type: 'Input', label: '任务号', prop: 'TaskId' },
  { type: 'Input', label: '起始位置', prop: 'BeginPostion' },
  { type: 'Input', label: '结束位置', prop: 'EndPostion' },
  { type: 'Input', label: '状态', prop: 'BoxState' },
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料描述', prop: 'MaterialDesc' },
  { type: 'Input', label: '物料条码   ', prop: 'Barcode' }
]
// 出库申请单
export const outStockReqQueryItems = [
  // { type: 'Input', label: '工厂', prop: 'WERKS' },
  // { type: 'Input', label: '叫料系统编号', prop: 'SYSNOD' },
  // { type: 'Input', label: '叫料需求号', prop: 'DISPATCHING_NO' },
  // { type: 'Input', label: '叫料行项目', prop: 'DISPATCHING_ITEM_NO' },
  // { type: 'Input', label: '需求行', prop: 'REQUIREMENT_ITEM_NO' },
  { type: 'Select', label: '出库类型', options: [], prop: 'DemandType' },
  { type: 'Input', label: '物料编号', prop: 'MATNR' },
  { type: 'Select', label: '单据状态', options: [], prop: 'DemandStatus' },
  // { type: 'Input', label: '需求数量', prop: 'QTY' },
  // { type: 'Input', label: '业务类型名称   ', prop: 'BUSINESS_NAME' },
  // { type: 'Input', label: '业务类型代码', prop: 'WERKS' },
  // { type: 'Input', label: '叫料站台号', prop: 'WH_NUMBER' },
  // { type: 'Input', label: '条码ID集合', prop: 'BarcodeID' },
  // { type: 'Input', label: '货位', prop: 'SYSNOD' },
  // { type: 'Input', label: '接收库存地点', prop: 'DISPATCHING_NO' },
  // { type: 'Select', label: '是否拆分', prop: 'DISPATCHING_ITEM_NO', options: [] },
  // { type: 'Input', label: '批次', prop: 'REQUIREMENT_ITEM_NO' },
  { type: 'Input', label: '需求数量', prop: 'QTY' },
  { type: 'Input', label: '已反馈出库数量', prop: 'ReportOutQty' },
  { type: 'Input', label: '需求号', prop: 'REQUIREMENT_NO' },
  // {
  //   type: 'Input',
  //   label: '仓库编号（系统标识）',
  //   prop: 'WH_NUMBER',
  //   width: '400px'
  // },
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
  },
  { type: 'Select', label: '仓库编号（本地）', prop: 'WarehouseID', options: [{ label: 'DL', value: 'DL' }, { label: 'XL', value: 'XL' }] }
]

export const ReportsCrud = {
  download: 'any'
}

// 出库需求单
export const outStockRequestQueryItems = [
  { type: 'Input', label: '仓库编码', prop: 'WarehouseID' },
  { type: 'Input', label: '需求单号', prop: 'REQUIREMENT_No' },
  { type: 'Input', label: '物料编码', prop: 'MATNR' },
  { type: 'Input', label: '批次', prop: 'BATCH' },
  { type: 'Input', label: '需求单类型', prop: 'DemandType' },
  { type: 'Input', label: '需求单状态', prop: 'DemandStatus' },
  { type: 'Input', label: '需求数量', prop: 'QTY' },
  { type: 'Input', label: '已反馈出库数量', prop: 'ReportOutQty' }
]
export const outStockRequestCrud = {}
