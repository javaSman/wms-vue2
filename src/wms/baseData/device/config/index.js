import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  {
    type: 'Combogrid',
    prop: 'warehouseID',
    label: '仓库名称',
    options: [],
    optLabel: 'warehouseNo',
    optValue: 'warehouseNo',
    optTotal: '',
    count: 10,
    remote: true,
    tableWidth: 100,
    col: [
      { label: '仓库编号', prop: 'warehouseNo' },
      { label: '名称', prop: 'warehouseName' }
    ],
    rules: [{ required: true, message: '请选择仓库名称', trigger: 'blur' }]
  },
  { type: 'Input', label: '设备编号', prop: 'DeviceID' },
  { type: 'Input', label: '设备名称', prop: 'DeviceName' },
  { type: 'Input', label: '巷道', prop: 'Alley' },
  { type: 'Selects', label: '设备类型', prop: 'DeviceType', options: [] }
]

export const formList = [
  {
    type: 'Input',
    label: '设备编号',
    prop: 'deviceID',
    unique: true,
    rules: [
      { required: true, message: '请输入设备编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_device', validator: validateKey }
    ]
  },
  {
    type: 'Combogrid',
    prop: 'warehouseID',
    label: '仓库编号',
    options: [],
    optLabel: 'warehouseNo',
    optValue: 'warehouseNo',
    optTotal: '',
    count: 10,
    remote: true,
    tableWidth: 100,
    col: [
      { label: '仓库编号', prop: 'warehouseNo' },
      { label: '名称', prop: 'warehouseName' },
      { label: '描述', prop: 'warehouseDesc' }
    ],
    rules: [{ required: true, message: '请选择仓库编码', trigger: 'blur' }]
  },

  {
    type: 'Input',
    label: '设备名称',
    prop: 'deviceName',
    rules: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '下一站点',
    prop: 'nextStation'
  },
  {
    type: 'Select',
    label: '设备类型',
    prop: 'deviceType',
    options: [],
    rules: [{ required: true, message: '请选择码头类型', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '是否启用',
    prop: 'enable',
    options: [
      // { value: 'true', label: '是' },
      // { value: 'false', label: '否' }
      { value: true, label: '是' },
      { value: false, label: '否' }
    ],
    rules: [{ required: true, message: '请选择码头类型', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '最大缓存',
    prop: 'maxCach',
    min: 0
    // rules: [
    //   { required: true, message: '请输入最大缓存', trigger: 'blur' },
    //   { pattern: /^[1-9]*[1-9][0-9]*$/, message: '请输入大于0的数', trigger: 'blur' }
    // ]
  },
  { type: 'Number', label: '当前缓存', prop: 'currentCach', min: 0 },
  { type: 'Number', label: '巷道', prop: 'alley', min: 0 },
  { type: 'Number', label: '楼层', prop: 'floor', min: 0 }
]

export const deviceCrud = {
  add: 'WarehouseManagement.Device.Create',
  edit: 'WarehouseManagement.Device.Update',
  del: 'WarehouseManagement.Device.Delete'
  // download: 'WarehouseManagement.Wharf'
}
