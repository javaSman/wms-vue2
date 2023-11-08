// 库存汇总报表查询
export const inventorySummaryItems = [{ type: 'BatchInput', label: '物料编号', prop: 'materialNo' }]
// 库存汇总报表非标按钮
export const inventorySummaryBtnItems = [
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
