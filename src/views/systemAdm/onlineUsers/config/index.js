// 在线用户查询
export const onlineUsersItems = [{ type: 'Input', label: '用户名', prop: 'UserName' }]
// 在线用户非标按钮
export const onlineUsersBtnItems = [
  {
    // 清空所选用户
    langLabel: 'button.SelectedUsers',
    clickFun: 'toSelectedUsers',
    loading: false,
    disabled: '',
    permission: '',
    styleType: 'primary',
    icon: 'el-icon-delete-solid'
  },
  {
    // 清空所有用户
    langLabel: 'button.AllUsers',
    clickFun: 'toAllUsers',
    loading: false,
    disabled: '',
    permission: '',
    styleType: 'success',
    icon: 'el-icon-delete'
  }
]
