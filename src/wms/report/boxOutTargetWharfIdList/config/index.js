export const queryItems = [
  { type: 'Input', label: '箱子号', prop: 'BoxNo' },
  { type: 'Input', label: '码头', prop: 'WharfId' }
]

export const Crud = {}

export const BtnItems = [
  {
    /* 删除 */
    langLabel: 'button.delete',
    clickFun: 'toDelete',
    disabled: 'single',
    permission: '',
    styleType: 'danger',
    icon: ''
  }
]
