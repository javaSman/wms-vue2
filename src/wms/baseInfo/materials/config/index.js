export const queryItems = [
  { type: 'Input', label: '物料编号', prop: 'MaterialNo' },
  { type: 'Input', label: '物料名称', prop: 'MaterialDesc' }
  // { type: 'Select', label: '物料类型', prop: 'MaterialType', options: [] }
]
export const MaterialCrud = {
  add: 'Basics.Materials.Create',
  edit: 'Basics.Materials.Update',
  del: 'Basics.Materials.Delete',
  // download: 'Basics.Materials',
  import: 'Basics.Materials.Create'
}
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
  // {
  //   // 同步物料信息
  //   langLabel: 'button.SynchronizeMaterial',
  //   clickFun: 'toSynchronizeMaterial',
  //   disabled: '',
  //   permission: '',
  //   styleType: 'danger',
  //   icon: 'el-icon-finished'
  // }
]
export const formList = [
  {
    type: 'Input',
    label: '物料编号',
    prop: 'materialNo',
    rules: [{ required: true, message: '请输入物料编号', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '物料名称',
    prop: 'materialDesc',
    rules: [{ required: true, message: '请输入物料名称', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '物料类型',
    prop: 'materialType',
    rules: [{ required: true, message: '请选择物料类型', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '类型描述',
    prop: 'materialTypeDesc',
    rules: [{ required: true, message: '请输入类型描述', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '组别描述',
    prop: 'materialGroupDesc',
    rules: [{ required: true, message: '请输入类型描述', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '物料状态',
    prop: 'status',
    rules: [{ required: true, message: '请输入物料状态', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '基本单位',
    prop: 'unit',
    rules: [{ required: true, message: '请输入基本单位', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '重量',
    prop: 'weight'
  },
  {
    type: 'Input',
    label: '重量单位',
    prop: 'weightUnit'
  },
  {
    type: 'Number',
    label: '满载数量',
    prop: 'fullQty'
  },
  {
    type: 'Number',
    label: '预警库存',
    prop: 'safetyQty'
  },
  {
    type: 'Number',
    label: '尺寸',
    prop: 'size'
  },
  {
    type: 'Radio',
    prop: 'cube',
    label: '是否入立库',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    rules: [{ required: true, message: '请选择是否入立库', trigger: 'blur' }]
  },
  {
    type: 'Number',
    label: '峰值库存',
    prop: 'TopQty',
    min: 0,
    rules: [{ required: true, message: '请输入峰值库存', trigger: 'blur' }]
  }
  // {
  //   type: 'Input',
  //   label: '虚拟库位',
  //   prop: 'virtualLocationID'
  // },
  // {
  //   type: 'Select',
  //   label: '仓库类型',
  //   prop: 'warehouseType',
  //   options: []
  // },
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
