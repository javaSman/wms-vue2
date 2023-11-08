// 交接清单
export const handoverListItems = [
  { type: 'Input', label: '单号', prop: 'OrderNo' },
  { type: 'Input', label: '箱号', prop: 'BoxNo' },
  { type: 'Input', label: '项目号', prop: 'ProjectNo' },
  { type: 'Input', label: '批次号', prop: 'Batch' },
  { type: 'Input', label: '工位号', prop: 'StationNo' },
  { type: 'Input', label: '物料编号', prop: 'MaterialNo' },
  { type: 'Input', label: '配送区域', prop: 'DeliveryArea' },
  { type: 'Input', label: '物料类别', prop: 'MaterialType' },
  { type: 'DateTime', label: '制单时间开始', prop: 'TransTimeStart' },
  { type: 'DateTime', label: '制单时间结束', prop: 'TransTimeEnd' }
]
export const BtnItems = [
  {
    // 打印
    langLabel: 'button.print',
    clickFun: 'toPrint',
    disabled: 'single',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-printer'
  }
]
