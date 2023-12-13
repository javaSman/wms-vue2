// 物料履历查询
export const queryItems = [
  { type: 'Input', label: '转出条码', prop: 'Barcode' },
  { type: 'Input', label: '批次', prop: 'Batch' },
  { type: 'Input', label: '转出箱子号', prop: 'BoxNo' },
  { type: 'Input', label: 'Enc号', prop: 'EcnNo' },
  { type: 'Input', label: '转出货位号', prop: 'LocationNo' },
  { type: 'Input', label: '物料描述', prop: 'MaterialDesc' },
  { type: 'Input', label: '物料号', prop: 'MaterialNo' },
  { type: 'Input', label: '接收人ID', prop: 'ReceiverID' },
  { type: 'Input', label: '接收人姓名', prop: 'ReceiverName' },
  { type: 'Input', label: '备注', prop: 'Remark' },
  { type: 'Input', label: '交接人ID', prop: 'SenderID' },
  { type: 'Input', label: '交出人姓名', prop: 'SenderName' },
  { type: 'Input', label: '备料单', prop: 'SourceBarcode' },
  { type: 'Input', label: '工位号', prop: 'StationNo' },
  { type: 'Input', label: '制单号', prop: 'StatusNote' },
  { type: 'Input', label: '接收条码', prop: 'TargetBarcode' },
  { type: 'Input', label: '接收箱子', prop: 'TargetBoxID' },
  { type: 'Input', label: '接收货位', prop: 'TargetLocationID' },
  { type: 'Input', label: '目标仓库', prop: 'TargetWarehouseNo' },
  { type: 'Input', label: '转出仓库', prop: 'WarehouseNo' },
  // { type: 'Input', label: '料架装载状态', prop: 'materialShelfStatus' },
  { type: 'DateTime', label: '开始日期', prop: 'StartCreationTime ' },
  { type: 'DateTime', label: '结束日期', prop: 'EndCreationTime' }
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
