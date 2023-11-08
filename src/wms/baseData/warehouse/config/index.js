import { validateKey } from '@/utils/validate.js'

export const queryItems = [
  { type: 'Input', label: '仓库编号', prop: 'WarehouseNo' },
  { type: 'Input', label: '仓库名称', prop: 'WarehouseName' }
]

export const formList = [
  {
    type: 'Input',
    label: '仓库编号',
    prop: 'warehouseNo',
    unique: true,
    rules: [
      { required: true, message: '请输入仓库编号', trigger: 'blur' },
      { addOnly: true, trigger: 'blur', tableName: 'WH_Warehouse', validator: validateKey }
    ]
  },
  {
    type: 'Input',
    label: '仓库名称',
    prop: 'warehouseName',
    rules: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }]
  },
  { type: 'Input', label: '仓库描述', prop: 'warehouseDesc' },
  // {
  //   type: 'Input',
  //   label: '虚拟库位',
  //   prop: 'virtualLocationID'
  // },
  {
    type: 'Select',
    label: '仓库类型',
    prop: 'warehouseType',
    options: []
  }
  // {
  //   type: 'Select',
  //   label: '是否物理仓库',
  //   prop: 'isRealWarehouse',
  //   options: [
  //     { value: true, label: '是' },
  //     { value: false, label: '否' }
  //   ],
  //   rules: [{ required: true, message: '请选择是否物理仓库', trigger: 'blur' }]
  // }
]

export const WarehouseCrud = {
  add: 'WarehouseManagement.Warehouse.Create',
  edit: 'WarehouseManagement.Warehouse.Update',
  del: 'WarehouseManagement.Warehouse.Delete'
}
export const BtnItems = [
  // {
  //   // 同步仓库信息
  //   langLabel: 'button.SynchronizeWarehouse',
  //   clickFun: 'toSynchronizeWarehouse',
  //   disabled: '',
  //   permission: '',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // },
  // {
  //   // 物理仓对应
  //   langLabel: 'button.warehouseCorrespond',
  //   clickFun: 'toCorrespond',
  //   disabled: 'single',
  //   permission: '',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // }
]
export const ShelfForm = [
  {
    type: 'DateRangePart',
    label: '起止时间',
    // prop: 'registrationEndTime',
    startProp: 'starttime',
    endProp: 'endtime',
    dateType: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    labelFormat: 'yyyy-MM-dd HH:mm:ss',
    startDefaultTime: '08:00:00',
    endDefaultTime: '20:00:00',
    formStyle: 'width:240px',
    rules: [{ required: true, message: '请选择时间', trigger: 'blur' }],
    span: 24
    // layout: { span: 24, xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }
  }
]
export const correspondForm = [
  {
    type: 'Selects',
    label: '逻辑仓库编号',
    prop: 'fictitious',
    options: [],
    rules: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }]
  }
]
