// import { validateKey } from '@/utils/validate.js'
export const queryItems = [
  { type: 'Input', label: '任务号', prop: 'TaskNo' },
  { type: 'Input', label: '储物格', prop: 'Drawer' },
  { type: 'Select', label: '任务状态', prop: 'TaskStatus', options: [] },
  { type: 'Select', label: '任务类型', prop: 'TaskType', options: [] },
  { type: 'Input', label: '料架', prop: 'materialShelfNo' },
  { type: 'Input', label: '起始位置', prop: 'StartLocation' },
  { type: 'Input', label: '结束位置', prop: 'EndLocation' }
]

export const formList = [
  {
    type: 'Select',
    label: '任务状态',
    prop: 'TaskStatus',
    options: []
  }
]

export const LocationsCrud = {}

// 雄韬AGV 非标按钮
export const locationsBtnItems = [
  {
    // 报工
    langLabel: 'button.Work',
    clickFun: 'toWork',
    disabled: 'single',
    permission: '',
    styleType: 'primary'
    // icon: 'el-icon-plus'
  },
  {
    // 导出
    langLabel: 'button.export',
    clickFun: 'toDownload',
    disabled: '',
    permission: '',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
]
