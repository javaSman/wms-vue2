// 入库单管理
export const outStockQueryItems = [
  { type: 'Input', label: '单据编号', prop: 'OrderNo' },
  { type: 'Input', label: '载具', prop: 'BoxNo' },
  { type: 'Selects', label: '状态', prop: 'Status', options: [] },
  { type: 'Input', label: '来源单号', prop: 'SourceNo' },
  { type: 'Input', label: '项目号', prop: 'ProjectNo' },
  { type: 'Input', label: '工位号', prop: 'StationNo' }
]

export const outStockFormList = [
  { type: 'Input', label: '单据编号', prop: 'orderNo', disabled: true },
  { type: 'Input', label: '单据状态', prop: 'status', disabled: true },
  { type: 'Input', label: '来源单号', prop: 'sourceNo' },
  { type: 'Input', label: '项目号', prop: 'projectNo' },
  { type: 'Input', label: '箱号', prop: 'boxNo' },
  { type: 'Input', label: '工位号', prop: 'stationNo' },
  { type: 'Input', label: '仓库编码', prop: 'warehouseNo' }
]
export const outStockTableList = [
  { label: '单据编号', prop: 'orderNo', width: 130 },
  { label: '行号', prop: 'itemNo', width: 200 },
  { label: '物料编号', prop: 'materialNo' },
  { label: '数量', prop: 'quantity', width: 110 },
  { label: '单位', prop: 'unitNo' },
  { label: '单位数量', prop: 'unitQty' },
  { label: '状态', prop: 'statusNo' },
  { label: '来源单号', prop: 'sourceNo', width: 110 },
  { label: '来源行号', prop: 'sourceItemNo', width: 110 },
  { label: '工位号', prop: 'stationNo', width: 110 },
  { label: '项目号', prop: 'projectNo', width: 110 },
  { label: '条码', prop: 'barcode', width: 110 },
  { label: '物料描述', prop: 'materialDesc', width: 110 },
  { label: '外部单号', prop: 'externalNo', disabled: [] },
  { label: '载具', prop: 'boxNo', width: 110 },
  { label: '指定货位', prop: 'locationNo', width: 110 },
  { label: '手持机登录号', prop: 'employee', width: 130 },
  { label: '设备编号', prop: 'deviceNo' },
  { label: '过账状态', prop: 'oclas', width: 110 },
  { label: 'SAP过账结果', prop: 'resultMsg', width: 110 }
]
export const materialQueryItems = [
  { type: 'Input', label: '物料编号', prop: 'materialNo' },
  { type: 'Input', label: '物料名称', prop: 'materialDesc' }
]
// 权限
export const inStockCrud = {
  // add: 'InStock.InStockHeader.Create',
  // edit: 'InStock.InStockHeader.Update',
  // del: 'InStock.InStockHeader.Delete'
}
// 按钮权限
export const BtnItems = [
  {
    // 新增
    langLabel: 'button.add',
    clickFun: 'toAdd',
    disabled: '',
    permission: 'OrderManagement.OutStockOrder.Create',
    styleType: 'primary',
    icon: 'el-icon-plus',
    loading: false
  },
  {
    // 修改
    langLabel: 'button.edit',
    clickFun: 'toEdit',
    disabled: 'single',
    permission: 'OrderManagement.OutStockOrder.Update',
    styleType: 'success',
    icon: 'el-icon-edit',
    loading: false
  },
  {
    // 删除
    langLabel: 'button.delete',
    clickFun: 'toDelete',
    disabled: 'multipe',
    permission: 'OrderManagement.OutStockOrder.Delete',
    styleType: 'danger',
    icon: 'el-icon-delete',
    loading: false
  }
]
