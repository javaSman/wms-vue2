import { validateKey } from '@/utils/validate.js'
export const queryItems = [
  { type: 'Input', label: '码头编号', prop: 'WharfID' },
  { type: 'Input', label: '码头名称', prop: 'WharfName' },
  { type: 'Select', label: '码头类型', prop: 'WharfType', options: [] },
  {
    type: 'Combogrid',
    prop: 'WarehouseID',
    label: '仓库名称',
    options: [],
    count: 10,
    remote: true,
    optLabel: 'warehouseNo',
    optValue: 'warehouseNo',
    optTotal: '',
    tableWidth: 100,
    col: [
      { label: '仓库编号', prop: 'warehouseNo' },
      { label: '名称', prop: 'warehouseName' }
    ],
    rules: [{ required: true, message: '请选择仓库名称', trigger: 'blur' }]
  },
  { type: 'Input', label: '箱子号', prop: 'BoxID' },
  { type: 'Select', label: '状态', prop: 'State', options: [] }
]
export const formList = [
  {
    type: 'Input',
    label: '码头编号',
    prop: 'wharfID',
    disabled: false,
    unique: true,

    rules: [
      { required: true, message: '请输入码头编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Wharf', validator: validateKey }
    ]
  },
  {
    type: 'Input',
    label: '码头名称',
    prop: 'wharfName',
    rules: [{ required: true, message: '请输入码头名称', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    prop: 'warehouseID',
    label: '仓库编号',
    options: [],
    count: 10,
    remote: true,
    optLabel: 'warehouseNo',
    optValue: 'warehouseNo',
    optTotal: '',
    tableWidth: 100,
    col: [
      { label: '仓库编号', prop: 'warehouseNo' },
      { label: '名称', prop: 'warehouseName' },
      { label: '描述', prop: 'warehouseDesc' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    label: '载具编号',
    prop: 'boxID',
    options: [],
    count: 10,
    optTotal: '',
    remote: true,
    optLabel: 'boxNo',
    optValue: 'boxNo',
    col: [
      { label: '载具编号', prop: 'boxNo', width: '150px' },
      { label: '类型', prop: 'boxType' },
      { label: '状态', prop: 'status' }
    ]
  },

  {
    type: 'Select',
    label: '码头类型',
    prop: 'wharfType',
    options: [],
    rules: [{ required: true, message: '请选择码头类型', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '状态',
    prop: 'state',
    options: [],
    rules: [{ required: true, message: '请选择状态', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '巷道',
    prop: 'alley',
    min: 0
    // rules: [{ required: true, message: '请输入巷道', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '下一站点',
    prop: 'nextPosition'
  }
]

export const WharfCrud = {
  add: 'WarehouseManagement.Wharf.Create',
  edit: 'WarehouseManagement.Wharf.Update',
  del: 'WarehouseManagement.Wharf.Delete'
  // download: 'WarehouseManagement.Wharf'
}
