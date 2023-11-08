// 入库单管理
export const inStockQueryItems = [
  { type: 'Input', label: '单据编号', prop: 'OrderNo' },
  { type: 'Input', label: '单据类型', prop: 'OrderType' },
  { type: 'Selects', label: '状态', prop: 'Status', options: [] },
  { type: 'Input', label: '来源单号', prop: 'SourceNo' },
  { type: 'Input', label: '项目号', prop: 'ProjectNo' },
  { type: 'Input', label: '工位号', prop: 'StationNo' },
  { type: 'Input', label: '载具', prop: 'BoxNo' }
]

export const inStockFormList = [
  { type: 'Input', label: '单据编号', prop: 'orderNo', disabled: true },
  { type: 'Input', label: '单据状态', prop: 'status', disabled: true },
  {
    type: 'Input',
    label: '单据类型',
    prop: 'orderType'
    // options: [],
    // rules: [{ required: true, message: '请选择单据类型', trigger: 'blur' }]
  },
  { type: 'Input', label: '来源单号', prop: 'sourceNo' },
  { type: 'Input', label: '项目号', prop: 'projectNo' },
  { type: 'Input', label: '箱号', prop: 'boxNo' },
  { type: 'Input', label: '工位号', prop: 'stationNo' },
  { type: 'Input', label: '外部单号', prop: 'externalNo' },
  { type: 'Input', label: '仓库编码', prop: 'warehouseNo' }
]
export const inStockTableList = [
  { label: '单据编号', prop: 'orderNo', width: 130 },
  { label: '行号', prop: 'itemNo', width: 200 },
  { label: '物料编号', prop: 'materialNo' },
  { label: '数量', prop: 'quantity', width: 110 },
  { label: '批次号', prop: 'batchID' },
  { label: '单位', prop: 'unit' },
  { label: '采购单号', prop: 'po' },
  { label: '载具', prop: 'boxNo' },
  { label: '来源单号', prop: 'sourceNo' },
  { label: '来源行号', prop: 'sourceItemNo' },
  { label: '工位号', prop: 'stationNo' },
  { label: '条码', prop: 'barcode' },
  { label: '项目号', prop: 'projectNo' },
  { label: '物料描述', prop: 'materialDesc' },
  { label: 'SAP移动类型', prop: 'oclas' },
  { label: 'SAP过账结果', prop: 'resultMsg' },
  { label: '工号', prop: 'cardNo' },
  { label: '姓名', prop: 'cardName' },
  { label: '外部单号', prop: 'externalNo' }
]
export const materialQueryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]
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
    permission: 'OrderManagement.InStockOrder.Create',
    styleType: 'primary',
    icon: 'el-icon-plus',
    loading: false
  },
  {
    // 修改
    langLabel: 'button.edit',
    clickFun: 'toEdit',
    disabled: 'single',
    permission: 'OrderManagement.InStockOrder.Update',
    styleType: 'success',
    icon: 'el-icon-edit',
    loading: false
  },
  {
    // 删除
    langLabel: 'button.delete',
    clickFun: 'toDelete',
    disabled: 'multipe',
    permission: 'OrderManagement.InStockOrder.Delete',
    styleType: 'danger',
    icon: 'el-icon-delete',
    loading: false
  }
]
