export const queryItems = [
  {
    type: 'Select',
    prop: 'WarehouseId',
    label: '仓库名称',
    options: []
  },
  { type: 'Input', label: '箱子号', prop: 'BoxId' },
  { type: 'Input', label: '楼层', prop: 'Floor' }
]

export const formList = [
  { type: 'Input', label: '仓库编码', prop: 'WarehouseID', disabled: true },
  { type: 'Input', label: '设备编号', prop: 'DeviceID' },
  { type: 'Input', label: '箱子号', prop: 'BoxNo' },
  { type: 'Input', label: '类型', prop: 'Type' },
  { type: 'Input', label: '数量', prop: 'Qty' },
  { type: 'Input', label: '来源', prop: 'source', disabled: true }
]

export const Crud = {}

export const BtnItems = [
  {
    /* 修改 */
    langLabel: 'button.delete',
    clickFun: 'toDelete',
    disabled: 'single',
    permission: '',
    styleType: 'danger',
    icon: ''
  }
]
