export const queryItems = [
  { type: 'Input', label: '公司', prop: 'Company' },
  { type: 'Input', label: '工厂', prop: 'Factory' },
  { type: 'Input', label: '仓库代码', prop: 'Warehouse' },
  { type: 'Input', label: '仓库名称', prop: 'WarehouseName' }
]

export const formList = [
  {
    type: 'Input',
    label: '仓库编号',
    prop: 'warehouse',
    // unique: true,
    rules: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '仓库名称',
    prop: 'warehouseName',
    rules: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }]
  },
  { type: 'Input', label: '公司', prop: 'company' },
  { type: 'Input', label: '工厂', prop: 'factory' }
]

export const sapWarehouseCrud = {
  add: 'any',
  edit: 'any',
  del: 'any'
}
export const BtnItems = []
