export const QueryItems = [
  { type: 'Input', label: '载具编号', prop: 'BoxNo' },
  { type: 'Input', label: '提交人', prop: 'SubmitID' },
  { type: 'Select', label: '状态', prop: 'Status', options: [] },
  { type: 'Input', label: '审核人', prop: 'AuditID' }
]
export const Crud = {}
export const BtnItems = [
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-download'
  }
]
// 表格操作列
export const TableBtn = {
  width: '150',
  btnItem: [
    { btnLabel: '同意', clickFun: 'toAgree', isHide: [], permission: 'Report.InventoryVarianceReport.Audit' },
    { btnLabel: '作废', clickFun: 'toCancel', isHide: [], permission: 'Report.InventoryVarianceReport.Delete' }
  ]
}
