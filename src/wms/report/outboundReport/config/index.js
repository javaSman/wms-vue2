// 出库报表查询
export const outboundReportItems = [
  // { type: 'BatchInput', label: '物料编号', prop: 'MaterialNo' },
  // { type: 'Input', label: '条码', prop: 'Barcode' },
  { type: 'Input', label: '出库类型', prop: 'OutType' },
  { type: 'Input', label: '箱子号', prop: 'BoxId' },
  { type: 'Input', label: '物料编号', prop: 'MaterialNo' }
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
