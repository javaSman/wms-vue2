// 库存报表查询
export const inventoryItems = [
  { type: 'Input', label: '载具编号', prop: 'BoxNo' },
  { type: 'BatchInput', label: '物料编号', prop: 'materialNo' },
  { type: 'Input', label: '物料条码', prop: 'barcode' },
  { type: 'Input', label: '项目号', prop: 'ProjectNo' },
  { type: 'Input', label: '工位号', prop: 'StationNo' },
  { type: 'Select', label: '仓库编码', prop: 'warehouseNo', options: [] },
  {
    type: 'DateRangePart',
    label: '创建时间',
    // prop: 'registrationEndTime',
    startProp: 'startCreationTime',
    endProp: 'endCreationTime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:180px',
    rules: [{ required: true, message: '请选择创建时间', trigger: 'blur' }],
    layout: { span: undefined, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
export const stockSearchItems = [
  { type: 'Selects', label: '载具位置状态', prop: 'position*', options: [] },
  { type: 'Selects', label: '载具装载状态', prop: 'BoxStatus*', options: [] },
  { type: 'Input', label: '物料名称', prop: 'materialDesc' },
  { type: 'Selects', label: '移动类型', prop: 'oclas*', options: [] },
  { type: 'Input', label: '批次', prop: 'Batch' },
  { type: 'Input', label: '货位编码', prop: 'LocationNo' },
  { type: 'Input', label: '区域编码', prop: 'AreaNo' },
  { type: 'Input', label: '源条码', prop: 'SourceBarcode' },
  { type: 'Input', label: '当前SAP凭证', prop: 'ResultMsg' }
]
// 库存报表权限
export const inventoryCrud = {
  download: 'any'
}
// 库存报表非标按钮
export const inventoryBtnItems = [
  {
    // 打印
    langLabel: 'button.print',
    clickFun: 'toPrint',
    disabled: '',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-printer'
  },
  {
    /* 下架 */
    langLabel: 'button.offShelf',
    clickFun: 'toOffShelf',
    disabled: '',
    permission: 'Report.StockManagements.BatchOutShelves',
    styleType: 'danger',
    icon: ''
  }
]

export const formList = [
  {
    type: 'Select',
    label: '配送区域',
    prop: 'DeliveryArea',
    options: [
      { value: '柏塘', label: '柏塘' },
      { value: '建邦', label: '建邦' },
      { value: '新工业园', label: '新工业园' }
    ],
    rules: [{ required: true, message: '请输入配送区域', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '物料类别',
    prop: 'MaterialType',
    options: [
      { value: '机加件', label: '机加件' },
      { value: '外购件', label: '外购件' }
    ],
    rules: [{ required: true, message: '请输入物料类别', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '发出区域',
    prop: 'OriginArea',
    options: [
      { value: '柏塘', label: '柏塘' },
      { value: '建邦', label: '建邦' }
    ],
    rules: [{ required: true, message: '请输入区域', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    label: '按项目工位分页',
    prop: 'IsGroup',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    rules: [{ required: true, message: '请选择是否按项目工位分页', trigger: 'blur' }]
  }
]
// 库存管理下架
export const configFormList = [
  {
    type: 'Select',
    label: '仓库编码',
    prop: 'warehouse',
    options: [],
    rules: [{ required: true, message: '请输入仓库', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '码头',
    prop: 'wharfNo',
    options: [],
    rules: [{ required: true, message: '请选择码头', trigger: 'change' }]
  }
]
