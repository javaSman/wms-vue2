// 入库报表查询
export const warehousingReportItems = [
  { type: 'BatchInput', label: '物料编号', prop: 'MaterialNo' },
  { type: 'Input', label: '条码', prop: 'Barcode' },
  { type: 'Input', label: '载具', prop: 'BoxNo' },
  { type: 'Input', label: '项目号', prop: 'ProjectNo' },
  { type: 'Input', label: '工位号', prop: 'StationNo' }
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
