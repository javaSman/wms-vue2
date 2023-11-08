import { validateKey } from '@/utils/LocationValidate.js'
import { validata_boxNo } from '@/utils/Boxvalidate.js'
export const queryItems = [
  { type: 'Input', label: '货位编号', prop: 'locationNo' },
  { type: 'Selects', label: '货位状态', prop: 'status', options: [] },
  { type: 'Select', label: '仓库名称', prop: 'warehouseNo', options: [] },
  { type: 'Input', label: '载具编号', prop: 'BoxNo' },
  { type: 'Selects', label: '货位类型', prop: 'localType', options: [] }
  // { type: 'Input', label: '载具集', prop: 'boxIDs' }
]

export const formList = [
  {
    type: 'Input',
    label: '货位编号',
    prop: 'locationNo',
    unique: true,
    rules: [
      { required: true, message: '请输入货位编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Location', validator: validateKey }
    ]
  },
  {
    type: 'Select',
    label: '货位状态',
    prop: 'status',
    // disabled: true,
    options: [],
    rules: [{ required: true, message: '请选择状态编号', trigger: 'blur' }]
  },
  {
    type: 'SelectNew',
    label: '仓库编号',
    prop: 'warehouseNo',
    options: [],
    rules: [{ required: true, message: '请选择转出仓库', trigger: 'blur' }]
  },
  // {
  //   type: 'Combogrid',
  //   prop: 'warehouseNo',
  //   label: '仓库编号',
  //   unique: true,
  //   options: [],
  //   count: 10,
  //   remote: true,
  //   optLabel: 'warehouseNo',
  //   optValue: 'warehouseNo',
  //   optTotal: '',
  //   tableWidth: 100,
  //   col: [
  //     { label: '仓库编号', prop: 'warehouseNo' },
  //     { label: '名称', prop: 'warehouseName' },
  //     { label: '描述', prop: 'warehouseDesc' }
  //   ],
  //   rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  // },
  {
    type: 'Input',
    label: '区域',
    prop: 'areaNo',
    unique: true
    // rules: [{ required: true, message: '请输入区域', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '载具',
    prop: 'boxNo',
    rules: [{ validator: validata_boxNo, trigger: 'blur' }]
    // , disabled: true
  },
  {
    type: 'Input',
    label: '巷',
    prop: 'alley',
    unique: true
    // disabled: true,
    // rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '排',
    prop: 'row',
    unique: true
    // disabled: true,
    // rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },

  {
    type: 'Input',
    label: '列',
    prop: 'col',
    unique: true
    // disabled: true,
    // rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '层',
    prop: 'floor',
    unique: true
    // disabled: true,
    // rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  },
  // { type: 'Input', label: '载具集', prop: 'boxIDs' },
  { type: 'Select', label: '货位类型', prop: 'localType', options: [] },
  { type: 'Input', label: '站点编号', prop: 'siteNo' },
  {
    type: 'Select',
    label: '层高',
    prop: 'agvFloor',
    options: []
    // rules: [{ required: true, message: '请选择层高', trigger: 'blur' }]
  },
  { type: 'Input', label: '功能描述', prop: 'funcDesc' }
]

export const batchFormList = [{ type: 'Select', prop: 'statusID', label: '状态编号', options: [] }]

export const LocationsCrud = {
  add: 'WarehouseManagement.Locations.Create',
  edit: 'WarehouseManagement.Locations.Update',
  del: 'WarehouseManagement.Locations.Delete',
  import: 'WarehouseManagement.Locations'
  // download: 'WarehouseManagement.Locations'
}
// locations非标按钮
export const locationsBtnItems = [
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
  },
  {
    // 下架
    langLabel: 'button.outShelves',
    clickFun: 'todownSet',
    disabled: true,
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-finished'
  }
]
/* 下架 */
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
    rules: [{ required: true, message: '请选择码头', trigger: 'blur' }]
  }
]
// 表格操作列
export const TableBtn = {
  width: '130',
  btnItem: [{ btnLabel: '查看打印记录', clickFun: 'toCheckPrint', isHide: [] }]
}

export const boxTableList = [
  // { label: '来源', prop: 'source' },
  { label: '货位编号', prop: 'sourceSysNo' },
  {
    label: '打印人',
    prop: 'printBy'
  },
  {
    label: '创建时间',
    prop: 'creationTime'
  }
]
