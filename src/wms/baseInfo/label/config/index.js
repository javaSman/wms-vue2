export const queryItems = [
  { type: 'BatchInput', label: '物料条码', prop: 'Barcode' },
  { type: 'Input', label: '物料编号', prop: 'MaterialNo' },
  { type: 'Input', label: '物料名称', prop: 'MaterialDesc' },
  { type: 'Selects', label: '移动类型', prop: 'oclas', options: [] },
  { type: 'Input', label: '工位号', prop: 'stationNo' },
  { type: 'Input', label: '项目号', prop: 'projectNo' },
  { type: 'Input', label: '批次', prop: 'batch' },
  { type: 'Input', label: '载具编号', prop: 'boxNo' },
  { type: 'Input', label: '储位编码', prop: 'locationNo' },
  { type: 'Input', label: '区域编码', prop: 'areaNo' },
  { type: 'Input', label: '仓库编码', prop: 'warehouseNo' },
  { type: 'Input', label: '源条码', prop: 'SourceBarcode' },
  { type: 'Input', label: '当前SAP凭证', prop: 'resultMsg' }
]

export const costomerCrud = {
  // add: 'Basics.Customer.Create',
  // edit: 'Basics.Customer.Update',
  // del: 'Basics.Customer.Delete'
}
export const BtnItems = [
  // 标签打印
  {
    langLabel: 'button.labelPrint',
    clickFun: 'toPrint',
    disabled: 'multipe',
    permission: 'Basics.MaterialsBarcode',
    styleType: 'danger',
    icon: 'el-icon-finished'
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
