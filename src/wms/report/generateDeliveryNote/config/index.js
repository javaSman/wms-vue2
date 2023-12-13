// 补货报表查询
export const queryItems = [
  { type: 'BatchInput', label: '物料编号', prop: 'MaterialID' },
  { type: 'BatchInput', label: '物料条码', prop: 'BarCode' },
  { type: 'Input', label: '箱子号', prop: 'BoxID' },
  { type: 'Input', label: '项目批次', prop: 'BatchID' },
  { type: 'Input', label: '工位', prop: 'Station' }
]

/* 高级查询表单 */
export const highSearchListItme = [
  { type: 'Input', label: '仓库', prop: 'WHID' },
  { type: 'Input', label: '货位', prop: 'LocationID' },
  { type: 'Input', label: 'ECN号', prop: 'NGELN' }
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
