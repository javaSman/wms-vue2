// 领料单管理
export const materialQequisitionItems = [
  { type: 'Input', label: '领料单', prop: 'PickingNo' },
  { type: 'Input', label: '储物格', prop: 'Drawer' },
  { type: 'Input', label: '接收人', prop: 'Recipient' },
  { type: 'Input', label: '目的地', prop: 'Destination' },
  { type: 'Select', label: '领料单状态', prop: 'Status', options: [] }
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
