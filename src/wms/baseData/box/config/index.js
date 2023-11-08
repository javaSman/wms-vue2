import { validateKey } from '@/utils/validate.js'

export const boxQueryItems = [
  { type: 'Input', label: '载具编号', prop: 'boxNo' },
  // { type: 'Input', label: '来源单号', prop: 'SourceID' },
  { type: 'Selects', label: '载具类型', prop: 'boxType', options: [] },
  { type: 'Selects', label: '载具装载状态', prop: 'status', options: [] },
  { type: 'Input', label: '料架号(母托盘)', prop: 'materialShelfNo' },
  { type: 'Select', label: '料架装载状态', prop: 'materialShelfStatus', options: [] },
  { type: 'Input', label: '货位管理', prop: 'locationNo' }
  // { type: 'Select', label: '箱子位置状态', prop: 'positionStatus', options: [] }
]
export const materialQueryItems = [
  { type: 'Input', label: '物料编号', prop: 'MaterialID' },
  { type: 'Input', label: '物料名称', prop: 'MaterialDesc' },
  { type: 'Select', label: '物料类型', prop: 'MaterialType', options: [] }
]
export const formList = [
  {
    type: 'Input',
    label: '载具编号',
    prop: 'boxNo',
    unique: true,
    rules: [
      { required: true, message: '请输入载具编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Box', validator: validateKey }
    ]
  },
  {
    type: 'Select',
    label: '载具类型',
    prop: 'boxType',
    options: [],
    rules: [{ required: true, message: '请选择载具类型', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '载具装载状态',
    prop: 'status',
    unique: true,
    options: [],
    rules: [{ required: true, message: '请选择载具装载状态', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '载具位置状态',
    prop: 'position',
    unique: true,
    options: [],
    rules: [{ required: true, message: '请选择载具位置状态', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '料架号(母托盘)',
    prop: 'materialShelfNo',
    unique: true
    // rules: [{ required: true, message: '请输入料架号', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '料架装载状态',
    prop: 'materialShelfStatus',
    options: []
    // rules: [{ required: true, message: '请选择', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '货位编码',
    prop: 'locationNo'
  }
]

export const boxTableList = [
  // {
  //   // type: 'colType/Select',
  //   label: '来源',
  //   prop: 'source'
  //   // disabled: true,
  //   // options: [
  //   //   { value: 10, label: '货位' },
  //   //   { value: 20, label: '载具' }
  //   // ]
  // },
  { label: '载具编号', prop: 'sourceSysNo' },
  { label: '打印人', prop: 'printBy' },
  {
    label: '创建时间',
    prop: 'creationTime'
  }
]

export const batchFormList = [
  {
    type: 'Select',
    prop: 'deliverLocation',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  }
]

export const AlleyFormList = [
  {
    type: 'Selects',
    prop: 'alleys',
    label: '巷道',
    options: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 }
    ],
    rules: [{ required: true, message: '请选择巷道', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'deliverLocation',
    label: '下料位置',
    options: [],
    rules: [{ required: true, message: '请选择下料位置', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '数量',
    prop: 'count',
    min: 0,
    rules: [{ required: true, message: '请输入数量', trigger: 'blur' }]
  },
  {
    type: 'Select',
    prop: 'statusID',
    label: '箱子状态',
    options: [],
    disabled: true,
    rules: [{ required: true, message: '请选择箱子状态', trigger: 'blur' }]
  }
]

export const boxCrud = {
  add: 'WarehouseManagement.Box.Create',
  edit: 'WarehouseManagement.Box.Update',
  del: 'WarehouseManagement.Box.Delete',
  import: 'WarehouseManagement.Box'
  // download: 'WarehouseManagement.Box'
  // reprint: 'WarehouseManagement.Box'
}
export const ptintFormList = [
  {
    type: 'Select',
    label: '打印地址',
    prop: 'printer',
    rules: [{ required: true, message: '请选择打印地址', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '打印份数',
    prop: 'copies',
    rules: [{ required: true, message: '请输入打印份数', trigger: 'blur' }]
  }
]

// box非标按钮
export const boxBtnItems = [
  {
    // 打印条码
    langLabel: 'button.print',
    clickFun: 'toprintBarcode',
    disabled: 'multipe',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-finished'
  },
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
  width: '130',
  btnItem: [{ btnLabel: '查看打印记录', clickFun: 'toCheckPrint', isHide: [] }]
}
