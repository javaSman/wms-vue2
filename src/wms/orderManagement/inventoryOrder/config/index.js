export const queryItems = [
  { type: 'Input', label: '单据编号', prop: 'InventoryID' },
  { type: 'Select', label: '单据类型', prop: 'InventoryType', options: [] }
]

export const inventoryFormList = [
  { type: 'Input', label: '单据编号', prop: 'inventoryID', disabled: true },
  { type: 'Input', label: '单据状态', prop: 'statusID', disabled: true },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'inventoryType',
    options: [],
    rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  { type: 'Input', label: '单据备注', prop: 'note' }
]
// 盘点单头部数据
export const inventoryHeadList = [
  { type: 'Input', label: '单据编号', prop: 'inventoryID', disabled: true },
  { type: 'Input', label: '单据状态', prop: 'statusID', disabled: true },
  {
    type: 'Select',
    label: '单据类型',
    prop: 'inventoryType',
    options: [],
    disabled: true,
    rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  { type: 'Input', label: '单据备注', prop: 'note', disabled: true }
]

export const columnDetail = [
  { prop: 'boxDetailsID', label: '库存编号' },
  { prop: 'orderID', label: '盘点单号' },
  { prop: 'itemNo', label: '明细编号' },
  { prop: 'materialID', label: '物料编号' },
  { prop: 'boxID', label: '箱子编号' },
  { prop: 'locationID', label: '货位编号' },
  { prop: 'quantity', label: '原有数量' },
  { prop: 'statusID', label: '单据状态', type: 'formatDict/InvertoryStatus' },
  { prop: 'materialStatus', label: '物料状态' }
]

export const stockQueryItems = [
  { type: 'BatchInput', label: '箱号', prop: 'BoxID', filterStyle: { width: '200px', marginRight: '30px' } },
  { type: 'BatchInput', label: '货位编号', prop: 'LocationID', filterStyle: { width: '200px', marginRight: '30px' } },
  { type: 'BatchInput', label: '物料编号', prop: 'materialID', filterStyle: { width: '200px', marginRight: '30px' } },
  { type: 'Input', label: '批次号', prop: 'BatchID', filterStyle: { width: '200px' } },
  {
    type: 'DateRangePart',
    label: '创建时间',
    startProp: 'BeginCreationTime',
    endProp: 'EndCreationTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    filterStyle: { width: '200px' }
  },
  {
    type: 'DateRangePart',
    label: '更新时间',
    startProp: 'BeginLastModificationTime',
    endProp: 'EndLastModificationTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    filterStyle: { width: '200px' }
  }
]

export const inventoryTableList = [
  { prop: 'materialID', label: '物料编号' },
  { prop: 'barcode', label: '物料条码' },
  { prop: 'boxNo', label: '箱子编号' },
  { prop: 'locationID', label: '货位编号' },
  { prop: 'quantity', label: '原有数量' },
  { prop: 'materialStatus', label: '物料状态' },
  { prop: 'statusID', label: '明细状态' },
  { prop: 'boxDetailsID', label: '库存编号' }
]
// 盘点单列表
export const inventoryColumnList = [
  { prop: 'materialID', label: '物料编号' },
  { prop: 'barcode', label: '物料条码' },
  { prop: 'boxNo', label: '箱子编号' },
  { prop: 'locationID', label: '货位编号' },
  { prop: 'quantity', label: '原有数量' },
  { prop: 'realQty', label: '盘点数量', type: 'colType/Number' },
  { prop: 'materialStatus', label: '物料状态' },
  { prop: 'statusID', label: '明细状态', type: 'formatDict/InvertoryStatus' },
  { prop: 'boxDetailsID', label: '库存编号' }
]

export const batchAddFormList = [
  { type: 'Number', label: '层', prop: 'floor', min: 0, step: 1, precision: 0 },
  { type: 'Number', label: '巷', prop: 'alley', min: 0, step: 1, precision: 0 },
  { type: 'Number', label: '列', prop: 'col', min: 0, step: 1, precision: 0 },
  { type: 'Number', label: '排', prop: 'row', min: 0, step: 1, precision: 0 },
  { type: 'Input', label: '层-巷-排', prop: 'floorAlley' },
  {
    type: 'Number',
    label: '数量',
    prop: 'count',
    min: 0,
    step: 1,
    precision: 0,
    rules: [{ required: true, message: '请输入数量', trigger: 'blur' }]
  }
]
export const InventoryOrderCrud = {
  add: 'any',
  // edit: 'InventoryManagement.InventoryHeader.Update',
  del: 'any',
  print: 'any'
}

// 盘点，非标按钮
export const inventoryBtnItems = [
  {
    // 盘点
    langLabel: 'button.inventory',
    clickFun: 'toInventory',
    disabled: 'single',
    // permission: 'InventoryManagement.InventoryHeader.Update',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
  {
    // 盘点
    label: '流量测试',
    clickFun: 'toBatchAdd',
    disabled: 'all',
    // permission: 'InventoryManagement.InventoryHeader.Update',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
