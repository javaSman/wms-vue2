// 物料履历查询
export const materialHistoryItems = [
  { type: 'Input', label: '所属载具', prop: 'BoxNo' },
  { type: 'BatchInput', label: '物料编号', prop: 'MaterialNo' },
  { type: 'Input', label: '物料描述', prop: 'MaterialDesc' },
  { type: 'BatchInput', label: '项目号', prop: 'ProjectNo' },
  { type: 'BatchInput', label: '物料条码', prop: 'Barcode' },
  { type: 'BatchInput', label: '工位号', prop: 'StationNo' },
  { type: 'BatchInput', label: '批次号', prop: 'Batch' },
  { type: 'Selects', label: '移动类型', prop: 'Oclas', options: [] },
  { type: 'Input', label: '货位编号', prop: 'LocationNo' },
  { type: 'Input', label: '仓库编号', prop: 'WarehouseNo' },
  { type: 'Input', label: '原工号', prop: 'CardNo' },
  { type: 'Input', label: '原用户', prop: 'CardName' },
  { type: 'Input', label: '交接工号', prop: 'CardNoNew' },
  { type: 'Input', label: '交接用户', prop: 'CardNewName' },
  { type: 'Input', label: 'ECN号', prop: 'NGELN' },
  { type: 'Input', label: '检测', prop: 'Testing' },

  { type: 'Selects', label: '载具装载状态', prop: 'Status', options: [] },
  { type: 'Selects', label: '载具位置状态', prop: 'PositionStatus', options: [] },
  { type: 'Selects', label: '物料位置', prop: 'MaterialPosition', options: [] },
  { type: 'Input', label: '采购单号', prop: 'PO' },
  { type: 'Input', label: '物料凭证号', prop: 'ProofNumber' },
  { type: 'Input', label: '工厂', prop: 'Werks' },
  { type: 'DateTime', label: '开始日期', prop: 'StartDate' },
  { type: 'DateTime', label: '结束日期', prop: 'EndDate' },
  { type: 'Input', label: '目标载具', prop: 'targetBoxID' },
  { type: 'Input', label: '料架号', prop: 'materialShelfNo' },
  { type: 'Input', label: '料架装载状态', prop: 'materialShelfStatus' }
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
