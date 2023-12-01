// 分拣单管理
export const sortingQueryItems = [
  { type: 'Input', label: '单据编号', prop: 'OrderID' },
  { type: 'Select', label: '单据状态', prop: 'StatusID', options: [] },
  { type: 'Select', label: '模式', prop: 'Mode', options: [] },
  { type: 'Input', label: '来源单号', prop: 'SourceID' },
  { type: 'Input', label: '外部单号', prop: 'ExternalID' },
  { type: 'Input', label: '项目号', prop: 'ProjectID' },
  { type: 'Select', label: '优先级', prop: 'Priority', options: [] }
]

// 分拣台管理
export const SortingDeskQueryItems = [
  { type: 'Input', label: '位置编号', prop: 'DeskID' },
  { type: 'Input', label: '位置名称', prop: 'DeskName' },
  { type: 'Input', label: '箱子编号', prop: 'BoxID' }
]

export const SortingDeskFormList = [
  {
    type: 'Input',
    label: '分拣台位置编号',
    prop: 'locationID',
    unique: true,
    rules: [{ required: true, message: '请输入分拣台位置', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '位置名称',
    prop: 'deskName',
    rules: [{ required: true, message: '请输入位置名称', trigger: 'blur' }]
  },
  {
    type: 'Input',
    label: '箱子编号',
    prop: 'boxID'
  },
  {
    type: 'Select',
    label: '位置状态',
    prop: 'statusID',
    rules: [{ required: true, message: '请选择位置状态', trigger: 'blur' }]
  }
]

// 权限
export const SortingDeskCrud = {
  add: 'SortingManagement.SortingDesk.Create',
  edit: 'SortingManagement.SortingDesk.Update',
  del: 'SortingManagement.SortingDesk.Delete'
}
// 分拣台----非标按钮
export const sortingDeskBtnItem = [
  {
    label: '补空箱',
    clickFun: 'toOutEmptyBox',
    disabled: 'single',
    permission: 'SortingManagement.SortingDesk.Update',
    styleType: 'danger',
    icon: 'el-icon-finished',
    loading: false
  }
]
// 分拣单取消权限----非标按钮
export const sortingBtnItem = [
  {
    langLabel: 'button.cancel',
    clickFun: 'toCancel',
    disabled: 'multipe',
    permission: 'SortingManagement.SortingHeader.Delete',
    styleType: 'danger',
    icon: 'el-icon-close'
  }
]

// 分拣单明细取消权限----非标按钮
export const sortingDetailBtnItem = [
  {
    langLabel: 'button.cancel',
    clickFun: 'toCancel',
    disabled: 'multipe',
    permission: 'SortingManagement.SortingDetail.Delete',
    styleType: 'danger',
    icon: 'el-icon-close'
  }
]
// 分拣箱明细过账权限----非标按钮
export const sortingBoxBtnItems = [
  {
    langLabel: 'button.Posting',
    clickFun: 'toPosting',
    disabled: 'single',
    permission: 'SortingManagement.SortingHeader.Update',
    styleType: 'danger',
    icon: 'el-icon-check'
  }
]
