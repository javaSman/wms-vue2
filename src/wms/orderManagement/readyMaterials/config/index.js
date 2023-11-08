// 备料单管理
export const readyMaterialsQueryItems = [
  // { type: 'Input', label: '项目编号', prop: 'ProjectID' },
  // { type: 'Input', label: '工位号', prop: 'StationID' },
  // { type: 'Input', label: '物料编号', prop: 'Material' },
  { type: 'Select', label: '状态', prop: 'StatusID', options: [] },
  { type: 'BatchInput', label: '备料单号', prop: 'PickingNo', width: '178px' },
  { type: 'Select', label: '仓库编号', prop: 'WarehouseNo', options: [] }
  // { type: 'BatchInput', label: '订单号', prop: 'OrderID', width: '178px' }
]
// 叫料单管理
export const callMaterialQueryItems = [
  { type: 'Input', label: '备料单号', prop: 'ReadyMaterialsID' },
  { type: 'Input', label: '订单号', prop: 'OrderID' },
  { type: 'Input', label: '条码', prop: 'Barcode' },
  { type: 'Input', label: '项目编号', prop: 'ProjectID' },
  { type: 'Input', label: '工位号', prop: 'StationID' },
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '批次号', prop: 'BatchID' },
  { type: 'Input', label: '制单号状态', prop: 'MakingStatus' },
  { type: 'Input', label: '工厂', prop: 'Werks' },
  { type: 'Select', label: '叫料状态', prop: 'statusID', options: [] },
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
  }
]
// 下架 -下料位置选中
export const outShelvesForm = [
  // {
  //   type: 'Select',
  //   prop: 'deliverLocation',
  //   label: '下料位置',
  //   options: [],
  //   rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  // }
  {
    type: 'Select',
    label: '仓库编码',
    prop: 'warehouseNo',
    options: [],
    rules: [{ required: true, message: '请输入仓库', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '码头',
    prop: 'WharfID',
    options: [],
    rules: [{ required: true, message: '请选择码头', trigger: 'blur' }]
  }
]
// 叫料
export const formList = [{ type: 'Select', label: 'AGV点位', prop: 'locationID' }]
// 打印-表单
export const printForm = [
  {
    type: 'Select',
    label: '配送区域',
    prop: 'deliveryArea',
    options: []
    // rules: [{ required: true, message: '请选择配送区域', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '发出区域',
    prop: 'initialArea',
    options: []
    // rules: [{ required: true, message: '请选择发出区域', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '物料类别',
    prop: 'materialType',
    options: []
    // rules: [{ required: true, message: '请选择物料类别', trigger: 'blur' }]
  }
]

// 权限
// 出库单按钮权限
export const outStockCrud = {
  add: 'OutStock.OutStockHeader.Create',
  edit: 'OutStock.OutStockHeader.Update',
  del: 'OutStock.OutStockHeader.Delete'
}

// 备料单明细表按钮权限
export const readyMaterialsCrud = {
  print: 'OutStock.ReadyMaterials.Create'
}
// 叫料单管理，非标按钮
export const callMaterialBtnItems = [
  {
    // 叫料
    langLabel: 'button.callReadyMaterials',
    clickFun: 'toCallReadyMaterials',
    disabled: 'single',
    permission: 'OutStock.ReadyMaterials',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
// 备料单表头，非标按钮
export const readyMaterialsHeaderBtnItems = [
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'toOutShelves',
    disabled: 'multipe',
    permission: 'OutStock.ReadyMaterials.Create',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 取消
    langLabel: 'button.cancel',
    clickFun: 'toCancel',
    disabled: 'multipe',
    permission: '',
    styleType: 'primary',
    icon: ''
  }
  // {
  //   // 批量出库
  //   langLabel: 'button.batchShelves',
  //   clickFun: 'toBatchOutShelves',
  //   disabled: 'multipe',
  //   permission: 'OutStock.ReadyMaterials.Create',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // }
]
// 备料单明细表，非标按钮
export const readyMaterialsBtnItems = [
  {
    // 批量下架
    langLabel: 'button.batchShelves',
    clickFun: 'toBatchOutShelves',
    disabled: 'multipe',
    permission: 'OutStock.ReadyMaterials.Create',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 取消
    langLabel: 'button.cancel',
    clickFun: 'toCancel',
    disabled: 'multipe',
    permission: '',
    styleType: 'primary',
    icon: ''
  }
]
