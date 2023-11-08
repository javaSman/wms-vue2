export const queryItems = [
  { type: 'Input', label: '用户ID', prop: 'UserID' },
  { type: 'Input', label: '仓库编码', prop: 'WHID' }
]

export const formList = [
  {
    type: 'Select',
    label: '用户名',
    prop: 'userID',
    options: [],
    rules: [{ required: true, message: '请选择用户名', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '姓名',
    prop: 'userName',
    disabled: true,
    rules: [{ required: true, message: '请选择姓名', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    prop: 'warehouseNo',
    label: '仓库编号',
    unique: true,
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
  }
]

export const UserWarehouseCrud = {
  add: 'any',
  edit: 'any',
  del: 'any'
}
