// 收货报表查询
export const receiptReportItems = [
  { type: 'Input', label: '采购订单号', prop: 'orderNo' },
  { type: 'Input', label: '物料编号', prop: 'materialID' },
  { type: 'Input', label: '收货凭证', prop: 'receipt' },
  { type: 'Input', label: '所属载具', prop: 'boxID' },
  { type: 'Input', label: '区域码', prop: 'areaCode' },
  { type: 'DateTime', label: '收货日期', prop: 'receiveDate' },
  { type: 'DateTime', label: '检验时间', prop: 'testTime' },
  { type: 'Input', label: '标签条码', prop: 'barcode' }
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
