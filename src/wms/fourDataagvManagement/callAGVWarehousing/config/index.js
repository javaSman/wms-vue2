// import { validateKey } from '@/utils/validate.js'
export const queryItems = [
  { type: 'Input', label: '层', prop: 'Floor' },
  { type: 'Input', label: '高度', prop: 'Height' }
]

export const formList = [
  {
    type: 'Input',
    label: '层',
    prop: 'Floor',
    disabled: false
  },
  {
    type: 'Select',
    label: '仓库编号',
    prop: 'warehouseNo',
    options: []
  },
  {
    type: 'Number',
    label: '高度',
    prop: 'Height',
    min: 0
  },
  {
    type: 'Input',
    label: '单位',
    prop: 'unit'
  }
]

export const LocationsCrud = {}

// CallAGVWarehousing 非标按钮
export const locationsBtnItems = [
  {
    // 新增
    langLabel: 'button.Create',
    clickFun: 'toAdd',
    // disabled: 'multipe',
    permission: '',
    styleType: 'primary',
    icon: 'el-icon-plus'
  },
  {
    // 修改
    langLabel: 'button.Edit',
    clickFun: 'toEdit',
    disabled: 'single',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-edit'
  },
  {
    // 修改
    langLabel: 'button.Delete',
    clickFun: 'toDelete',
    disabled: 'multipe',
    permission: '',
    styleType: 'danger',
    icon: 'el-icon-delete'
  }
]
