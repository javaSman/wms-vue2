// 任务查询配置
export const queryItems = [
  { type: 'Input', label: '任务号', prop: 'TaskNo' },
  { type: 'Input', label: '储物格', prop: 'Drawer' },
  { type: 'Select', label: '任务状态', prop: 'TaskStatus', options: [] },
  { type: 'Select', label: '任务类型', prop: 'TaskType', options: [] },
  { type: 'Input', label: '起始位置', prop: 'StartLocation' },
  { type: 'Input', label: '结束位置', prop: 'EndLocation' }
]

export const batchFormList = [{ type: 'Select', prop: 'statusID', label: '状态编号', options: [] }]

export const LocationsCrud = {
}
// locations非标按钮
export const locationsBtnItems = [
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: '',
    styleType: 'warning',
    icon: 'el-icon-download'
  },
  {
    // 报工
    langLabel: 'button.reportTask',
    clickFun: 'toReportTask',
    disabled: 'single',
    permission: '',
    styleType: 'primary',
    icon: 'el-icon-finished'
  }
]

// 报工配置
export const configFormList = [
  {
    type: 'Select',
    label: '任务状态',
    prop: 'taskStatus',
    options: [
      { value: 'Finish', label: '完成' },
      { value: 'Cancel', label: '取消' }
    ],
    rules: [{ required: true, message: '请选择任务状态', trigger: 'blur' }]
  }
]
