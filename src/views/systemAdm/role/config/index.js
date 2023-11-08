// import { validateKey } from '@/utils/validate.js'
export const queryItems = [{ type: 'Input', placeholder: '搜索...', prop: 'Filter' }]

export const formList = [
  {
    type: 'Input',
    label: '角色名',
    prop: 'name',
    unique: true,
    rules: [
      { required: true, message: '请输入名称', trigger: 'blur' }
      // { addOnly: true, trigger: 'blur', tableName: 'AbpRoles', validator: validateKey }
    ]
  },
  // {
  //   type: 'Select',
  //   label: '数据范围',
  //   prop: 'dataScope',
  //   options: [
  //     { label: '全部', value: '全部' },
  //     { label: '本级', value: '本级' },
  //     { label: '自定义', value: '自定义' }
  //   ],
  //   rules: [{ required: true, message: '请选择数据范围', trigger: 'blur' }]
  // },
  {
    type: 'Radio',
    label: '是否默认属性',
    prop: 'isDefault',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    rules: [{ required: true, message: '请选择', trigger: 'blur' }]
  },
  {
    type: 'Radio',
    label: '是否公共属性',
    prop: 'isPublic',
    radios: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    rules: [{ required: true, message: '请选择', trigger: 'blur' }]
  }
  // {
  //   type: 'TreeSelect',
  //   label: '数据权限',
  //   prop: 'orgs',
  //   multiple: true,
  //   isHide: true,
  //   placeholder: '请选择数据权限',
  //   options: []
  // }
  // { type: 'Cascader', label: '数据权限', prop: 'orgs', isHide: true, multiple: true, checkStrictly: false, options: [] }
]

export const userWareformList = [
  {
    type: 'Cascader',
    label: 'SAP仓库权限',
    prop: 'sapFactoryWarehouse',
    checkStrictly: false,
    lazy: false,
    collapse: true,
    multiple: true,
    options: [],
    valueProp: 'value',
    valueLabel: 'label',
    children: 'warehouses'
  }
]

export const RoleCrud = {
  add: 'AbpIdentity.Roles.Create',
  edit: 'AbpIdentity.Roles.Update',
  del: 'AbpIdentity.Roles.Delete'
}
export const RolePermissionCrud = {
  save: 'AbpIdentity.Roles.ManagePermissions'
}
export const BtnItems = [
  {
    // 导出
    langLabel: 'button.PermissionExport',
    clickFun: 'toDownload',
    disabled: 'single',
    permission: '',
    styleType: 'warning',
    icon: 'el-icon-download'
  }
]
