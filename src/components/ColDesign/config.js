export const columnShow = [
  { prop: 'originLabel', label: '原标题', width: 120 },
  {
    prop: 'label',
    label: '显示标题',
    type: 'colType/Input',
    required: true,
    // maxlength: 10,
    rules: [
      { required: true, message: '请输入标题', trigger: 'blur' },
      {
        pattern: /^.{0,50}$/,
        message: '请正确输入显示标题，50个字符以内',
        trigger: 'blur'
      }
    ]
  },
  { prop: 'width', label: '宽度', type: 'colType/Number', width: 110 }
]
export const columnHide = [
  { prop: 'originLabel', label: '隐藏列' },
  {
    prop: 'label',
    label: '标题',
    type: 'Input',
    required: true,
    rules: [{ required: true, trigger: 'blur' }],
    show: false
  },
  { prop: 'width', label: '宽度', type: 'Number', show: false }
]
