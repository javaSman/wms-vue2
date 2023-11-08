export const columns = [
  {prop: 'pickingNo', label: '单号', width: 'auto'},
  {prop: 'cardName', label: '领料人', width: 'auto'},
  {prop: 'projectNo', label: '项目', width: 'auto'},
  {prop: 'stationID', label: '工位', width: 'auto'}
]
export const UpDowncolumns = [
  {prop: 'BoxNo', label: '箱子', width: 'auto'},
  {prop: 'BeginPosition', label: '货位', width: 'auto'},
  {prop: 'State', label: '状态', width: 'auto'},
  {prop: 'AssignTimeConsuming', label: '下发耗时（分）', width: 'auto'},
  {prop: 'FinishTimeConsuming', label: '小车完成耗时（分）', width: 'auto'},
  {prop: 'MaterialHoistTimeConsuming', label: '物料提升机耗时（分）', width: 'auto'},
  {prop: 'LogisticsLineTimeConsuming', label: '物料线耗时（分）', width: 'auto'}
]
export const tasks = [
  {prop: 'orderID', label: '单号', width: 'auto'},
  {prop: 'barcode', label: '物料条码', width: 'auto'},
  {prop: 'materialID', label: '物料编号', width: 'auto'},
  {prop: 'materialDesc', label: '物料描述', width: 'auto'},
  {prop: 'sortingQuantity', label: '分拣数', width: 'auto'},
  {prop: 'inventoryQuantity', label: '库存数', width: 'auto'},
  {prop: 'boxID', label: '箱子', width: 'auto'}
]
export const formList = [
  {
    type: 'Input',
    label: '物料条码',
    prop: 'barcode',
    rules: [{ required: true, message: '请输入物料条码', trigger: 'blur' }]
  }
]
