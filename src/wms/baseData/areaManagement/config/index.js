export const queryItems = [
  { type: 'Input', label: '区域编码', prop: 'AreaNo' },
  { type: 'Input', label: '区域名称', prop: 'AreaName' },
  { type: 'Input', label: '仓库编码', prop: 'WarehouseNo' }
]

export const formList = [
  {
    type: 'Input',
    label: '区域编码',
    prop: 'areaNo',
    unique: true,
    rules: [{ required: true, message: '请输入区域编码', trigger: 'blur' }]
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
  { type: 'Input', label: '名称', prop: 'areaName' }
]

export const AreasCrud = {
  add: 'WarehouseManagement.Areas.Create',
  edit: 'WarehouseManagement.Areas.Update',
  del: 'WarehouseManagement.Areas.Delete'
}
