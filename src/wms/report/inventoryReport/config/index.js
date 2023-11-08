// 库存报表查询
export const inventoryReportItems = [
  { type: 'Input', label: '载具编号', prop: 'boxNo' },
  { type: 'BatchInput', label: '物料编号', prop: 'materialNo' },
  { type: 'Input', label: '货位编号', prop: 'locationNo' },
  { type: 'Selects', label: '载具位置状态', prop: 'position', options: [] },
  { type: 'Selects', label: '载具装载状态', prop: 'status', options: [] },
  { type: 'Input', label: '料架号', prop: 'materialShelfNo' },
  { type: 'Input', label: '料架装载状态', prop: 'materialShelfStatus' },
  { type: 'Select', label: '仓库编码', prop: 'WarehouseNo', options: [] }
]
// 库存报表权限
export const inventoryReportCrud = {
  download: 'any'
}
// 库存报表非标按钮
export const inventoryReportBtnItems = []
