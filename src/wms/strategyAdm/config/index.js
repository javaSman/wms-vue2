// 出入库策略

export const queryItems = [{ type: 'Input', label: '策略编号', prop: 'StrategyNo' }]

export const formList = [
  { type: 'Input', label: '策略编号', prop: 'strategyNo' },
  { type: 'Input', label: '策略描述', prop: 'strategyDesc' },
  {
    type: 'Number',
    label: '策略值',
    prop: 'value',
    min: 0,
    rules: [{ required: true, message: '请输入策略值', trigger: 'blur' }]
  }
]

// 策略配置
export const configQueryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]
export const configFormList = [
  {
    type: 'Input',
    label: '工位ID',
    prop: 'station',
    unique: true,
    rules: [{ required: true, message: '请输入工位ID', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '工位描述',
    prop: 'stationDesc',
    rules: [{ required: true, message: '请输入工位描述', trigger: 'blur' }]
  },
  {
    type: 'Combogrid',
    prop: 'flowNo',
    label: '流程序号',
    options: [],
    optLabel: 'flowNo',
    optValue: 'flowNo',
    optTotal: '',
    tableWidth: 100,
    col: [
      { label: '流程序号', prop: 'flowNo' },
      { label: '流程名称', prop: 'flowName' }
    ],
    rules: [{ required: true, message: '请选择流程', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '流程名称',
    prop: 'flowName',
    disabled: true,
    rules: [{ required: true, message: '请输入流程名称', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    prop: 'status',
    label: '状态',
    radios: [
      { label: '启用', value: true, selected: true },
      { label: '禁用', value: false }
    ]
  }
]

// 策略明细
export const detailsQueryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]

export const detailsformList = [
  {
    type: 'Select',
    label: '策略编号',
    options: [],
    prop: 'strategyNo',
    rules: [{ required: true, message: '请选择策略序号', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '策略名称',
    disabled: true,
    prop: 'strategyName',
    rules: [{ required: true, message: '请选择策略名称', trigger: 'blur' }]
  },
  {
    type: 'Select',
    label: '取值模式',
    prop: 'valueMode',
    options: [],
    rules: [{ required: true, message: '请选择取值模式', trigger: 'blur' }]
  },
  { type: 'Input', label: '策略值', prop: 'strategyValue' }
]

export const detailsColumn = [
  { prop: 'value', label: '策略序号' },
  { prop: 'label', label: '策略描述' }
]

// 策略流程
export const flowQueryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]
export const flowFormList = [
  {
    type: 'Input',
    label: '流程序号',
    prop: 'flowNo',
    unique: true,
    rules: [{ required: true, message: '请输入流程序号', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '流程名称',
    prop: 'flowName',
    rules: [{ required: true, message: '请输入流程名称', trigger: 'blur' }]
  }
]
export const flowTableList = [
  { prop: 'gatherNo', label: '流程集合序号' },
  { prop: 'childNo', label: '子流程序号' },
  { prop: 'childName', label: '子流程名称' },
  {
    prop: 'strategyValue',
    label: '策略值',
    type: 'colType/Select',
    required: true,
    options: [],
    rules: [{ required: true, message: '请选择策略序号', trigger: 'change' }]
  },
  {
    prop: 'strategyNo',
    label: '策略序号'
  },
  {
    type: 'colType/Select',
    prop: 'status',
    label: '流程状态',
    options: [
      { label: '启用', value: true },
      { label: '禁用', value: false }
    ]
  }
]
export const flowDetailColumn = [
  { prop: 'gatherNo', label: '流程集合序号' },
  { prop: 'childNo', label: '子流程序号' },
  { prop: 'childName', label: '子流程名称' },
  { prop: 'strategyNo', label: '策略序号' },
  { prop: 'strategyName', label: '策略名称' }
]

// 策略流程集合
export const gatherQueryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]
export const gatherFormList = [
  {
    type: 'Input',
    prop: 'gatherNo',
    label: '流程集合序号',
    unique: true,
    rules: [{ required: true, message: '请输入流程集合序号', trigger: 'blur' }]
  },
  {
    type: 'Input',
    prop: 'gatherName',
    label: '流程集合名称',
    rules: [{ required: true, message: '请输入流程集合名称', trigger: 'blur' }]
  }
]
export const gatherTableList = [
  { type: 'colType/Input', prop: 'childNo', label: '子流程序号', disabled: [] },
  { type: 'colType/Input', prop: 'childName', label: '子流程名称' },
  {
    prop: 'strategyNo',
    label: '策略序号',
    type: 'colType/Select',
    required: true,
    rules: [{ required: true, message: '请选择策略序号', trigger: 'change' }]
  },
  { prop: 'strategyName', label: '策略名称' }
]
// 权限
export const InStrategyCrud = {
  add: 'Strategy.InStockStrategy.Create',
  edit: 'Strategy.InStockStrategy.Update',
  del: 'Strategy.InStockStrategy.Delete'
}

export const OutStrategyCrud = {
  add: 'Strategy.OutShelvesStrategy.Create',
  edit: 'Strategy.OutShelvesStrategy.Update',
  del: 'Strategy.OutShelvesStrategy.Delete'
}
export const StrategyConfigCrud = {
  add: 'Strategy.StrategyConfig.Create',
  edit: 'Strategy.StrategyConfig.Update',
  del: 'Strategy.StrategyConfig.Delete'
}
export const StrategyDetailsCrud = {
  add: 'Strategy.StrategyDetails.Create',
  edit: 'Strategy.StrategyDetails.Update',
  del: 'Strategy.StrategyDetails.Delete'
}
export const StrategyFlowCrud = {
  add: 'Strategy.StrategyFlow.Create',
  edit: 'Strategy.StrategyFlow.Update',
  del: 'Strategy.StrategyFlow.Delete'
}
export const StrategyFlowGatherCrud = {
  add: 'Strategy.StrategyFlowGather.Create',
  edit: 'Strategy.StrategyFlowGather.Update',
  del: 'Strategy.StrategyFlowGather.Delete'
}
